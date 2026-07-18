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

function menuImageFor(id: string) {
  return menuItems.find((item) => item.id === id)?.image ?? menuItems[0].image
}

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

export const extraProteinProducts: CartProduct[] = [
  {
    id: 'extra-chicken',
    title: 'Extra Chicken',
    price: '$4',
    priceCents: 400,
    image: menuImageFor('jerk-chicken'),
    category: 'add-on',
    description: 'An extra serving of chicken for your order.',
  },
  {
    id: 'extra-saltfish',
    title: 'Extra Saltfish',
    price: '$3',
    priceCents: 300,
    image: menuImageFor('callaloo-saltfish'),
    category: 'add-on',
    description: 'An extra serving of seasoned saltfish for your order.',
  },
  {
    id: 'extra-goat',
    title: 'Extra Goat',
    price: '$6',
    priceCents: 600,
    image: menuImageFor('curry-goat'),
    category: 'add-on',
    description: 'An extra serving of tender curry goat for your order.',
  },
]

export const veganComboProducts: CartProduct[] = [
  {
    id: 'small-belly-fill',
    title: 'Small Belly Fill',
    price: '$15',
    priceCents: 1500,
    image: menuImageFor('ital-stew-bowl'),
    category: 'combo',
    description: 'Vegan plate and drink combo.',
  },
  {
    id: 'yardman-combo',
    title: 'Yardman Combo',
    price: '$18',
    priceCents: 1800,
    image: menuImageFor('bbq-seitan-plate'),
    category: 'combo',
    description: 'Vegan plate, festival, and drink combo.',
  },
  {
    id: 'rasta-box',
    title: 'Rasta Box',
    price: '$10',
    priceCents: 1000,
    image: menuImageFor('callaloo-breakfast-bowl'),
    category: 'combo',
    description: 'A sampler featuring three vegan sides.',
  },
]

export const cartProducts = [
  ...orderableMenuProducts,
  yardBoxProduct,
  ...extraProteinProducts,
  ...veganComboProducts,
]

export const cartProductsById = new Map(
  cartProducts.map((product) => [product.id, product]),
)
