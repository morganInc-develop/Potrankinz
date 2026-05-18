import { menuItems, type MenuItem } from '@/lib/kindred-home-data'
import { priceToCents, type CartProduct } from '@/lib/cart'

export function cartProductFromMenu(item: MenuItem): CartProduct | null {
  const priceCents = priceToCents(item.price)
  if (!priceCents) return null

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    priceCents,
    image: item.image,
    category: item.category,
    description: item.description,
  }
}

const orderableMenuProducts = menuItems
  .map(cartProductFromMenu)
  .filter((item): item is CartProduct => Boolean(item))

const jerkChicken = menuItems.find((item) => item.id === 'jerk-chicken')

export const yardBoxProduct: CartProduct = {
  id: 'yard-box-combo',
  title: 'Yard Box Combo',
  price: '$14',
  priceCents: 1400,
  image: jerkChicken?.image ?? menuItems[0].image,
  category: 'combo',
  description:
    'Jerk chicken, rice and peas, cabbage, festival, and plantain in one full plate box.',
}

export const cartProducts = [...orderableMenuProducts, yardBoxProduct]

export const cartProductsById = new Map(
  cartProducts.map((product) => [product.id, product]),
)
