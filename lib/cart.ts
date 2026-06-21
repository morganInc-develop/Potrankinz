export interface CartProduct {
  id: string
  title: string
  price: string
  priceCents: number
  image: string
  category: string
  description: string
}

export interface CartSideSelection {
  id: string
  title: string
  image: string
}

export interface CartLine extends CartProduct {
  lineId: string
  selectedSide?: CartSideSelection
  quantity: number
}

type StoredCartLine = Omit<CartLine, 'lineId'> & {
  lineId?: string
}

export const CART_STORAGE_KEY = 'potrankinz-cart'
export const CART_UPDATED_EVENT = 'potrankinz-cart-updated'

let memoryCart: CartLine[] = []

function getStorage() {
  if (typeof window === 'undefined') return null

  try {
    const storage = window.localStorage
    if (!storage) return null
    const testKey = `${CART_STORAGE_KEY}-test`
    storage.setItem(testKey, '1')
    storage.removeItem(testKey)
    return storage
  } catch {
    return null
  }
}

export function priceToCents(price: string) {
  const amount = Number(price.replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(amount) || amount <= 0) return null
  return Math.round(amount * 100)
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

function isCartSideSelection(value: unknown): value is CartSideSelection {
  if (!value || typeof value !== 'object') return false

  const side = value as Record<string, unknown>
  return (
    typeof side.id === 'string' &&
    typeof side.title === 'string' &&
    typeof side.image === 'string'
  )
}

export function readCart(): CartLine[] {
  if (typeof window === 'undefined') return memoryCart

  const storage = getStorage()
  if (!storage) return memoryCart

  try {
    const raw = storage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((item): item is StoredCartLine => {
        return (
          item &&
          typeof item.id === 'string' &&
          (item.lineId === undefined || typeof item.lineId === 'string') &&
          typeof item.title === 'string' &&
          typeof item.price === 'string' &&
          typeof item.priceCents === 'number' &&
          typeof item.image === 'string' &&
          typeof item.category === 'string' &&
          typeof item.description === 'string' &&
          typeof item.quantity === 'number' &&
          (item.selectedSide === undefined ||
            isCartSideSelection(item.selectedSide))
        )
      })
      .map((item) => ({
        ...item,
        lineId: item.lineId ?? item.id,
        quantity: Math.max(1, Math.min(99, Math.floor(item.quantity))),
      }))
  } catch {
    return []
  }
}

export function writeCart(lines: CartLine[]) {
  const normalized = lines.filter((line) => line.quantity > 0)
  memoryCart = normalized

  if (typeof window === 'undefined') return

  const storage = getStorage()
  if (storage) {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized))
  }

  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, { detail: normalized }),
  )
}

export function addCartItem(
  product: CartProduct,
  quantity = 1,
  selectedSide?: CartSideSelection,
) {
  const lines = readCart()
  const lineId = selectedSide
    ? `${product.id}::side:${selectedSide.id}`
    : product.id
  const existing = lines.find((line) => line.lineId === lineId)

  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantity)
  } else {
    lines.push({
      ...product,
      lineId,
      selectedSide,
      quantity: Math.max(1, quantity),
    })
  }

  writeCart(lines)
}

export function updateCartQuantity(lineId: string, quantity: number) {
  const nextQuantity = Math.max(0, Math.min(99, Math.floor(quantity)))
  writeCart(
    readCart()
      .map((line) =>
        line.lineId === lineId ? { ...line, quantity: nextQuantity } : line,
      )
      .filter((line) => line.quantity > 0),
  )
}

export function removeCartItem(lineId: string) {
  writeCart(readCart().filter((line) => line.lineId !== lineId))
}

export function clearCart() {
  writeCart([])
}

export function cartItemCount(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.quantity, 0)
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce(
    (total, line) => total + line.priceCents * line.quantity,
    0,
  )
}
