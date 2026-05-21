const siteRoot = ''

export const restaurantName = 'Pot Rankinz Kitchen'
export const restaurantHandle = '@POTRANKINZKITCHEN'

const image = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

const menuImage = (file: string) => `/menu-images/${file}`

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string
  title: string
  utensil: 'fork' | 'ladle' | 'knife' | 'whisk'
  tag: string
  description: string
  includes: string[]
  image: string
  cta: string
  href: string
  priceNote?: string
  featured?: boolean
}

export const servicesHero = {
  image: image('1307698'),
}

export const bookingHero = {
  image: image('3184183'),
  tag: '✦ Reservations',
}

export const services: Service[] = [
  {
    id: 'private-dining',
    title: 'Private Dining',
    utensil: 'fork',
    tag: '★ Intimate Gatherings',
    description:
      'Bring the restaurant feel home with family-style Jamaican courses, a tight service team, and a menu shaped around your people, your kitchen, and the occasion.',
    includes: [
      'Custom Jamaican menu',
      'Chef-led service',
      'Family-style or plated',
      'Setup and cleanup',
      'Guest-count planning',
    ],
    image: image('3184183'),
    cta: 'Plan Your Event',
    href: '/contact',
    priceNote: 'Private homes & intimate rooms',
  },
  {
    id: 'catering',
    title: 'Full-Service Catering',
    utensil: 'ladle',
    tag: '✦ Off-Site Events',
    description:
      'Weddings, birthdays, corporate lunches, church events, and backyard celebrations handled with hot food, organized service, and serious island flavor.',
    includes: [
      'Buffet or staffed service',
      'Menu built by guest count',
      'Delivery and setup',
      'Serving equipment',
      'Dietary accommodations',
      'Optional tasting',
    ],
    image: image('17500735'),
    cta: 'Request a Quote',
    href: '/contact',
    priceNote: 'Custom pricing by event',
    featured: true,
  },
  {
    id: 'chefs-counter',
    title: 'Pickup & Drop-Off',
    utensil: 'knife',
    tag: '✦ Easy Party Food',
    description:
      'Big trays, combo boxes, sides, drinks, and party portions ready for pickup or drop-off when you want the food handled without full staffing.',
    includes: [
      'Tray portions',
      'Yard Box combos',
      'Sides and drinks',
      'Hot-hold guidance',
      'Simple delivery window',
    ],
    image: image('2338407'),
    cta: 'Build an Order',
    href: '/menu',
    priceNote: 'Best for casual gatherings',
  },
  {
    id: 'buyouts',
    title: 'Pop-Ups & Community Events',
    utensil: 'whisk',
    tag: '✦ High-Energy Service',
    description:
      'Festivals, school events, brand activations, and community days with a focused menu, fast service flow, and the Pot Rankinz look on site.',
    includes: [
      'Limited pop-up menu',
      'Service flow planning',
      'Branded setup',
      'Crowd-friendly portions',
      'Team coordination',
    ],
    image: image('29748355'),
    cta: 'Discuss a Pop-Up',
    href: '/contact',
    priceNote: 'Markets, schools & venues',
  },
]

// ─── Menu types ───────────────────────────────────────────────────────────────

export type MenuCategory =
  | 'breakfast'
  | 'mains'
  | 'vegan'
  | 'snacks'
  | 'sides'
  | 'drinks'

export interface MenuItem {
  id: string
  title: string
  price: string
  image: string
  category: MenuCategory
  ingredients: string[]
  description: string
  chefNote?: string
  tags: string[]
  featured?: boolean
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: 'breakfast', label: 'Breakfast / All-Day Classics' },
  { id: 'mains', label: 'Main Plates' },
  { id: 'vegan', label: 'Vegan Yard Vibes' },
  { id: 'snacks', label: 'Snacks & Bread' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
]

export const menuHero = {
  image: image('6210921'),
  tag: 'Real food. Real flavor. Real Jamaica.',
}

export const menuItems: MenuItem[] = [
  // ── Breakfast / all-day classics ──
  {
    id: 'ackee-saltfish',
    title: 'Ackee & Saltfish',
    price: '$15',
    image: menuImage('ackee-saltfish.jpg'),
    category: 'breakfast',
    ingredients: [
      'Ackee',
      'Saltfish',
      'Onions & tomatoes',
      'Peppers',
      'Fried dumpling, boiled banana, yam & festival',
    ],
    description:
      "Jamaica's national dish with tender ackee, saltfish, onions, tomatoes, and peppers.",
    chefNote: 'Served with fried dumpling, boiled banana, yam & festival.',
    tags: ['National dish', 'All-day'],
    featured: true,
  },
  {
    id: 'callaloo-saltfish',
    title: 'Callaloo & Saltfish',
    price: '$12',
    image: menuImage('callaloo-saltfish.jpg'),
    category: 'breakfast',
    ingredients: [
      'Callaloo',
      'Saltfish',
      'Onions',
      'Peppers',
      'Jamaican spices',
    ],
    description:
      'Seasoned callaloo cooked with saltfish, onions, peppers, and spices. A true Jamaican favorite.',
    tags: ['Classic', 'Savory'],
  },
  {
    id: 'liver-onions',
    title: 'Liver & Onions',
    price: '$10',
    image: menuImage('liver-onions.jpg'),
    category: 'breakfast',
    ingredients: ['Tender liver', 'Onions', 'Peppers', 'House spice blend'],
    description:
      'Tender liver sauteed with onions, peppers, and the Pot Rankinz Jamaican blend.',
    tags: ['All-day', 'Yaad style'],
  },
  {
    id: 'cornmeal-porridge',
    title: 'Cornmeal Porridge',
    price: '$5',
    image: menuImage('cornmeal-porridge.jpg'),
    category: 'breakfast',
    ingredients: [
      'Yellow cornmeal',
      'Cinnamon',
      'Nutmeg',
      'Vanilla',
      'Peanut or hominy on select days',
    ],
    description:
      'Warm, creamy, and comforting with island spices and slow-stirred texture.',
    chefNote: 'Peanut porridge and hominy porridge rotate on select days.',
    tags: ['Warm bowl'],
  },

  // ── Mains ──
  {
    id: 'curry-goat',
    title: 'Curry Goat',
    price: '$17',
    image: menuImage('curry-goat.jpg'),
    category: 'mains',
    ingredients: [
      'Tender goat',
      'House curry',
      'Scotch bonnet warmth',
      'Rice & peas',
      'Choice of 2 sides',
    ],
    description:
      'Tender goat slow-cooked in rich Jamaican curry until the gravy is deep, glossy, and ready for rice.',
    chefNote: 'Served with your choice of 2 sides.',
    tags: ['Chef pick', 'Slow-cooked'],
    featured: true,
  },
  {
    id: 'stew-peas',
    title: 'Stew Peas',
    price: '$12',
    image: menuImage('stew-peas.jpg'),
    category: 'mains',
    ingredients: [
      'Red peas',
      'Coconut milk',
      'Salted meat or pig tail',
      'Herbs & spices',
      'Dumplings',
    ],
    description:
      'Red peas simmered down with coconut milk, herbs, spices, and dumplings.',
    tags: ['Comfort', 'Coconut'],
  },
  {
    id: 'escovitch-fish',
    title: 'Escovitch Fish',
    price: 'MP',
    image: menuImage('escovitch-fish.jpg'),
    category: 'mains',
    ingredients: [
      'Crispy fried fish',
      'Pickled carrots',
      'Onions',
      'Peppers',
      'Vinegar spice sauce',
    ],
    description:
      'Crispy fried fish topped with bright pickled carrots, onions, and peppers.',
    chefNote: 'Market price.',
    tags: ['Market price', 'Bright heat'],
  },
  {
    id: 'brown-stew-chicken',
    title: 'Brown Stew Chicken',
    price: '$12',
    image: menuImage('brown-stew-chicken.jpg'),
    category: 'mains',
    ingredients: [
      'Bone-in chicken',
      'Brown stew gravy',
      'Thyme',
      'Scallion',
      'Choice of 2 sides',
    ],
    description: 'Fall-off-the-bone chicken in a rich, savory brown stew.',
    tags: ['House gravy', 'Comfort'],
  },
  {
    id: 'jerk-chicken',
    title: 'Jerk Chicken',
    price: '$12',
    image: menuImage('jerk-chicken.jpg'),
    category: 'mains',
    ingredients: [
      'Chicken',
      'Jerk marinade',
      'Allspice',
      'Scotch bonnet',
      'Grilled finish',
    ],
    description:
      'Authentic jerk chicken marinated overnight and grilled to a smoky finish.',
    tags: ['Smoky', 'Spicy'],
    featured: true,
  },

  // ── Vegan Yard Vibes ──
  {
    id: 'ital-stew-bowl',
    title: 'Ital Stew Bowl',
    price: '$12',
    image: menuImage('ital-stew-bowl.jpg'),
    category: 'vegan',
    ingredients: [
      'Pumpkin',
      'Potato',
      'Carrot',
      'Chickpeas',
      'Coconut gravy',
      'Rice',
    ],
    description:
      'Slow-simmered pumpkin, potato, carrot, chickpeas, and coconut gravy over rice.',
    chefNote: '100% plant based.',
    tags: ['Vegan', 'Plant based'],
    featured: true,
  },
  {
    id: 'jerk-oyster-mushroom',
    title: 'Jerk Oyster Mushroom Plate',
    price: '$14',
    image: menuImage('jerk-oyster-mushroom.jpg'),
    category: 'vegan',
    ingredients: [
      'Oyster mushrooms',
      'Jerk seasoning',
      'Steamed cabbage',
      'Rice & peas',
    ],
    description: 'Spicy jerk mushrooms with steamed cabbage and rice & peas.',
    tags: ['Vegan', 'Spicy'],
  },
  {
    id: 'bbq-seitan-plate',
    title: 'BBQ Seitan Plate',
    price: '$15',
    image: menuImage('bbq-seitan-plate.jpg'),
    category: 'vegan',
    ingredients: [
      'Seitan strips',
      'Sweet jerk BBQ sauce',
      'Rice & peas',
      'Plantains',
    ],
    description:
      'Smoky Jamaican-style BBQ seitan strips glazed in sweet jerk BBQ sauce with rice & peas and plantains.',
    tags: ['Vegan', 'Spicy'],
  },
  {
    id: 'curry-chickpea-plate',
    title: 'Curry Chickpea Plate',
    price: '$12',
    image: menuImage('curry-chickpea-plate.jpg'),
    category: 'vegan',
    ingredients: ['Chickpeas', 'Jamaican curry', 'Potatoes', 'Steamed veggies'],
    description: 'Jamaican curry chickpeas with potatoes and steamed veggies.',
    tags: ['Vegan', 'Curry'],
  },
  {
    id: 'vegan-brown-stew-tofu',
    title: 'Vegan Brown Stew Tofu',
    price: '$13',
    image: menuImage('vegan-brown-stew-tofu.jpg'),
    category: 'vegan',
    ingredients: ['Tofu', 'Brown stew sauce', 'Peppers', 'Onions'],
    description:
      'Tofu simmered in rich brown stew sauce with peppers and onions.',
    tags: ['Vegan', 'House gravy'],
  },
  {
    id: 'callaloo-breakfast-bowl',
    title: 'Callaloo Breakfast Bowl',
    price: '$11',
    image: menuImage('callaloo-breakfast-bowl.jpg'),
    category: 'vegan',
    ingredients: ['Callaloo', 'Seasoned tofu', 'Fried dumplings or rice'],
    description:
      'Callaloo sauteed with seasoned tofu, served over fried dumplings or rice.',
    tags: ['Vegan', 'Breakfast'],
  },

  // ── Snacks & bread ──
  {
    id: 'beef-patty',
    title: 'Beef Patty',
    price: '$4',
    image: menuImage('beef-patty.jpg'),
    category: 'snacks',
    ingredients: ['Spiced beef', 'Flaky crust', 'Island seasoning'],
    description: 'Spicy beef patty wrapped in a flaky golden crust.',
    tags: ['Snack', 'Flaky'],
  },
  {
    id: 'coco-bread',
    title: 'Coco Bread',
    price: '$3',
    image: menuImage('coco-bread.jpg'),
    category: 'snacks',
    ingredients: ['Soft bread', 'Slight sweetness', 'Buttery fold'],
    description:
      'Soft, slightly sweet Jamaican bread ready for patties or gravy.',
    tags: ['Bread'],
  },
  {
    id: 'bun-cheese',
    title: 'Bun & Cheese',
    price: '$5',
    image: menuImage('bun-cheese.jpg'),
    category: 'snacks',
    ingredients: ['Jamaican hard dough bread', 'Cheddar cheese', 'Sweet spice'],
    description: 'Jamaican hard dough bread with cheddar cheese.',
    tags: ['Sweet', 'Cheese'],
  },

  // ── Sides ──
  {
    id: 'rice-peas',
    title: 'Rice & Peas',
    price: '$4',
    image: menuImage('rice-peas.jpg'),
    category: 'sides',
    ingredients: ['Rice', 'Red peas', 'Coconut milk', 'Thyme'],
    description:
      'Coconut rice and peas, built for curry, stew, and jerk gravy.',
    tags: ['Vegan', 'Side'],
  },
  {
    id: 'steamed-cabbage',
    title: 'Steamed Cabbage',
    price: '$4',
    image: menuImage('steamed-cabbage.jpg'),
    category: 'sides',
    ingredients: ['Cabbage', 'Carrot', 'Scallion', 'Pepper'],
    description: 'Light, seasoned cabbage steamed with vegetables.',
    tags: ['Vegan', 'Side'],
  },
  {
    id: 'fried-plantains',
    title: 'Fried Plantains',
    price: '$4',
    image: menuImage('fried-plantains.jpg'),
    category: 'sides',
    ingredients: ['Ripe plantain', 'Sea salt'],
    description: 'Sweet fried plantains with caramelized edges.',
    tags: ['Vegan', 'Side'],
  },
  {
    id: 'fried-dumpling',
    title: 'Fried Dumpling',
    price: '$2',
    image: menuImage('fried-dumpling.jpg'),
    category: 'sides',
    ingredients: ['Flour', 'Salt', 'Golden crust'],
    description: 'Golden fried dumpling for soaking up every drop.',
    tags: ['Vegan', 'Side'],
  },
  {
    id: 'festival',
    title: 'Festival',
    price: '$2',
    image: menuImage('festival.jpg'),
    category: 'sides',
    ingredients: ['Cornmeal', 'Flour', 'Sweet spice'],
    description: 'Sweet fried festival with crisp edges and soft center.',
    tags: ['Vegan', 'Side'],
  },
  {
    id: 'boiled-banana',
    title: 'Boiled Banana',
    price: '$3',
    image: menuImage('boiled-banana.jpg'),
    category: 'sides',
    ingredients: ['Green banana', 'Sea salt'],
    description: 'Classic boiled banana, simple and grounding.',
    tags: ['Vegan', 'Side'],
  },
  {
    id: 'mac-cheese',
    title: 'Mac & Cheese',
    price: '$4',
    image: menuImage('mac-cheese.jpg'),
    category: 'sides',
    ingredients: ['Macaroni', 'Cheese sauce', 'Baked top'],
    description: 'Creamy baked mac and cheese with a rich finish.',
    tags: ['Side'],
  },
  {
    id: 'vegan-mac-cheese-cup',
    title: 'Vegan Mac & "Cheese" Cup',
    price: '$6',
    image: menuImage('mac-cheese.jpg'),
    category: 'sides',
    ingredients: ['Macaroni', 'Plant-based cheese sauce', 'Seasoned top'],
    description: 'Plant-based mac cup with creamy vegan cheese-style sauce.',
    tags: ['Vegan', 'Side'],
  },

  // ── Drinks ──
  {
    id: 'sorrel',
    title: 'Sorrel',
    price: '$4',
    image: menuImage('sorrel.jpg'),
    category: 'drinks',
    ingredients: ['Sorrel', 'Ginger', 'Island spice'],
    description: 'Bright sorrel with ginger and warm spices.',
    tags: ['Drink'],
  },
  {
    id: 'irish-moss',
    title: 'Irish Moss',
    price: '$4',
    image: menuImage('irish-moss.jpg'),
    category: 'drinks',
    ingredients: ['Irish moss', 'Vanilla', 'Nutmeg'],
    description: 'Creamy island drink with vanilla and spice.',
    tags: ['Drink'],
  },
  {
    id: 'ginger-beer',
    title: 'Ginger Beer',
    price: '$4',
    image: menuImage('ginger-beer.jpg'),
    category: 'drinks',
    ingredients: ['Ginger', 'Cane sugar', 'Citrus'],
    description: 'Sharp, cold ginger beer with a clean kick.',
    tags: ['Drink'],
  },
  {
    id: 'peanut-punch',
    title: 'Peanut Punch',
    price: '$4',
    image: menuImage('peanut-punch.jpg'),
    category: 'drinks',
    ingredients: ['Peanut', 'Milk', 'Nutmeg'],
    description: 'Rich peanut punch, chilled and filling.',
    tags: ['Drink'],
  },
  {
    id: 'jamaican-kola',
    title: 'Jamaican Kola Champagne',
    price: '$3',
    image: menuImage('jamaican-kola.jpg'),
    category: 'drinks',
    ingredients: ['Kola champagne soda'],
    description: 'Classic Jamaican kola champagne soda.',
    tags: ['Soda'],
  },
  {
    id: 'pineapple-soda',
    title: 'Pineapple Soda',
    price: '$3',
    image: menuImage('pineapple-soda.jpg'),
    category: 'drinks',
    ingredients: ['Pineapple soda'],
    description: 'Cold pineapple soda with a bright tropical finish.',
    tags: ['Soda'],
  },
  {
    id: 'pineapple-ginger-juice',
    title: 'Pineapple Ginger Juice',
    price: '$5',
    image: menuImage('pineapple-ginger-juice.jpg'),
    category: 'drinks',
    ingredients: ['Pineapple', 'Ginger', 'Citrus'],
    description: 'Fresh pineapple juice with ginger heat and a bright finish.',
    tags: ['Vegan', 'Juice'],
  },
  {
    id: 'cucumber-mint-juice',
    title: 'Cucumber Mint Juice',
    price: '$5',
    image: menuImage('cucumber-mint-juice.jpg'),
    category: 'drinks',
    ingredients: ['Cucumber', 'Mint', 'Lime'],
    description: 'Cool cucumber mint juice with a clean, refreshing finish.',
    tags: ['Vegan', 'Juice'],
  },
  {
    id: 'water',
    title: 'Water',
    price: '$2',
    image: menuImage('water.jpg'),
    category: 'drinks',
    ingredients: ['Bottled water'],
    description: 'Cold bottled water.',
    tags: ['Drink'],
  },
]

export const video = {
  chefPlating: 'https://www.pexels.com/download/video/8626681/',
  diningRoom: 'https://www.pexels.com/download/video/37080421/',
  tableService: 'https://www.pexels.com/download/video/8626668/',
  kitchenPass: 'https://www.pexels.com/download/video/19905887/',
  wineDinner: 'https://www.pexels.com/download/video/28880658/',
}

export const announcementMessages = [
  'Now Booking Catering Events',
  'Soul Food Done Right',
  'Serving Florida & Beyond',
]

export const navLinks = {
  left: [
    { label: 'Menu', href: `/menu` },
    { label: 'Cart', href: `/cart` },
    { label: 'Contact', href: `/contact` },
  ],
  right: [
    { label: 'Services', href: `/services` },
    { label: 'Book Now', href: `/booking` },
  ],
}

export const hero = {
  desktopImage: image('262978'),
  mobileImage: image('958545'),
  video: video.diningRoom,
  title: ['Pot Rankinz', 'Kitchen'],
  description: ['Soul food & catering, done right', 'Florida & beyond'],
  href: `${siteRoot}/booking`,
  cta: 'Book Catering',
}

export const mission = {
  label: 'Our kitchen',
  text: 'We cook with seasonal produce, patient sauces, bold spices, and generous hospitality — every plate built with warmth and served right, whether at your table or ours.',
}

export const categoryRail = {
  tabs: ['Tasting Menu', 'A La Carte', 'Cellar'],
  products: [
    {
      title: 'Charred Citrus Crudo',
      price: '$18',
      href: `${siteRoot}/menu/charred-citrus-crudo`,
      image:
        'https://images.pexels.com/photos/17500735/pexels-photo-17500735.jpeg',
      hoverImage: image('35283768'),
    },
    {
      title: 'Garden Herb Focaccia',
      price: '$12',
      href: `${siteRoot}/menu/garden-herb-focaccia`,
      image: image('30322395'),
      hoverImage: image('29748355'),
    },
    {
      title: 'Ember-Roasted Carrots',
      price: '$16',
      href: `${siteRoot}/menu/ember-roasted-carrots`,
      image: image('35283768'),
      hoverImage: image('17500735'),
    },
    {
      title: 'Hand-Cut Tagliatelle',
      price: '$26',
      href: `${siteRoot}/menu/hand-cut-tagliatelle`,
      image: image('1435904'),
      hoverImage: image('262978'),
    },
    {
      title: 'Market Fish, Brown Butter',
      price: '$34',
      href: `${siteRoot}/menu/market-fish`,
      image: image('262978'),
      hoverImage: image('958545'),
    },
  ],
}

export const giantCategories = {
  items: ['Dinner', 'Wine Cellar', 'Chef Counter'],
  image: 'https://images.pexels.com/photos/35283768/pexels-photo-35283768.jpeg',
  href: `${siteRoot}/menu`,
}

export const rainbowRestock = {
  href: `${siteRoot}/tasting-menu`,
  title: 'Tasting Menu',
  description:
    'A five-course route through the season, built around coastal vegetables, flame-kissed proteins, bright herbs, and a cellar pairing selected each evening.',
  image: 'https://images.pexels.com/photos/30322395/pexels-photo-30322395.jpeg',
  supportingImage:
    'https://images.pexels.com/photos/17500735/pexels-photo-17500735.jpeg',
  supportingVideo: video.chefPlating,
  cta: 'View Menu',
}

export const houseSignatures = {
  href: `${siteRoot}/chef-counter`,
  title: 'Chef Counter',
  cta: 'Book Seats',
  image: image('29748355'),
  video: video.kitchenPass,
}

export const handmadeInIrelandSlides = [
  {
    href: `${siteRoot}/private-dining`,
    title: 'Private Dining',
    description:
      'Host twelve to forty guests in a low-lit room with family-style courses, seasonal florals, and wine service shaped around the table.',
    image: image('35283768'),
    supportingImage: image('30322395'),
    supportingVideo: video.diningRoom,
    cta: 'Plan An Event',
  },
  {
    href: `${siteRoot}/our-kitchen`,
    title: 'Open Kitchen',
    description:
      'Our cooks work in full view of the dining room, finishing handmade pastas, grilled vegetables, and hearth-roasted mains over open flame.',
    image: image('29748355'),
    supportingImage: image('17500735'),
    supportingVideo: video.tableService,
    cta: 'Meet The Team',
  },
  {
    href: `${siteRoot}/wine`,
    title: 'Cellar Pairings',
    description:
      'Old-world bottles, low-intervention growers, and by-the-glass pours chosen to keep dinner generous, textured, and easy to share.',
    image: image('30322395'),
    supportingImage: image('35283768'),
    supportingVideo: video.wineDinner,
    cta: 'Explore Wine',
  },
]

export const stories = [
  {
    tag: 'Kitchen Notes',
    date: 'This Week',
    title: 'Spring At The Pass',
    teaser: 'Peas, ramps, citrus, and the first bright plates of the season.',
    href: `${siteRoot}/journal/spring-at-the-pass`,
    image: image('17500735'),
  },
  {
    tag: 'Events',
    date: 'May 18',
    title: 'Winemaker Dinner',
    teaser: 'Four courses with a Loire Valley producer and our cellar team.',
    href: `${siteRoot}/events/winemaker-dinner`,
    image: image('30322395'),
  },
  {
    tag: 'Staff Picks',
    date: 'Daily',
    title: 'By The Glass',
    teaser: 'The pours our servers are pairing with grilled fish and pasta.',
    href: `${siteRoot}/journal/by-the-glass`,
    image: image('35283768'),
  },
  {
    tag: 'Gatherings',
    date: 'Now Booking',
    title: 'The Garden Room',
    teaser:
      'An intimate dining room for celebrations, launches, and long dinners.',
    href: `${siteRoot}/private-dining/garden-room`,
    image: image('29748355'),
  },
]

export const instagramImages = [
  image('29748355'),
  image('30322395'),
  image('17500735'),
  image('35283768'),
  image('1435904'),
  image('958545'),
  image('262978'),
  image('1640777'),
  image('6260921'),
  image('5175537'),
  image('3184183'),
  image('1307698'),
  image('376464'),
  image('1640774'),
]

export const footer = {
  backgroundImage: image('262978'),
  newsletterTitle: 'Pot Rankinz Dispatch',
  newsletterDescription:
    'Join our list for seasonal menus, catering packages, private event openings, and occasional notes from the kitchen.',
  columns: [
    {
      title: 'Restaurant',
      links: [
        { label: 'Menus', href: `${siteRoot}/menu` },
        { label: 'Book Now', href: `${siteRoot}/booking` },
        { label: 'Services', href: `${siteRoot}/services` },
        { label: 'Contact', href: `${siteRoot}/contact` },
      ],
    },
    {
      title: 'Visit',
      links: [
        { label: 'Hours', href: `${siteRoot}/contact` },
        { label: 'Location', href: `${siteRoot}/contact` },
        { label: 'Accessibility', href: `${siteRoot}/accessibility` },
        { label: 'Careers', href: `${siteRoot}/careers` },
        { label: 'Press', href: `${siteRoot}/press` },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/' },
        { label: 'TikTok', href: 'https://www.tiktok.com/' },
        { label: 'Facebook', href: 'https://www.facebook.com/' },
        { label: 'Resy', href: 'https://resy.com/' },
      ],
    },
  ],
  hours: [
    'Tue-Thu 11am-8pm',
    'Fri-Sat 11am-10pm',
    'Sun 12pm-6pm',
    'Mon closed',
  ],
  contactLines: ['Florida & beyond', 'Catering inquiries welcome'],
  externalLinks: [
    { label: 'Google Maps', href: 'https://maps.google.com/' },
    { label: 'Yelp', href: 'https://www.yelp.com/' },
    { label: 'DoorDash', href: 'https://www.doordash.com/' },
  ],
  legalLinks: [
    { label: 'Terms of Use', href: `${siteRoot}/terms` },
    { label: 'Privacy Policy', href: `${siteRoot}/privacy` },
    { label: 'Accessibility', href: `${siteRoot}/accessibility` },
  ],
}
