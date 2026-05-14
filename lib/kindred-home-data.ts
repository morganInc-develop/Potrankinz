const siteRoot = ''

export const restaurantName = 'Pot Rankinz Kitchen'
export const restaurantHandle = '@POTRANKINZKITCHEN'

const image = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

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
      'Our private dining room seats twelve to forty guests in a low-lit space with family-style courses, seasonal florals, and dedicated wine service shaped around your table.',
    includes: [
      'Dedicated private room',
      'Custom seasonal menu',
      'Full service team',
      'Wine pairing available',
      'AV & florals on request',
    ],
    image: image('35283768'),
    cta: 'Plan Your Event',
    href: '/contact',
    priceNote: 'From $95 per person',
  },
  {
    id: 'catering',
    title: 'Catering',
    utensil: 'ladle',
    tag: '✦ Off-Site Events',
    description:
      'We bring the Pot Rankinz kitchen to you — full equipment, a dedicated service team, and menus designed entirely around your event and your guests.',
    includes: [
      'On-site kitchen setup',
      'Custom event menu',
      'Dedicated service staff',
      'Equipment & tableware',
      'Full dietary accommodation',
      'Pre-event tasting session',
    ],
    image: image('29748355'),
    cta: 'Request a Quote',
    href: '/contact',
    priceNote: 'Custom pricing',
    featured: true,
  },
  {
    id: 'chefs-counter',
    title: "Chef's Counter",
    utensil: 'knife',
    tag: '✦ 8 Seats Only',
    description:
      'Eight seats along our open kitchen, directly facing the pass. A tasting experience where the menu evolves course by course based on what the kitchen is most excited about tonight.',
    includes: [
      "8-seat counter — chef's view",
      '7-course tasting menu',
      'Live kitchen interaction',
      'Wine pairing included',
      'Signed menu to take home',
    ],
    image: image('30322395'),
    cta: 'Book Counter Seats',
    href: `${siteRoot}/reservations`,
    priceNote: '$185 per person, all-inclusive',
  },
  {
    id: 'buyouts',
    title: 'Buyouts & Events',
    utensil: 'whisk',
    tag: '✦ Exclusive Use',
    description:
      'Take the entire restaurant for your launch, celebration, or corporate dinner. Up to eighty guests, a custom program, and the full Pot Rankinz team at your disposal.',
    includes: [
      'Exclusive restaurant use',
      'Up to 80 guests',
      'Custom menu & drinks list',
      'Event programming',
      'Décor consultation',
    ],
    image: image('17500735'),
    cta: 'Discuss a Buyout',
    href: '/contact',
    priceNote: 'From $12,000',
  },
]

// ─── Menu types ───────────────────────────────────────────────────────────────

export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'cellar'

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
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'cellar', label: 'Cellar' },
]

export const menuHero = {
  image: image('376464'),
  tag: '✦ Spring · 2026',
}

export const menuItems: MenuItem[] = [
  // ── Starters ──
  {
    id: 'crudo',
    title: 'Charred Citrus Crudo',
    price: '$18',
    image: image('17500735'),
    category: 'starters',
    ingredients: [
      'Sashimi-grade yellowtail',
      'Yuzu kosho',
      'Charred citrus oil',
      'Sea salt flakes',
      'Micro shiso',
    ],
    description:
      'Thinly sliced yellowtail cured briefly in citrus, finished with a smoky oil pressed from charred orange peels.',
    chefNote: 'Best with the Muscadet.',
    tags: ['GF', 'Raw Fish'],
  },
  {
    id: 'focaccia',
    title: 'Garden Herb Focaccia',
    price: '$12',
    image: image('30322395'),
    category: 'starters',
    ingredients: [
      'Slow-fermented dough',
      'Rosemary, thyme, sage',
      'Finishing olive oil',
      'Fleur de sel',
      'Whipped ricotta',
    ],
    description:
      'Dimpled and golden, baked in cast iron, served warm with whipped ricotta and herb-infused oil.',
    tags: ['Vegetarian'],
  },
  {
    id: 'carrots',
    title: 'Ember-Roasted Carrots',
    price: '$16',
    image: image('35283768'),
    category: 'starters',
    ingredients: [
      'Heirloom carrots',
      'Fermented honey glaze',
      'Carrot-top pesto',
      'Toasted hazelnuts',
      'Aged balsamic',
    ],
    description:
      'Buried in the ash bed for two hours, pulled when tender and lacquered in fermented honey.',
    chefNote: 'The pesto uses the tops — nothing wasted.',
    tags: ['GF', 'Vegan'],
  },
  {
    id: 'burrata',
    title: 'Burrata & Stone Fruit',
    price: '$19',
    image: image('1435904'),
    category: 'starters',
    ingredients: [
      'Fresh burrata',
      'Grilled white nectarine',
      'Prosciutto di Parma',
      'Toasted pine nuts',
      'Wild arugula',
      'Aged balsamic',
    ],
    description:
      'Hand-pulled burrata, torn at the table, laid over grilled stone fruit with prosciutto and bitter greens.',
    tags: ['GF'],
  },

  // ── Mains ──
  {
    id: 'tagliatelle',
    title: 'Hand-Cut Tagliatelle',
    price: '$26',
    image: image('1640777'),
    category: 'mains',
    ingredients: [
      '00 flour pasta',
      'Porcini & black truffle ragù',
      'Aged Parmigiano',
      'Lemon zest',
      'Chervil',
    ],
    description:
      'Pasta made each morning, cut wide, and tossed in a slow ragù of porcini and fresh black truffle.',
    chefNote: 'Order this one. Seriously.',
    tags: ['Vegetarian', "Chef's Pick"],
  },
  {
    id: 'fish',
    title: 'Market Fish, Brown Butter',
    price: '$34',
    image: image('262978'),
    category: 'mains',
    ingredients: [
      'Market fish (daily)',
      'Noisette butter',
      'Capers & lemon',
      'Braised chicory',
      'Herb oil',
    ],
    description:
      'Sourced daily from the pier, pan-basted in foaming butter, plated over bitter braised chicory.',
    tags: ['GF', 'Seasonal'],
  },
  {
    id: 'pork',
    title: 'Wood-Grilled Pork Collar',
    price: '$38',
    image: image('6260921'),
    category: 'mains',
    ingredients: [
      'Heritage pork collar',
      '72-hr brine',
      'Charred apple & fig',
      'Mustard jus',
      'Pickled cabbage',
    ],
    description:
      'Collar brined for three days, grilled over oak at high heat, rested and sliced thick.',
    chefNote: 'Pairs beautifully with the Rhône.',
    tags: ['GF'],
  },
  {
    id: 'chicken',
    title: 'Heritage Chicken, Jus',
    price: '$32',
    image: image('958545'),
    category: 'mains',
    ingredients: [
      'Free-range heritage bird',
      'Deep-pan roasting jus',
      'Garlic confit',
      'Wilted greens',
      'Fleur de sel',
    ],
    description:
      'Roasted whole, rested for fifteen minutes, portioned at the table, finished with a deep-pan jus.',
    tags: ['GF'],
  },

  // ── Desserts ──
  {
    id: 'panna-cotta',
    title: 'Burnt Honey Panna Cotta',
    price: '$14',
    image: image('5175537'),
    category: 'desserts',
    ingredients: [
      'Jersey cream',
      'Wildflower honey (burnt)',
      'Vanilla bean',
      'Seasonal berry coulis',
      'Candied fennel',
    ],
    description:
      'Silken cream set just barely, topped with honey taken past golden into something dark and complex.',
    tags: ['GF'],
  },
  {
    id: 'olive-oil-cake',
    title: 'Citrus Olive Oil Cake',
    price: '$13',
    image: image('3184183'),
    category: 'desserts',
    ingredients: [
      'Arbequina olive oil',
      'Meyer lemon & orange zest',
      'Semolina',
      'Whipped crème fraîche',
      'Candied peel',
    ],
    description:
      'Dense, fragrant, best served slightly warm with a cloud of crème fraîche and candied citrus peel.',
    chefNote: "The most requested recipe we don't share.",
    tags: ['Vegetarian'],
  },
  {
    id: 'chocolate-tart',
    title: 'Dark Chocolate Tart',
    price: '$15',
    image: image('1307698'),
    category: 'desserts',
    ingredients: [
      '70% Valrhona chocolate',
      'Maldon salt',
      'Butter pastry shell',
      'Espresso ganache',
      'Gold leaf',
    ],
    description:
      'A thin-shelled tart filled with barely set espresso ganache. One clean slice, served at room temperature.',
    tags: ['Vegetarian'],
  },

  // ── Cellar ──
  {
    id: 'muscadet',
    title: 'Muscadet Sur Lie',
    price: '$16 / glass',
    image: image('1640774'),
    category: 'cellar',
    ingredients: [
      'Melon de Bourgogne',
      'Loire Valley, FR',
      'Vintage 2022',
      'Sur lie — 18 months',
    ],
    description:
      'Bone dry with a saline mineral edge. The house pour for anything raw or delicate.',
    tags: ['White', 'Biodynamic'],
  },
  {
    id: 'petnat',
    title: 'Pét-Nat Rosé',
    price: '$14 / glass',
    image: image('29748355'),
    category: 'cellar',
    ingredients: [
      'Grenache & Mourvèdre',
      'Provence, FR',
      'Vintage 2023',
      'Naturally sparkling',
    ],
    description:
      'Cloudy, lively, with strawberry and white pepper. Low intervention, no disgorgement.',
    chefNote: 'Great with the crudo.',
    tags: ['Rosé', 'Natural'],
  },
  {
    id: 'rioja',
    title: 'Rioja Reserva',
    price: '$18 / glass',
    image: image('30322395'),
    category: 'cellar',
    ingredients: [
      'Tempranillo',
      'La Rioja, ES',
      'Vintage 2018',
      '24 months barrel aged',
    ],
    description:
      'Ripe cherry and leather, well-integrated tannins, a long finish with dried herbs and cedar.',
    tags: ['Red', 'Old World'],
  },
  {
    id: 'rhone',
    title: 'Côtes du Rhône',
    price: '$15 / glass',
    image: image('35283768'),
    category: 'cellar',
    ingredients: [
      'Grenache, Syrah, Mourvèdre',
      'Rhône Valley, FR',
      'Vintage 2021',
    ],
    description:
      'Earthy and generous, with plum and black olive. Made for the pork collar and aged cheeses.',
    chefNote: 'Table favourite all winter.',
    tags: ['Red', 'Organic'],
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
        { label: 'Reservations', href: `${siteRoot}/reservations` },
        { label: 'Private Dining', href: `${siteRoot}/private-dining` },
        { label: 'Gift Cards', href: `${siteRoot}/gift-cards` },
        { label: 'Contact', href: `${siteRoot}/contact` },
      ],
    },
    {
      title: 'Visit',
      links: [
        { label: 'Hours', href: `${siteRoot}/hours` },
        { label: 'Location', href: `${siteRoot}/location` },
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
  legalLinks: [
    { label: 'Terms of Use', href: `${siteRoot}/terms` },
    { label: 'Privacy Policy', href: `${siteRoot}/privacy` },
    { label: 'Accessibility', href: `${siteRoot}/accessibility` },
  ],
}
