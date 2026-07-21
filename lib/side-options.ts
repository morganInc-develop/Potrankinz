export type SideGroup = 'starch' | 'vegetable'

const vegetableSideIds = new Set([
  'steamed-cabbage',
  'cabbage-salad',
  'pikliz',
  'fried-plantains',
])

const breakfastExcludedSideIds = new Set([
  'rice-peas',
  'white-rice',
  'steamed-cabbage',
  'mac-cheese',
])

const fishStarchSideIds = new Set([
  'festival',
  'white-bread',
  'white-rice',
  'rice-peas',
  'rasta-pasta',
])

export function sideGroupForId(sideId: string): SideGroup {
  return vegetableSideIds.has(sideId) ? 'vegetable' : 'starch'
}

export function hasValidSideCombination(sideIds: string[]) {
  if (sideIds.length < 1 || sideIds.length > 2) return false
  if (new Set(sideIds).size !== sideIds.length) return false

  const groups = sideIds.map(sideGroupForId)
  return new Set(groups).size === groups.length
}

export function sideIsAllowedForProduct({
  sideId,
  productId,
  productCategory,
}: {
  sideId: string
  productId: string
  productCategory: string
}) {
  if (productId === 'escovitch-fish') {
    return (
      fishStarchSideIds.has(sideId) || sideGroupForId(sideId) === 'vegetable'
    )
  }

  if (productCategory === 'breakfast') {
    return !breakfastExcludedSideIds.has(sideId)
  }

  return true
}
