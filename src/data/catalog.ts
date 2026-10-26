import type { Banner, Category, CategorySlide, Innovation, NewsItem, Product, Showcase, SpecGroup } from '../types'
import { img, optionalImg, slideBanners, topFreezerRFT, topFreezerTitan, washingMachines, televisions, microwaves } from './assets'

// Placeholder image (data URI) for categories/types that don't have a photo yet.
// Drop real images in later and swap the category image below.
const placeholder = (label: string): string => {
  const safe = label.replace(/&/g, 'and')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
    <rect width="100%" height="100%" fill="#f0f5f5"/>
    <rect x="150" y="96" width="100" height="78" rx="10" fill="none" stroke="#1AA19C" stroke-width="3"/>
    <text x="200" y="220" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#0c1320" text-anchor="middle">${safe}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Nav-bar mega-menu icons, keyed by category id. These are the ONLY images the
// nav bar uses — drop a file in src/images/icons/ and add it here to give a
// category its nav icon. Categories missing here fall back to the product photo.
const categoryNavIcon: Record<string, string> = {
  laundry: img('icons/wm_icon.jpg'),
  tv: img('icons/tv_icon.png')
}

// Nav-menu icons per product type (used when a category groups its mega-menu
// tiles by type, e.g. Dishwasher → Lunex / Goldex). Keyed by the product `type`.
// Types without an entry here fall back to the group's first product photo.
export const typeNavIcon: Record<string, string> = {
  Lunex: img('icons/dw_lunex_icon.jpg'),
  Goldex: img('icons/dw_goldex_icon.jpg'),
  '4Door': img('icons/ref/4door.png'),
  'Side-by-Side': img('icons/ref/SBS.png'),
  Mini: img('icons/ref/mini.png'),
  Twin: img('icons/ref/twin.png'),
  'Top Freezer': img('icons/ref/Top-Freezer.gif'),
  'Wall Mounted': img('icons/ac/wall.png'),
  Window: img('icons/ac/windwos.png'),
  'Floor Standing': img('icons/ac/ac_floor_standing.png'),
  Cassette: img('icons/ac/CASSETE.png'),
  'Front Load': img('icons/wm/wm.png'),
  'Twin Tub': img('icons/wm/Twin Tub.png'),
  'Top Load': img('icons/wm/top.png'),
  'Showcase Freezer': img('icons/ref/cf.gif'),
  Showcase: img('icons/ref/showcase.gif')
}

// A photo per category where we have one; otherwise a labeled placeholder.
const categoryImage: Record<string, string> = {
  ac: img('Air_Conditioner/air_co.jpg'),
  fridge: img('Refrigerator/Refrigerator.jpg'),
  laundry: img('wm/wm_category.jpg'),
  dishwasher: img('Dish_Washer/Dish_Washer.jpg'),
  vacuum: img('Vacuum_Cleaner/Vacuum_Cleaner.png'),
  tv: img('TV/tv.jpg'),
  freezer: img('Freezer/Freezer.jpg'),
  waterdispenser: img('water dispenser/Water_Dispenser.jpg')
}

const rawCategories: Category[] = [
  { id: 'ac', name: 'Air Conditioner', tagline: 'Smart climate control', image: categoryImage.ac },
  { id: 'fridge', name: 'Refrigerators & Freezers', tagline: 'Keep it fresh longer', image: categoryImage.fridge },
  { id: 'laundry', name: 'Washing Machine', tagline: 'Care for every fabric', image: categoryImage.laundry },
  { id: 'dishwasher', name: 'Dishwasher', tagline: 'Sparkling, effortlessly', image: categoryImage.dishwasher },
  { id: 'waterheater', name: 'Water Heater', tagline: 'Hot water on demand', image: placeholder('Water Heater') },
  { id: 'waterdispenser', name: 'Water Dispenser', tagline: 'Hot, cold & normal water on tap', image: categoryImage.waterdispenser },
  { id: 'cooking', name: 'Kitchen Cooking Appliances', tagline: 'Cook with confidence', image: placeholder('Cooking') },
  { id: 'rangehood', name: 'Range Hood / Extractor', tagline: 'A cleaner kitchen air', image: placeholder('Range Hood') },
  { id: 'smallkitchen', name: 'Small Kitchen Appliances', tagline: 'Everyday kitchen helpers', image: placeholder('Small Kitchen') },
  { id: 'vacuum', name: 'Vacuum Cleaner', tagline: 'Powerful, effortless cleaning', image: categoryImage.vacuum },
  { id: 'fan', name: 'Fan', tagline: 'Stay cool, all year', image: placeholder('Fan') },
  { id: 'heater', name: 'Heater', tagline: 'Cozy warmth, fast', image: placeholder('Heater') },
  { id: 'tv', name: 'TV', tagline: 'Immersive entertainment', image: categoryImage.tv },
  { id: 'solar', name: 'Solar', tagline: 'Clean energy for home', image: placeholder('Solar') },
  { id: 'generator', name: 'Generator', tagline: 'Reliable backup power', image: placeholder('Generator') }
]

// Attach each category's nav-bar icon (if one exists in the icons folder).
export const categories: Category[] = rawCategories.map((c) => ({
  ...c,
  ...(categoryNavIcon[c.id] ? { navIcon: categoryNavIcon[c.id] } : {})
}))

// The product "types" that belong to each category.
const categoryTypes: Record<string, string[]> = {
  // 'Wall Mounted', 'Window' and 'Floor Standing' are supplied as real products
  // (see acPistonProducts, acWindowProducts and acFloorProducts).
  ac: [], // all air conditioners are real products (Wall Mounted, Window, Floor Standing, Cassette)
  fridge: [], // fridges + freezers are all real products (4Door, SBS, Mini, Twin, Top/Chest/Showcase Freezer)
  laundry: [], // all washing machines are real products (Front Load, Twin Tub, Top Load)
  dishwasher: ['Freestanding', 'Semi-Integrated', 'Countertop', 'Drawer-style'],
  waterheater: ['Storage Tank', 'Instant/Tankless', 'Solar', 'Gas', 'Electric'],
  waterdispenser: [], // all real products (UN-WD8W colour variants)
  // 'Microwave Oven' is supplied as real products (see microwaveProducts).
  cooking: ['Gas Stove/Cooker', 'Electric Cooktop', 'Induction Cooktop', 'Built-in Oven', 'Air Fryer', 'Range/Cooker (Freestanding)'],
  rangehood: ['Wall Mounted', 'Under Cabinet', 'Built-in/Integrated', 'Downdraft'],
  smallkitchen: ['Blender', 'Mixer/Stand Mixer', 'Food Processor', 'Toaster', 'Kettle', 'Coffee Maker', 'Juicer', 'Rice Cooker'],
  vacuum: ['Mouse', 'Robot', 'Handheld/Stick', 'Wet & Dry'], // Barrel is real (Nobel Series)
  fan: ['Ceiling Fan', 'Standing/Pedestal Fan', 'Table Fan', 'Wall Mounted Fan', 'Exhaust Fan', 'Tower Fan'],
  heater: ['Radiator/Convector', 'Fan Heater', 'Infrared Heater', 'Oil-Filled Heater', 'Gas Heater'],
  tv: ['ULED'], // real TVs are QLED/UHD/FHD (tvProducts); ULED is a placeholder filter
  freezer: [], // Freezer merged into "Refrigerators & Freezers" (fridge)
  solar: ['Panel', 'Inverter'],
  generator: ['Inverter']
}

// Two generic feature chips per category, shown on each type card.
const categoryTags: Record<string, string[]> = {
  ac: ['Powerful Cooling', 'Energy Efficient'],
  fridge: ['Fresh Cooling', 'Low Noise'],
  laundry: ['Deep Clean', 'Fabric Care'],
  dishwasher: ['Sparkling Clean', 'Eco Wash'],
  waterheater: ['Fast Heating', 'Safe & Efficient'],
  cooking: ['Precise Cooking', 'Easy to Clean'],
  rangehood: ['Strong Extraction', 'Quiet'],
  smallkitchen: ['Everyday Ease', 'Compact'],
  vacuum: ['Strong Suction', 'Lightweight'],
  fan: ['Powerful Airflow', 'Quiet'],
  heater: ['Fast Warmth', 'Energy Saving'],
  tv: ['Vivid Picture', 'Smart Apps'],
  freezer: ['Deep Freeze', 'Frost Free'],
  solar: ['Clean Energy', 'High Efficiency'],
  generator: ['Reliable Power', 'Fuel Efficient']
}

// A badge on the first type of these categories → they appear in "Featured products".
const featuredBadge: Record<string, string> = {
  ac: 'Inverter',
  fridge: 'No Frost',
  laundry: 'Inverter',
  tv: 'Smart TV'
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const banners: Banner[] = [
  { id: 'b1', link: '/products/tv', image: img('TV/tv.jpg'), video: optionalImg('Slides/tv.mp4') }
]

// ---------------------------------------------------------------------------
// Dishwashers — real Uneva models with photos and full specifications.
// Photos live in src/images/Dish_Washer/DW/<model>/web/<n>.jpg (converted from
// the supplied TIFFs). Two families: Goldex (D1401) and Lunex (D1502).
// ---------------------------------------------------------------------------
const dwImg = (model: string, n: number) => img(`Dish_Washer/DW/${model}/web/${n}.jpg`)

// Builds the full spec sheet for a dishwasher family. Only the values that
// differ between the Goldex and Lunex families are passed in; the rest are
// shared and match the product spec sheet.
function dishwasherSpecs(o: {
  color: string
  motor: string
  capacity: string
  performance: string
  noise: string
  program: string
  func: string
  upperBasket: string
  rackMaterial: string
  productDim: string
  packageDim: string
}): SpecGroup[] {
  return [
    {
      group: 'General',
      rows: [
        { label: 'Installation', value: 'Freestanding' },
        { label: 'Motor', value: o.motor },
        { label: 'Color of machine', value: o.color },
        { label: 'Material of outer door', value: 'SS / SPCC' },
        { label: 'Capacity (place settings)', value: o.capacity },
        { label: 'Performance', value: o.performance },
        { label: 'Noise (dB(A))', value: o.noise },
        { label: 'Delay timer', value: '1–24 h' },
        { label: 'Child Lock', value: 'Yes' },
        { label: 'Program', value: o.program },
        { label: 'Function', value: o.func },
        { label: 'Type of indicator', value: 'LED light + LED display' },
        { label: 'Color of indicator', value: 'White' },
        { label: 'Special Features', value: 'No' },
        { label: 'Water sensor', value: 'Flowmeter' },
        { label: 'Sensor Wash', value: 'Yes' },
        { label: 'Antiflood device', value: 'Yes' },
      ],
    },
    {
      group: 'Technical & Internal Specification',
      rows: [
        { label: 'Voltage', value: '220–240 V' },
        { label: 'Frequency', value: '50 Hz' },
        { label: 'Rated power', value: '1760–2100 W' },
        { label: 'Inlet water pressure', value: '0.04–1 MPa' },
        { label: 'Power of heat element', value: '1800 W' },
        { label: 'Type of heating element', value: 'Hidden' },
        { label: 'Filter type', value: 'Self-cleaning filter system' },
        { label: 'Filter material', value: 'PP + 30%T + AISI304' },
        { label: 'Tub material', value: 'AISI430 + AISI304' },
        { label: 'Dispenser type', value: 'Mini' },
        { label: 'Water softener', value: 'Yes' },
        { label: 'Removable top', value: 'Yes' },
        { label: 'Drying system', value: 'Residual heating dry' },
        { label: 'Type of inlet hose', value: 'Standard' },
        { label: 'Temperature of inlet hose', value: 'Cold water' },
        { label: 'Power cord length', value: '1500 mm' },
        { label: 'Inlet hose length', value: '1500 mm' },
        { label: 'Outlet hose length (total)', value: '1614 mm' },
        { label: 'Outlet hose length (outside machine)', value: '1380 mm' },
      ],
    },
    {
      group: 'Baskets',
      rows: [
        { label: 'Number of racks', value: '3' },
        { label: 'Spray arms', value: 'Upper + Lower + Top' },
        { label: 'Foldable bottom plate racks', value: 'Yes' },
        { label: 'Height-adjustable upper basket', value: o.upperBasket },
        { label: 'Rack material', value: o.rackMaterial },
        { label: 'Cup shelf', value: '1' },
        { label: 'Silverware basket location', value: 'Bottom drawer' },
      ],
    },
    {
      group: 'Product & Packaging Information',
      rows: [
        { label: 'Product dimensions (W×D×H)', value: `${o.productDim} mm` },
        { label: 'Package dimensions (W×D×H)', value: `${o.packageDim} mm` },
        { label: 'Loading capacity (20 / 40GP / 40HQ)', value: '54 / 108 / 162' },
      ],
    },
  ]
}

// All photos of one model folder, in the given order (front shot first).
const dwGallery = (folder: string, order: number[]) => order.map((n) => dwImg(folder, n))

// Family spec sheets — one per series; only the machine colour varies per model.
const goldexSpecs = (color: string) =>
  dishwasherSpecs({
    color,
    motor: 'Digital',
    capacity: '14',
    performance: 'A++',
    noise: '55',
    program: 'Intensive / Normal / ECO / Glass / 90 min / Rapid / Soak',
    func: 'Power Wash, Auto Open, Half Load',
    upperBasket: 'Non-adjustable',
    rackMaterial: 'PP',
    productDim: '598 × 604 × 845',
    packageDim: '645 × 645 × 884',
  })

const lunexSpecs = (color: string) =>
  dishwasherSpecs({
    color,
    motor: 'BLDC Motor',
    capacity: '15',
    performance: 'A+++',
    noise: '44',
    program: 'Auto / Hygiene 72 / ECO / Glass / 90 min / 58 min / Rapid / Soak / Self-cleaning',
    func: 'Extra Drying, Turbo Speed+, Auto Open, Alternative Wash',
    upperBasket: 'Option',
    rackMaterial: 'Option (PP / PA)',
    productDim: '598 × 600 × 845',
    packageDim: '645 × 645 × 890',
  })

const goldexHighlights = ['14 place settings', 'A++ efficiency', '55 dB quiet wash', 'Power Wash + Auto Open']
const lunexHighlights = ['15 place settings', 'A+++ efficiency', '44 dB ultra-quiet', 'BLDC Turbo Speed+']

// One card per model/colour. The front-facing (closed) photo is used as the
// card image; the folder's remaining shots fill the detail-view gallery.
const dishwasherProducts: Product[] = [
  {
    id: 'dishwasher-lunex-d1502s',
    name: 'Lunex D1502S',
    categoryId: 'dishwasher',
    series: 'Lunex Series · Silver',
    type: 'Lunex',
    rating: 4.8,
    badge: 'A+++',
    highlights: lunexHighlights,
    models: ['D1502S Lunex'],
    image: dwImg('D1502S Lunex', 1),
    gallery: dwGallery('D1502S Lunex', [1, 2, 3, 4, 5]),
    specs: lunexSpecs('Silver'),
  },
  {
    id: 'dishwasher-lunex-d1502ss',
    name: 'Lunex D1502SS',
    categoryId: 'dishwasher',
    series: 'Lunex Series · Stainless',
    type: 'Lunex',
    rating: 4.8,
    badge: 'A+++',
    highlights: lunexHighlights,
    models: ['D1502SS Lunex'],
    image: dwImg('D1502SS Lunex', 5),
    gallery: dwGallery('D1502SS Lunex', [5, 1, 2, 3, 4]),
    specs: lunexSpecs('Stainless Steel'),
  },
  {
    id: 'dishwasher-lunex-d1502b',
    name: 'Lunex D1502B',
    categoryId: 'dishwasher',
    series: 'Lunex Series · Black',
    type: 'Lunex',
    rating: 4.8,
    badge: 'A+++',
    highlights: lunexHighlights,
    models: ['D1502B Lunex'],
    image: dwImg('D1502B Lunex', 1),
    gallery: dwGallery('D1502B Lunex', [1, 2, 3, 4, 5]),
    specs: lunexSpecs('Black'),
  },
  {
    id: 'dishwasher-goldex-d1401w',
    name: 'Goldex D1401W',
    categoryId: 'dishwasher',
    series: 'Goldex Series · White',
    type: 'Goldex',
    rating: 4.6,
    highlights: goldexHighlights,
    models: ['D1401W Goldex'],
    image: dwImg('D1401W Goldex', 1),
    gallery: dwGallery('D1401W Goldex', [1, 2, 3, 4, 5]),
    specs: goldexSpecs('White'),
  },
  {
    id: 'dishwasher-goldex-d1401s',
    name: 'Goldex D1401S',
    categoryId: 'dishwasher',
    series: 'Goldex Series · Silver',
    type: 'Goldex',
    rating: 4.6,
    highlights: goldexHighlights,
    models: ['D1401S Goldex'],
    image: dwImg('D1401S Goldex', 5),
    gallery: dwGallery('D1401S Goldex', [5, 1, 2, 3, 4]),
    specs: goldexSpecs('Silver'),
  },
]

// ---------------------------------------------------------------------------
// Microwave Ovens — real Uneva MV42 models with photos and full specs.
// Photos: src/images/Microwave/MV42/<model>/  (hero = <model>.png, rest gallery)
// Model code: MV42 = 42 L microwave · N/G = without/with grill ·
// H/W = chrome handle / push-button door · B = black.
// ---------------------------------------------------------------------------
const mwPhotos = (model: string): string[] =>
  microwaves.find((m) => m.folder.toLowerCase() === model.toLowerCase())?.photos ?? []

interface MicrowaveVals {
  grill: boolean
  door: string // 'Chrome handle' | 'Push button'
  netWeight: string // e.g. '15.9'
  grossWeight: string // e.g. '17.5'
}

const microwaveSpecs = (o: MicrowaveVals): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Type', value: `42 L digital microwave oven ${o.grill ? 'with grill' : 'without grill'}` },
      { label: 'Capacity', value: '42 L' },
      { label: 'Colour', value: 'Black housing, Grey cavity' },
      { label: 'Power levels', value: '10' },
      { label: 'Timer', value: `99'99" digital` },
      { label: 'Door', value: 'Normal glass door' },
      { label: 'Door opening', value: o.door },
    ],
  },
  {
    group: 'Performance',
    rows: [
      { label: 'Output power', value: '1000 W' },
      ...(o.grill ? [{ label: 'Grill power', value: '1500 W' }] : []),
      { label: 'Turntable glass', value: '345 mm' },
      { label: 'Plug', value: 'VDE plug' },
    ],
  },
  {
    group: 'Product & Packaging Information',
    rows: [
      { label: 'Net weight', value: `${o.netWeight} kg` },
      { label: 'Gross weight', value: `${o.grossWeight} kg` },
      { label: 'Carton size (W×D×H)', value: '591 × 462 × 374 mm' },
    ],
  },
]

const microwaveHighlights = (grill: boolean): string[] => [
  '42 L capacity',
  '10 power levels',
  '1000 W output power',
  ...(grill ? ['1500 W grill'] : []),
  `99'99" digital timer`,
]

// One card per model. Chrome-handle vs push-button and grill vs no-grill are the
// only differences within the MV42 family.
const microwaveProducts: Product[] = [
  {
    id: 'microwave-un-mv42nhb',
    name: '42 L Microwave — Chrome Handle',
    categoryId: 'cooking',
    series: 'MV42 Series · UN-MV42NHB',
    type: 'Microwave Oven',
    rating: 4.5,
    highlights: microwaveHighlights(false),
    models: ['UN-MV42NHB'],
    image: mwPhotos('UN-MV42NHB')[0] ?? placeholder('UN-MV42NHB'),
    gallery: mwPhotos('UN-MV42NHB'),
    specs: microwaveSpecs({ grill: false, door: 'Chrome handle', netWeight: '15.9', grossWeight: '17.5' }),
  },
  {
    id: 'microwave-un-mv42nwb',
    name: '42 L Microwave — Push Button',
    categoryId: 'cooking',
    series: 'MV42 Series · UN-MV42NWB',
    type: 'Microwave Oven',
    rating: 4.5,
    highlights: microwaveHighlights(false),
    models: ['UN-MV42NWB'],
    image: mwPhotos('UN-MV42NWB')[0] ?? placeholder('UN-MV42NWB'),
    gallery: mwPhotos('UN-MV42NWB'),
    specs: microwaveSpecs({ grill: false, door: 'Push button', netWeight: '15.7', grossWeight: '17.4' }),
  },
  {
    id: 'microwave-un-mv42ghb',
    name: '42 L Microwave with Grill — Chrome Handle',
    categoryId: 'cooking',
    series: 'MV42 Series · UN-MV42GHB',
    type: 'Microwave Oven',
    rating: 4.6,
    badge: 'Grill',
    highlights: microwaveHighlights(true),
    models: ['UN-MV42GHB'],
    image: mwPhotos('UN-MV42GHB')[0] ?? placeholder('UN-MV42GHB'),
    gallery: mwPhotos('UN-MV42GHB'),
    specs: microwaveSpecs({ grill: true, door: 'Chrome handle', netWeight: '16.5', grossWeight: '18.4' }),
  },
  {
    id: 'microwave-un-mv42gwb',
    name: '42 L Microwave with Grill — Push Button',
    categoryId: 'cooking',
    series: 'MV42 Series · UN-MV42GWB',
    type: 'Microwave Oven',
    rating: 4.6,
    badge: 'Grill',
    highlights: microwaveHighlights(true),
    models: ['UN-MV42GWB'],
    image: mwPhotos('UN-MV42GWB')[0] ?? placeholder('UN-MV42GWB'),
    gallery: mwPhotos('UN-MV42GWB'),
    specs: microwaveSpecs({ grill: true, door: 'Push button', netWeight: '16.3', grossWeight: '18.2' }),
  },
]

// ---------------------------------------------------------------------------
// Water Dispensers — real Uneva UN-WD8W standing dispenser, one card per colour
// finish (top-panel colour is the only difference; specs are shared).
// Photos: src/images/water dispenser/WD/UN-WD8W<colour>.jpg
// Model code: WD8W = standing water dispenser · B/G/S/W = Black / Gold /
// Silver / White top panel.
// ---------------------------------------------------------------------------
const wdImg = (model: string) => img(`water dispenser/WD/${model}.jpg`)

const waterDispenserSpecs = (): SpecGroup[] => [
  {
    group: 'The Whole Machine Platform',
    rows: [
      { label: 'Type of water dispenser', value: 'Top loading with fridge' },
      { label: 'Cooling method', value: 'Compressor' },
      { label: 'Heating method', value: 'Inner' },
      { label: 'Tap quantity', value: '3' },
      { label: 'Type of tap', value: 'Push button faucet' },
    ],
  },
  {
    group: 'Electrical Data, Material & Noise',
    rows: [
      { label: 'Power supply', value: '220–240V~ 50/60Hz · 110–120V~ 50/60Hz' },
      { label: 'IP code', value: 'I' },
      { label: 'Rated input (cooling)', value: '100 W' },
      { label: 'Rated input (heating)', value: '420 W' },
      { label: 'Cooling power', value: '100 W' },
      { label: 'Cooling capacity', value: '2.0 L/h' },
      { label: 'Cold water temperature', value: '5–10 °C' },
      { label: 'Cooling power with refrigerator', value: '100 W' },
      { label: 'Heating power', value: '420 W' },
      { label: 'Heating capacity', value: '5.0 L/h' },
      { label: 'Hot water temperature', value: '85–95 °C' },
      { label: 'Water temperature (hot / cold / normal)', value: '≥85 °C / ≤10 °C / 25 °C' },
      { label: 'Water tank material (hot / cold)', value: 'SUS304 / SUS304' },
      { label: 'Daily energy consumption', value: '1.5 kWh' },
      { label: 'Noise level', value: '55 dB(A)' },
    ],
  },
  {
    group: 'Refrigerating & Compressor',
    rows: [
      { label: 'Refrigerant / charge', value: 'R134a / 42 g' },
      { label: 'Compressor coil material', value: 'Aluminum coil' },
    ],
  },
  {
    group: 'Product & Packaging Information',
    rows: [
      { label: 'Net dimensions (W×D×H)', value: '310 × 336 × 1012 mm' },
      { label: 'Net weight', value: '13 kg' },
      { label: 'Packing dimensions (W×D×H)', value: '372 × 392 × 1044 mm' },
      { label: 'Gross weight', value: '14.5 kg' },
      { label: "Loading capacity (40'HQ)", value: '430' },
    ],
  },
]

const waterDispenserHighlights = [
  'Hot, cold & normal water',
  'Top loading with built-in fridge',
  'Compressor cooling',
  '3 push-button taps',
  'SUS304 stainless steel tanks',
]

// One card per colour finish of the UN-WD8W standing dispenser.
const waterDispenserProducts: Product[] = [
  {
    id: 'waterdispenser-un-wd8wb',
    name: 'UN-WD8W Standing Dispenser — Black',
    categoryId: 'waterdispenser',
    series: 'WD8W Series · Black',
    rating: 4.5,
    highlights: waterDispenserHighlights,
    models: ['UN-WD8WB'],
    image: wdImg('UN-WD8WB'),
    gallery: [wdImg('UN-WD8WB')],
    specs: waterDispenserSpecs(),
  },
  {
    id: 'waterdispenser-un-wd8wg',
    name: 'UN-WD8W Standing Dispenser — Gold',
    categoryId: 'waterdispenser',
    series: 'WD8W Series · Gold',
    rating: 4.5,
    highlights: waterDispenserHighlights,
    models: ['UN-WD8WG'],
    image: wdImg('UN-WD8WG'),
    gallery: [wdImg('UN-WD8WG')],
    specs: waterDispenserSpecs(),
  },
  {
    id: 'waterdispenser-un-wd8ws',
    name: 'UN-WD8W Standing Dispenser — Silver',
    categoryId: 'waterdispenser',
    series: 'WD8W Series · Silver',
    rating: 4.5,
    highlights: waterDispenserHighlights,
    models: ['UN-WD8WS'],
    image: wdImg('UN-WD8WS'),
    gallery: [wdImg('UN-WD8WS')],
    specs: waterDispenserSpecs(),
  },
  {
    id: 'waterdispenser-un-wd8ww',
    name: 'UN-WD8W Standing Dispenser — White',
    categoryId: 'waterdispenser',
    series: 'WD8W Series · White',
    rating: 4.5,
    highlights: waterDispenserHighlights,
    models: ['UN-WD8WW'],
    image: wdImg('UN-WD8WW'),
    gallery: [wdImg('UN-WD8WW')],
    specs: waterDispenserSpecs(),
  },
]

// ---------------------------------------------------------------------------
// Cassette Air Conditioners — real Uneva models with photos and full specs.
// Photos: src/images/Air_Conditioner/CASSETTE AC/<model>/<file>.png
// ---------------------------------------------------------------------------
const acImg = (rel: string) => img(`Air_Conditioner/CASSETTE AC/${rel}`)

// Model-specific spec values for a cassette AC. Shared values (units, fin type,
// panel size, etc.) are baked into the builder below.
interface CassetteVals {
  others: string
  powerOutdoor: string
  annualKwh: string
  coolBtu: string; coolW: string; coolInput: string; coolCurrent: string; eer: string
  heatBtu: string; heatW: string; heatInput: string; heatCurrent: string; cop: string
  ratedPower: string; ratedCurrent: string
  inFanModel: string; inFanSpeed: string; inRows: string; inCoil: string; inCircuits: string
  inAirflow: string; inNoise: string; inDimBody: string; inPackBody: string; inQty: string
  compModel: string; compCap: string; compInput: string; compRLA: string; compOil: string
  outFanModel: string; outFanSpeed: string; outCoil: string; outCircuits: string; outNoise: string
  outDim: string; outPack: string; outWeight: string; outQty: string
  refrigerant: string; designPressure: string; maxPipe: string; maxLevel: string
  seerKw: string; seerKwh: string; seer: string; scopKw: string; scopKwh: string; scop: string
}

function cassetteSpecs(m: CassetteVals): SpecGroup[] {
  return [
    {
      group: 'General',
      rows: [
        { label: 'Type', value: 'Cassette · T1 50Hz R410A' },
        { label: 'Features', value: m.others },
        { label: 'Power supply (Indoor)', value: '220–240V, 1Ph, 50Hz' },
        { label: 'Power supply (Outdoor)', value: m.powerOutdoor },
        { label: 'Annual consumption', value: `${m.annualKwh} kWh` },
      ],
    },
    {
      group: 'Cooling (Standard conditions)',
      rows: [
        { label: 'Capacity', value: `${m.coolBtu} Btu/h` },
        { label: 'Capacity', value: `${m.coolW} W` },
        { label: 'Input', value: `${m.coolInput} W` },
        { label: 'Current', value: `${m.coolCurrent} A` },
        { label: 'EER', value: `${m.eer} W/W` },
      ],
    },
    {
      group: 'Heating (Standard conditions)',
      rows: [
        { label: 'Capacity', value: `${m.heatBtu} Btu/h` },
        { label: 'Capacity', value: `${m.heatW} W` },
        { label: 'Input', value: `${m.heatInput} W` },
        { label: 'Current', value: `${m.heatCurrent} A` },
        { label: 'COP', value: `${m.cop} W/W` },
      ],
    },
    {
      group: 'Electrical',
      rows: [
        { label: 'Rated power input', value: `${m.ratedPower} W` },
        { label: 'Rated current', value: `${m.ratedCurrent} A` },
      ],
    },
    {
      group: 'Indoor Unit',
      rows: [
        { label: 'Fan motor model', value: m.inFanModel },
        { label: 'Fan speed (Hi/Mi/Lo)', value: `${m.inFanSpeed} r/min` },
        { label: 'Coil — number of rows', value: m.inRows },
        { label: 'Coil — tube pitch × row pitch', value: '21 × 13.37 mm' },
        { label: 'Coil — fin spacing', value: '1.3 mm' },
        { label: 'Coil — fin type', value: 'Hydrophilic aluminum' },
        { label: 'Coil — tube dia. & type', value: 'Φ7, Inner groove tube' },
        { label: 'Coil — L × H × W', value: `${m.inCoil} mm` },
        { label: 'Coil — number of circuits', value: m.inCircuits },
        { label: 'Air flow (Hi/Mi/Lo)', value: `${m.inAirflow} m³/h` },
        { label: 'Noise level (Hi/Mi/Lo)', value: `${m.inNoise} dB(A)` },
        { label: 'Throttle type', value: 'Outdoor unit throttling' },
        { label: 'Dimension — body (W×D×H)', value: `${m.inDimBody} mm` },
        { label: 'Dimension — panel (W×D×H)', value: '950 × 950 × 55 mm' },
        { label: 'Packing — body (W×D×H)', value: `${m.inPackBody} mm` },
        { label: 'Packing — panel (W×D×H)', value: '1035 × 1035 × 90 mm' },
        { label: 'Drainage water pipe dia.', value: 'OD Φ25 mm' },
        { label: "Qty' per 20'/40'/40'HQ", value: m.inQty },
      ],
    },
    {
      group: 'Compressor',
      rows: [
        { label: 'Model', value: m.compModel },
        { label: 'Type', value: 'Twin-Rotary' },
        { label: 'Brand', value: 'GMCC' },
        { label: 'Capacity', value: `${m.compCap} W` },
        { label: 'Input', value: `${m.compInput} W` },
        { label: 'Rated current (RLA)', value: `${m.compRLA} A` },
        { label: 'Refrigerant oil / charge', value: m.compOil },
      ],
    },
    {
      group: 'Outdoor Unit',
      rows: [
        { label: 'Fan motor model', value: m.outFanModel },
        { label: 'Fan speed', value: `${m.outFanSpeed} r/min` },
        { label: 'Coil — number of rows', value: '2' },
        { label: 'Coil — tube pitch × row pitch', value: '21 × 22 mm' },
        { label: 'Coil — fin spacing', value: '1.3 mm' },
        { label: 'Coil — fin type', value: 'Hydrophilic aluminum' },
        { label: 'Coil — tube dia. & type', value: 'Φ7, Inner groove tube' },
        { label: 'Coil — L × H × W', value: `${m.outCoil} mm` },
        { label: 'Coil — number of circuits', value: m.outCircuits },
        { label: 'Noise level', value: `${m.outNoise} dB(A)` },
        { label: 'Throttle type', value: 'Throttle valve' },
        { label: 'Dimension (W×D×H)', value: `${m.outDim} mm` },
        { label: 'Packing (W×D×H)', value: `${m.outPack} mm` },
        { label: 'Net / Gross weight', value: `${m.outWeight} kg` },
        { label: "Qty' per 20'/40'/40'HQ", value: m.outQty },
      ],
    },
    {
      group: 'Refrigerant & Piping',
      rows: [
        { label: 'Refrigerant type / charge', value: m.refrigerant },
        { label: 'Design pressure', value: `${m.designPressure} MPa` },
        { label: 'Liquid side / Gas side', value: '9.52 mm (3/8") / 15.9 mm (5/8")' },
        { label: 'Max. refrigerant pipe length', value: `${m.maxPipe} m` },
        { label: 'Max. difference in level', value: `${m.maxLevel} m` },
      ],
    },
    {
      group: 'Control & Operating Conditions',
      rows: [
        { label: 'Thermostat type', value: 'Remote Control' },
        { label: 'Operation temperature', value: '17–30 °C' },
        { label: 'Room temp — indoor (cool/heat)', value: '16–32 / 0–30 °C' },
        { label: 'Room temp — outdoor (cool/heat)', value: '0–50 / -15–24 °C' },
      ],
    },
    {
      group: 'Energy Label',
      rows: [
        { label: 'SEER — cooling', value: `${m.seerKw} kW` },
        { label: 'SEER — annual consumption', value: `${m.seerKwh} kWh/annum` },
        { label: 'SEER', value: m.seer },
        { label: 'SEER grade', value: 'A++' },
        { label: 'SCOP — heating', value: `${m.scopKw} kW` },
        { label: 'SCOP — annual consumption', value: `${m.scopKwh} Wh/annum` },
        { label: 'SCOP', value: m.scop },
        { label: 'SCOP grade', value: 'A++' },
      ],
    },
  ]
}

const acCassetteProducts: Product[] = [
  {
    id: 'ac-cassette-un-mc24v',
    name: 'UN-MC24V Cassette',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Cassette',
    rating: 4.7,
    badge: 'Dual Inverter',
    highlights: ['24,000 BTU cooling & heating', 'Dual Inverter', 'WiFi control', 'A++ · SEER 6.1', 'Golden Fin coil'],
    models: ['UN-MC24V CASSETE'],
    image: acImg('UN-MC24V CASSETE/image5 UN-MC24V CASSETE.png'),
    gallery: [
      acImg('UN-MC24V CASSETE/image5 UN-MC24V CASSETE.png'),
      acImg('UN-MC24V CASSETE/Indoor UN-MC24V CASSETE.png'),
      acImg('UN-MC24V CASSETE/Outdoor UN-MC24V CASSETE.png'),
      acImg('UN-MC24V CASSETE/outdoor , UN-MC24V CASSETE.png'),
    ],
    specs: cassetteSpecs({
      others:
        'T1 50Hz R410A Cassette, 24 kBtu, cooling & heating. With installation plate, Cassette panel, remote controller, Golden Fin, 2m drain pipe (without pipe and cable), WiFi feature, drainage pump, Dual Inverter.',
      powerOutdoor: '220–240V, 1Ph, 50Hz',
      annualKwh: '5160',
      coolBtu: '22200', coolW: '6506', coolInput: '2350', coolCurrent: '10.4', eer: '2.74',
      heatBtu: '22000', heatW: '6448', heatInput: '1550', heatCurrent: '6.8', cop: '4.16',
      ratedPower: '2850', ratedCurrent: '13.5',
      inFanModel: 'ZKFN-45-8-1', inFanSpeed: '608/552/496', inRows: '2',
      inCoil: '2135 × 168 × 26.74', inCircuits: '4', inAirflow: '1247/1118/992', inNoise: '47/43/40',
      inDimBody: '830 × 830 × 205', inPackBody: '910 × 910 × 250', inQty: '108 / 234 / 260',
      compModel: 'KTN150D30UFZA', compCap: '4730', compInput: '1250', compRLA: '8.10',
      compOil: 'ESTER OIL VG74 · 450 ml',
      outFanModel: 'ZKFN-34-10-1L-1', outFanSpeed: '900/700/550', outCoil: '860 × 504 × 44',
      outCircuits: '6', outNoise: '58', outDim: '805 × 330 × 554', outPack: '915 × 370 × 615',
      outWeight: '33 / 35.5', outQty: '114 / 234 / 312',
      refrigerant: 'R410A / 1.6 kg', designPressure: '4.3 / 1.7', maxPipe: '25', maxLevel: '15',
      seerKw: '6.5', seerKwh: '373', seer: '6.1', scopKw: '6.4', scopKwh: '1962', scop: '4.6',
    }),
  },
  {
    id: 'ac-cassette-un-mc36v',
    name: 'UN-MC36V Cassette',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Cassette',
    rating: 4.7,
    badge: 'Dual Inverter',
    highlights: ['36,000 BTU cooling & heating', '3-Phase Dual Inverter', 'WiFi control', 'A++ · SEER 6.2', 'Golden Fin coil'],
    models: ['UN-MC36V CASSETE'],
    image: acImg('UN-MC36V CASSETE/image5 UN-MC36V CASSETE.png'),
    gallery: [
      acImg('UN-MC36V CASSETE/image5 UN-MC36V CASSETE.png'),
      acImg('UN-MC36V CASSETE/Indoor UN-MC36V CASSETE.png'),
      acImg('UN-MC36V CASSETE/Outdoor front MC36V CASSETE.png'),
      acImg('UN-MC36V CASSETE/Outdoor MC36V CASSETE left.png'),
    ],
    specs: cassetteSpecs({
      others:
        'T1 50Hz R410A Cassette, 36 kBtu, cooling & heating. With installation plate, Cassette panel, remote controller, Golden Fin, 2m drain pipe (without pipe and cable), WiFi feature, drainage pump, 3 phase, Dual Inverter.',
      powerOutdoor: '380–415V, 3Ph, 50Hz',
      annualKwh: '8910',
      coolBtu: '36000', coolW: '10551', coolInput: '3900', coolCurrent: '5.9', eer: '2.71',
      heatBtu: '38000', heatW: '11137', heatInput: '3150', heatCurrent: '4.8', cop: '3.54',
      ratedPower: '5000', ratedCurrent: '10',
      inFanModel: 'ZKFN-125-8-1', inFanSpeed: '700/630/570', inRows: '3',
      inCoil: '2135 × 210 × 40.11', inCircuits: '10', inAirflow: '1700/1530/1300', inNoise: '52.0/46.0/43.0',
      inDimBody: '830 × 830 × 245', inPackBody: '910 × 910 × 290', inQty: '96 / 208 / 234',
      compModel: 'KTF250D22UMT', compCap: '8095', compInput: '2200', compRLA: '10',
      compOil: 'VG74 · 670 ml',
      outFanModel: 'YKT-60-6-40-6', outFanSpeed: '870/820', outCoil: '995 × 762 × 44',
      outCircuits: '8', outNoise: '61.0', outDim: '946 × 410 × 810', outPack: '1090 × 500 × 885',
      outWeight: '71.1 / 75.5', outQty: '44 / 96 / 138',
      refrigerant: 'R410A / 2.6 kg', designPressure: '4.2 / 1.5', maxPipe: '30', maxLevel: '20',
      seerKw: '10.6', seerKwh: '596', seer: '6.2', scopKw: '11.1', scopKwh: '3317', scop: '4.7',
    }),
  },
]

// ---------------------------------------------------------------------------
// Wall-Mounted Air Conditioners — Piston (Copeland) series. Cooling only, On/Off,
// T3 climate, R22, golden fins on condenser & evaporator. Real Uneva models with
// photos and full specs.
// Photos: src/images/Air_Conditioner/Wall Mounted/piston_series/<folder>/<file>.png
// ---------------------------------------------------------------------------
const pistonImg = (rel: string) => img(`Air_Conditioner/Wall Mounted/piston_series/${rel}`)

// Model-specific spec values for a piston-series wall-mounted AC. Shared values
// (power supply, voltage range, design pressure, fin/tube types, etc.) are baked
// into the builder below.
interface PistonVals {
  features: string
  refrigerant: string
  moisture: string
  area: string
  // Cooling — T1 (nominal 35 °C)
  t1Btu: string; t1W: string; t1Eer: string; t1EerW: string; t1In: string; t1A: string
  // Cooling — T3 (high ambient 52 °C)
  t3Btu: string; t3W: string; t3Eer: string; t3EerW: string; t3In: string; t3A: string
  maxIn: string; maxA: string
  airVol: string
  noise: string // Super/High/Med/Low/Quiet
  outNoise: string
  compModel: string
  inFanSpeed: string; inRows: string; inDim: string; inPack: string; inNet: string; inGross: string
  outFanSpeed: string; outRows: string; outDim: string; outPack: string; outNet: string; outGross: string
  pipeGas: string; pipeLiquid: string; wiring: string
}

function pistonSpecs(m: PistonVals): SpecGroup[] {
  return [
    {
      group: 'General',
      rows: [
        { label: 'Type', value: 'Wall-mounted split · Cooling only · On/Off' },
        { label: 'Compressor technology', value: 'Piston (Copeland) · T3 climate' },
        { label: 'Features', value: m.features },
        { label: 'Power supply', value: '1Ph · 220–240V~ · 50Hz' },
        { label: 'Voltage range', value: '198–264 V' },
        { label: 'Refrigerant', value: m.refrigerant },
        { label: 'Moisture removal', value: `${m.moisture} L/h` },
        { label: 'Suitable area', value: `${m.area} m²` },
      ],
    },
    {
      group: 'Cooling — T1 (nominal 35 °C)',
      rows: [
        { label: 'Rated capacity (Btu/h)', value: m.t1Btu },
        { label: 'Rated capacity (W)', value: m.t1W },
        { label: 'EER', value: `${m.t1Eer} Btu/h·W (${m.t1EerW} W/W)` },
        { label: 'Rated power input', value: `${m.t1In} W` },
        { label: 'Rated current', value: `${m.t1A} A` },
        { label: 'Max. power input', value: `${m.maxIn} W` },
        { label: 'Max. current', value: `${m.maxA} A` },
      ],
    },
    {
      group: 'Cooling — T3 (high ambient 52 °C)',
      rows: [
        { label: 'Rated capacity (Btu/h)', value: m.t3Btu },
        { label: 'Rated capacity (W)', value: m.t3W },
        { label: 'EER', value: `${m.t3Eer} Btu/h·W (${m.t3EerW} W/W)` },
        { label: 'Rated power input', value: `${m.t3In} W` },
        { label: 'Rated current', value: `${m.t3A} A` },
        { label: 'Max. power input', value: `${m.maxIn} W` },
        { label: 'Max. current', value: `${m.maxA} A` },
      ],
    },
    {
      group: 'Airflow, Noise & Pressure',
      rows: [
        { label: 'Indoor air volume', value: `${m.airVol} m³/h` },
        { label: 'Indoor noise (Super/High/Med/Low/Quiet)', value: `${m.noise} dB(A)` },
        { label: 'Outdoor noise', value: `${m.outNoise} dB(A)` },
        { label: 'Design pressure (High/Low)', value: '2.8 / 1.2 MPa' },
      ],
    },
    {
      group: 'Compressor',
      rows: [
        { label: 'Model', value: m.compModel },
        { label: 'Type', value: 'Piston' },
        { label: 'Brand', value: 'Emerson (Copeland)' },
      ],
    },
    {
      group: 'Indoor Unit',
      rows: [
        { label: 'Fan type', value: 'Cross flow' },
        { label: 'Fan speed (cooling)', value: `${m.inFanSpeed} rpm` },
        { label: 'Coil — number of rows', value: m.inRows },
        { label: 'Evaporator', value: 'Hydrophilic & louver fin · Φ7 inner-groove tube · Golden fin' },
        { label: 'Net dimensions (W×D×H)', value: `${m.inDim} mm` },
        { label: 'Packing dimensions (W×D×H)', value: `${m.inPack} mm` },
        { label: 'Net / Gross weight', value: `${m.inNet} / ${m.inGross} kg` },
      ],
    },
    {
      group: 'Outdoor Unit',
      rows: [
        { label: 'Fan type', value: 'Propeller' },
        { label: 'Fan speed', value: `${m.outFanSpeed} rpm` },
        { label: 'Coil — number of rows', value: m.outRows },
        { label: 'Condenser', value: 'Louver / corrugated fin · Φ7 inner-groove tube · Golden fin' },
        { label: 'Net dimensions (W×D×H)', value: `${m.outDim} mm` },
        { label: 'Packing dimensions, without piping (W×D×H)', value: `${m.outPack} mm` },
        { label: 'Net / Gross weight', value: `${m.outNet} / ${m.outGross} kg` },
      ],
    },
    {
      group: 'Connections',
      rows: [
        { label: 'Expansion device', value: 'Capillary tube' },
        { label: 'Connecting pipe — Gas', value: m.pipeGas },
        { label: 'Connecting pipe — Liquid', value: m.pipeLiquid },
        { label: 'Connecting wiring (size × core)', value: m.wiring },
        { label: 'Drainage pipe', value: 'OD 16 mm' },
      ],
    },
  ]
}

const acPistonProducts: Product[] = [
  {
    id: 'ac-piston-un-mp18',
    name: 'UN-MP18 Copeland T3',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Wall Mounted',
    rating: 4.6,
    highlights: ['18,000 BTU · cooling only', 'Piston Copeland compressor', 'T3 high-ambient climate', 'Golden fin condenser & evaporator', 'On/Off · R22'],
    models: ['UN-MP18 COPELAND T3'],
    image: pistonImg('UN-MP18 COPELAND T3 18K Outdoor/UN-MP18 COPELAND T3.png'),
    gallery: [
      pistonImg('UN-MP18 COPELAND T3 18K Outdoor/UN-MP18 COPELAND T3.png'),
      pistonImg('UN-MP18 COPELAND T3 18K Outdoor/UN-MP18.png'),
      pistonImg('UN-MP18 COPELAND T3 18K Outdoor/845C-1.png'),
      pistonImg('UN-MP18 COPELAND T3 18K Outdoor/845C-2.png'),
    ],
    specs: pistonSpecs({
      features: 'AC · Cooling only · On/Off · Piston Copeland · T3 · Golden fins on condenser & evaporator · 18,000 BTU',
      refrigerant: 'R22 / 1.35 kg', moisture: '1.8', area: '20–35',
      t1Btu: '18000', t1W: '5275', t1Eer: '10.50', t1EerW: '3.08', t1In: '1714', t1A: '7.7',
      t3Btu: '15000', t3W: '4396', t3Eer: '7.50', t3EerW: '2.20', t3In: '2000', t3A: '9.0',
      maxIn: '2250', maxA: '10.8',
      airVol: '800', noise: '46 / 44 / 39 / 37 / 36', outNoise: '56',
      compModel: 'CR22K6M-PF1-101MM',
      inFanSpeed: '1330/1230/1050/970/900', inRows: '2', inDim: '1015 × 313 × 221', inPack: '1086 × 378 × 293', inNet: '12.5', inGross: '14.5',
      outFanSpeed: '890', outRows: '2', outDim: '920 × 380 × 699', outPack: '949 × 392 × 732', outNet: '55', outGross: '58',
      pipeGas: 'Φ12 (1/2")', pipeLiquid: 'Φ6 (1/4")', wiring: '3 × 1.5',
    }),
  },
  {
    id: 'ac-piston-un-mp24',
    name: 'UN-MP24 Copeland T3',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Wall Mounted',
    rating: 4.6,
    highlights: ['24,000 BTU · cooling only', 'Piston Copeland compressor', 'T3 high-ambient climate', 'Golden fin condenser & evaporator', 'On/Off · R22'],
    models: ['UN-MP24 COPELAND T3'],
    image: pistonImg('UN-MP24 COPELAND T3 24K Outdoor/UN-MP24 COPELAND T3.png'),
    gallery: [
      pistonImg('UN-MP24 COPELAND T3 24K Outdoor/UN-MP24 COPELAND T3.png'),
      pistonImg('UN-MP24 COPELAND T3 24K Outdoor/UN-MP24.png'),
      pistonImg('UN-MP24 COPELAND T3 24K Outdoor/910C-1.png'),
      pistonImg('UN-MP24 COPELAND T3 24K Outdoor/910C-2.png'),
    ],
    specs: pistonSpecs({
      features: 'AC · Cooling only · On/Off · Piston Copeland · T3 · Golden fins on condenser & evaporator · 24,000 BTU',
      refrigerant: 'R22 / 1.7 kg', moisture: '2.4', area: '30–45',
      t1Btu: '24000', t1W: '7034', t1Eer: '10.50', t1EerW: '3.08', t1In: '2286', t1A: '10.2',
      t3Btu: '20800', t3W: '6096', t3Eer: '7.50', t3EerW: '2.20', t3In: '2773', t3A: '12.4',
      maxIn: '3100', maxA: '16.0',
      airVol: '1250', noise: '53 / 50 / 47 / 44 / 42', outNoise: '56',
      compModel: 'CR30K6M-PF1-101MM',
      inFanSpeed: '1430/1280/1180/1080/980', inRows: '2', inDim: '1132 × 332 × 229', inPack: '1202 × 402 × 302', inNet: '13.5', inGross: '16.5',
      outFanSpeed: '830', outRows: '2', outDim: '967 × 421 × 803', outPack: '1022 × 480 × 835', outNet: '66', outGross: '69',
      pipeGas: 'Φ15.88 (5/8")', pipeLiquid: 'Φ9.52 (3/8")', wiring: '4 × 0.75',
    }),
  },
  {
    id: 'ac-piston-un-mp32',
    name: 'UN-MP32 Copeland T3',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Wall Mounted',
    rating: 4.7,
    highlights: ['32,000 BTU · cooling only', 'Piston Copeland compressor', 'T3 high-ambient climate', 'Golden fin condenser & evaporator', 'On/Off · R22'],
    models: ['UN-MP32 COPELAND T3'],
    image: pistonImg('UN-MP32 COPELAND T3 , Outdoor/UN-MP32 COPELAND T3.png'),
    gallery: [
      pistonImg('UN-MP32 COPELAND T3 , Outdoor/UN-MP32 COPELAND T3.png'),
      pistonImg('UN-MP32 COPELAND T3 , Outdoor/UN-MP32.png'),
      pistonImg('UN-MP32 COPELAND T3 , Outdoor/1010C-1.png'),
      pistonImg('UN-MP32 COPELAND T3 , Outdoor/1010C-2.png'),
    ],
    specs: pistonSpecs({
      features: 'AC · Cooling only · On/Off · Piston Copeland · T3 · Golden fins on condenser & evaporator · 32,000 BTU',
      refrigerant: 'R22 / 2.3 kg', moisture: '3.0', area: '35–55',
      t1Btu: '32000', t1W: '9379', t1Eer: '10.00', t1EerW: '2.93', t1In: '3200', t1A: '14.3',
      t3Btu: '27500', t3W: '8060', t3Eer: '7.17', t3EerW: '2.10', t3In: '3835', t3A: '17.2',
      maxIn: '4000', maxA: '22.5',
      airVol: '1600', noise: '54 / 52 / 47 / 43 / 40', outNoise: '61',
      compModel: 'CR37K6M-PFZ-101MM',
      inFanSpeed: '1350/1260/1090/920/830', inRows: '3', inDim: '1277 × 360 × 271', inPack: '1332 × 437 × 350', inNet: '19.5', inGross: '23.5',
      outFanSpeed: '850', outRows: '2', outDim: '1089 × 494 × 858', outPack: '1135 × 530 × 950', outNet: '76.0', outGross: '82.0',
      pipeGas: 'Φ15.88 (5/8")', pipeLiquid: 'Φ9.52 (3/8")', wiring: '4 × 0.75',
    }),
  },
  {
    id: 'ac-piston-un-mp36',
    name: 'UN-MP36 Copeland T3',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Wall Mounted',
    rating: 4.7,
    highlights: ['36,000 BTU · cooling only', 'Piston Copeland compressor', 'T3 high-ambient climate', 'Golden fin condenser & evaporator', 'On/Off · R22'],
    models: ['UN-MP36 COPELAND T3'],
    image: pistonImg('UN-MP36 COPELAND T3  Outdoor/UN-MP36 COPELAND T3.png'),
    gallery: [
      pistonImg('UN-MP36 COPELAND T3  Outdoor/UN-MP36 COPELAND T3.png'),
      pistonImg('UN-MP36 COPELAND T3  Outdoor/UN-MP32.png'),
      pistonImg('UN-MP36 COPELAND T3  Outdoor/1010C-1.png'),
      pistonImg('UN-MP36 COPELAND T3  Outdoor/1010C-2.png'),
    ],
    specs: pistonSpecs({
      features: 'AC · Cooling only · On/Off · Piston Copeland · T3 · Golden fins on condenser & evaporator · 36,000 BTU',
      refrigerant: 'R22 / 3.5 kg', moisture: '3.4', area: '45–70',
      t1Btu: '36000', t1W: '10551', t1Eer: '10.00', t1EerW: '2.93', t1In: '3600', t1A: '16.1',
      t3Btu: '28500', t3W: '8353', t3Eer: '7.17', t3EerW: '2.10', t3In: '3975', t3A: '17.8',
      maxIn: '4200', maxA: '25.0',
      airVol: '1600', noise: '54 / 52 / 47 / 43 / 40', outNoise: '61',
      compModel: 'CR42K6M-PFZ-101',
      inFanSpeed: '1350/1260/1090/920/830', inRows: '3', inDim: '1277 × 360 × 271', inPack: '1332 × 437 × 350', inNet: '19.5', inGross: '23.5',
      outFanSpeed: '850', outRows: '3', outDim: '1089 × 494 × 858', outPack: '1135 × 530 × 950', outNet: '83.0', outGross: '89.0',
      pipeGas: 'Φ15.88 (5/8")', pipeLiquid: 'Φ9.52 (3/8")', wiring: '4 × 0.75',
    }),
  },
]

// ---------------------------------------------------------------------------
// Window Air Conditioners — real Uneva models with photos and full specs.
// Cooling only, mechanical control, T3, R410A, golden fins on condenser &
// evaporator.
// Photos: src/images/Air_Conditioner/Window/<model>/<file>.png
// ---------------------------------------------------------------------------
const windowImg = (rel: string) => img(`Air_Conditioner/Window/${rel}`)

const acWindowProducts: Product[] = [
  {
    id: 'ac-window-un-mw18c',
    name: 'UN-MW18C Winos T3',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Window',
    rating: 4.5,
    highlights: ['18,000 BTU · cooling only', 'One-piece window unit', 'Rotary compressor · R410A', 'T3 high-ambient climate', 'Golden fin condenser & evaporator'],
    models: ['UN-MW18C WINOS T3'],
    image: windowImg('UN-MW18C/UN-MW18C WINOS T3.png'),
    gallery: [
      windowImg('UN-MW18C/UN-MW18C WINOS T3.png'),
      windowImg('UN-MW18C/UN-MW18C WINOS T3(1).png'),
      windowImg('UN-MW18C/UN-MW18C WINOS T3(2).png'),
    ],
    specs: [
      {
        group: 'General',
        rows: [
          { label: 'Type', value: 'Window type · Cooling only' },
          { label: 'Control type', value: 'Mechanical' },
          { label: 'Features', value: 'T3 / R410A / Rotary / cooling-only window A/C · Golden fins on condenser & evaporator · 18,000 BTU' },
          { label: 'Climate type', value: 'T3' },
          { label: 'Power supply', value: '1Ph · 220–240V~ · 50Hz' },
          { label: 'Voltage range', value: '198–242 V' },
          { label: 'Refrigerant', value: 'R410A / 590 g' },
          { label: 'Moisture removal', value: '1.8 L/h' },
          { label: 'Suitable area', value: '20–35 m²' },
          { label: 'Annual energy consumption', value: '2876.4 kWh/year' },
        ],
      },
      {
        group: 'Cooling — T1 (nominal 35 °C)',
        rows: [
          { label: 'Rated capacity', value: '18000 Btu/h · 5275 W' },
          { label: 'EER', value: '11.3 Btu/h·W (3.3 W/W)' },
          { label: 'Running current', value: '7.3 A' },
          { label: 'Running power input', value: '1598 W' },
          { label: 'Rated (max) current', value: '9.4 A' },
          { label: 'Rated (max) power input', value: '2077 W' },
        ],
      },
      {
        group: 'Cooling — T3 (high ambient 52 °C)',
        rows: [
          { label: 'Rated capacity', value: '15300 Btu/h · 4484 W' },
          { label: 'EER', value: '8.5 Btu/h·W (2.5 W/W)' },
          { label: 'Running current', value: '8.2 A' },
          { label: 'Running power input', value: '1794 W' },
          { label: 'Rated (max) current', value: '10.6 A' },
          { label: 'Rated (max) power input', value: '2332.2 W' },
        ],
      },
      {
        group: 'Noise & Pressure',
        rows: [
          { label: 'Indoor noise level', value: '55 dB(A)' },
          { label: 'Outdoor noise level', value: '61 dB(A)' },
          { label: 'Design pressure (High/Low)', value: '4.5 / 1.5 MPa' },
        ],
      },
      {
        group: 'Compressor',
        rows: [
          { label: 'Model', value: 'ASF210V1SETB3' },
          { label: 'Type', value: 'Rotary' },
          { label: 'Brand', value: 'GMCC' },
        ],
      },
      {
        group: 'Fan System',
        rows: [
          { label: 'Indoor air volume', value: '700 m³/h' },
          { label: 'Indoor fan type', value: 'Centrifugal flow' },
          { label: 'Outdoor fan type', value: 'Axial flow · 5 air wings' },
          { label: 'Fan speed (cooling H/M/L)', value: '890 / 780 / 680 rpm' },
        ],
      },
      {
        group: 'Dimensions & Weight',
        rows: [
          { label: 'Net dimensions (W×D×H)', value: '660 × 680 × 430 mm' },
          { label: 'Packing dimensions (W×D×H)', value: '740 × 795 × 468 mm' },
          { label: 'Net / Gross weight', value: '49 / 53 kg' },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Floor-Standing (cabinet) Air Conditioners — real Uneva models with photos and
// full specs. Cooling only, T3, R22, piston compressor, golden fins.
// Photos: src/images/Air_Conditioner/Floor Standing/<model>/<file>.png
// ---------------------------------------------------------------------------
const floorImg = (rel: string) => img(`Air_Conditioner/Floor Standing/${rel}`)

const acFloorProducts: Product[] = [
  {
    id: 'ac-floor-un-tfp36c',
    name: 'UN-TFP36C Floria T3',
    categoryId: 'ac',
    series: 'Air Conditioner',
    type: 'Floor Standing',
    rating: 4.6,
    highlights: ['36,000 BTU · cooling only', 'Floor-standing cabinet unit', 'Piston compressor · R22', 'T3 high-ambient climate', 'Golden fin condenser & evaporator'],
    models: ['UN-TFP36C FLORIA T3'],
    image: floorImg('UN-TFP36C/UN-TFP36C FLORIA T3.png'),
    gallery: [
      floorImg('UN-TFP36C/UN-TFP36C FLORIA T3.png'),
      floorImg('UN-TFP36C/UN-TFP36C FLORIA T3 indoor left.png'),
      floorImg('UN-TFP36C/UN-TFP36C FLORIA T3 Outdoor.png'),
      floorImg('UN-TFP36C/UN-TFP36C FLORIA T3 outdoor 1.png'),
      floorImg('UN-TFP36C/UN-TFP36C FLORIA T3 Remote.png'),
    ],
    specs: [
      {
        group: 'General',
        rows: [
          { label: 'Type', value: 'Floor-standing (cabinet) · Cooling only' },
          { label: 'Control type', value: 'Remote Controller' },
          { label: 'Features', value: 'T3 / R22 / Piston / cooling-only floor-standing A/C · Golden fins on condenser & evaporator · 36,000 BTU' },
          { label: 'Climate type', value: 'T3' },
          { label: 'Power supply', value: '1Ph · 220–240V~ · 50Hz' },
          { label: 'Voltage range', value: '198–264 V' },
          { label: 'Refrigerant', value: 'R22 / 2.58 kg' },
          { label: 'Moisture removal', value: '3.6 L/h' },
          { label: 'Suitable area', value: '35–55 m²' },
        ],
      },
      {
        group: 'Cooling — T1 (nominal 35 °C)',
        rows: [
          { label: 'Rated capacity', value: '36000 Btu/h · 10551 W' },
          { label: 'EER', value: '10.24 Btu/h·W (3.00 W/W)' },
          { label: 'Running current', value: '16.5 A' },
          { label: 'Running power input', value: '3516 W' },
          { label: 'Rated (max) current', value: '26.0 A' },
          { label: 'Rated (max) power input', value: '3800 W' },
        ],
      },
      {
        group: 'Cooling — T3 (high ambient 52 °C)',
        rows: [
          { label: 'Rated capacity', value: '30600 Btu/h · 8968 W' },
          { label: 'EER', value: '7.93 Btu/h·W (2.33 W/W)' },
          { label: 'Running current', value: '18.1 A' },
          { label: 'Running power input', value: '3859 W' },
          { label: 'Rated (max) current', value: '26.0 A' },
          { label: 'Rated (max) power input', value: '4300 W' },
        ],
      },
      {
        group: 'Noise & Pressure',
        rows: [
          { label: 'Indoor noise level', value: '53 dB(A)' },
          { label: 'Outdoor noise level', value: '63 dB(A)' },
          { label: 'Design pressure (High/Low)', value: '2.8 / 1.2 MPa' },
        ],
      },
      {
        group: 'Compressor',
        rows: [
          { label: 'Model', value: 'AW 5542E' },
          { label: 'Type', value: 'Piston' },
          { label: 'Brand', value: 'KK' },
        ],
      },
      {
        group: 'Coil & Refrigeration',
        rows: [
          { label: 'Evaporator', value: 'Hydrophilic & louver fin · Φ9.52 inner-groove tube · Golden fin' },
          { label: 'Condenser', value: 'Louver / corrugated fin · Φ7 inner-groove tube · Golden fin' },
          { label: 'Expansion device', value: 'Capillary tube' },
        ],
      },
      {
        group: 'Fan System',
        rows: [
          { label: 'Indoor air volume', value: '1600 m³/h' },
          { label: 'Indoor fan type', value: 'Centrifugal' },
          { label: 'Indoor fan speed (cooling H/M/L)', value: '550 / 480 / 380 rpm' },
          { label: 'Indoor fan speed (dry / sleep)', value: '380 / 380 rpm' },
          { label: 'Outdoor fan type', value: 'Propeller · 4 air wings' },
          { label: 'Outdoor fan speed', value: '800 rpm' },
        ],
      },
      {
        group: 'Connections',
        rows: [
          { label: 'Connecting pipe — Gas', value: 'Φ15.88 (5/8")' },
          { label: 'Connecting pipe — Liquid', value: 'Φ9.52 (3/8")' },
          { label: 'Connecting wiring (size × core)', value: '4 × 0.75' },
          { label: 'Drainage pipe', value: 'OD 16 mm' },
        ],
      },
      {
        group: 'Indoor Unit — Dimensions',
        rows: [
          { label: 'Net dimensions (W×D×H)', value: '540 × 415 × 1775 mm' },
          { label: 'Packing dimensions (W×D×H)', value: '1893 × 632 × 525 mm' },
          { label: 'Net / Gross weight', value: '52 / 62 kg' },
        ],
      },
      {
        group: 'Outdoor Unit — Dimensions',
        rows: [
          { label: 'Net dimensions (W×D×H)', value: '953 × 433 × 808 mm' },
          { label: 'Packing dimensions, with piping (W×D×H)', value: '1031 × 447 × 925 mm' },
          { label: 'Net / Gross weight', value: '77 / 86 kg' },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Refrigerators — 4-Door VILOX (real models with photos + full specs). The two
// finishes (Stainless Steel / Black Glass) share one spec sheet; only the
// colour and model code differ. Photos live in src/images/Refrigerator/4door/.
// ---------------------------------------------------------------------------
const vilox4DoorSpecs = (model: string, color: string): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: model },
      { label: 'Type', value: '4-Door Refrigerator' },
      { label: 'Colour / Finish', value: color },
      { label: 'Compressor', value: 'VFL090CY1' },
      { label: 'Climate class', value: 'T, ST, N, SN' },
      { label: 'Protection against electric shock', value: 'Class I' },
      { label: 'Rated voltage / frequency', value: 'AC 220–240 V / 50 Hz' },
      { label: 'Rated current', value: '1.9 A' },
      { label: 'Refrigerant / amount', value: 'R600a / 77 g' },
      { label: 'Foaming agent', value: 'Cyclopentane' },
    ],
  },
  {
    group: 'Capacity',
    rows: [
      { label: 'Total volume', value: '492 L' },
      { label: 'Fresh food compartment', value: '329.0 L' },
      { label: 'Freezer compartment', value: '163.0 L' },
      { label: 'Four-star compartment', value: '163.0 L' },
      { label: 'Freezing capacity', value: '12 kg / 24h' },
      { label: 'Temperature rise time', value: '14 h' },
    ],
  },
  {
    group: 'Energy',
    rows: [
      { label: 'Energy efficiency class', value: 'E' },
      { label: 'Energy consumption', value: '0.816 kWh / 24h' },
      { label: 'Annual energy consumption', value: '298 kWh / year' },
      { label: 'Energy consumption E16', value: '0.498 kWh / 24h' },
      { label: 'Energy consumption E32', value: '1.104 kWh / 24h' },
      { label: 'Auxiliary energy consumption', value: '5.389 kWh / year' },
    ],
  },
  {
    group: 'Components',
    rows: [
      { label: 'Defrosting heater', value: '250 W' },
      { label: 'Lamp rated power', value: '5 W' },
    ],
  },
  {
    group: 'Acoustic',
    rows: [{ label: 'Noise level', value: '40 dB(A) (Class C)' }],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Product dimensions (W×D×H)', value: '833 × 740 × 1775 mm' },
      { label: 'Space required in use (W×D×H)', value: '933 × 840 × 1875 mm' },
      { label: 'Overall space required (W×D×H)', value: '1440 × 938 × 1875 mm' },
      { label: 'Carton dimensions (W×D×H)', value: '890 × 778 × 1848 mm' },
      { label: 'Packing dimensions (W×D×H)', value: '890 × 778 × 1875 mm' },
      { label: 'Net weight', value: '95 kg' },
      { label: 'Gross weight', value: '105 kg' },
      { label: 'Stacking layers', value: '2' },
    ],
  },
]

const vilox4DoorHighlights = [
  '492 L total capacity',
  '4-Door design',
  'Frost-free (No Frost) cooling',
  'R600a eco-refrigerant',
  '40 dB(A) quiet operation',
]

const sbsHighlights = [
  'Side-by-Side twin doors',
  'Frost-free (No Frost) cooling',
  'Multi-airflow freshness',
  'Large family capacity',
]

// Full spec sheet for the MAS Side-by-Side family (SBS57). Both finishes share
// it; only the colour and model code differ.
const masSbsSpecs = (model: string, color: string): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: model },
      { label: 'Type', value: 'Side-by-Side Refrigerator' },
      { label: 'Colour / Finish', value: color },
      { label: 'Compressor', value: 'DZ120V1W' },
      { label: 'Climate class', value: 'T' },
      { label: 'Protection against electric shock', value: 'Class I' },
      { label: 'Rated voltage / frequency', value: 'AC 220–240 V / 50 Hz' },
      { label: 'Rated current', value: '1.9 A' },
      { label: 'Refrigerant / amount', value: 'R600a / 79 g' },
      { label: 'Foaming agent', value: 'Cyclopentane' },
    ],
  },
  {
    group: 'Capacity',
    rows: [
      { label: 'Total volume', value: '533 L' },
      { label: 'Fresh food compartment', value: '368 L' },
      { label: 'Freezer compartment', value: '165 L' },
      { label: 'Four-star compartment', value: '165 L' },
      { label: 'Freezing capacity', value: '12 kg / 24h' },
      { label: 'Temperature rise time', value: '5.5 h' },
    ],
  },
  {
    group: 'Energy',
    rows: [
      { label: 'Energy efficiency class', value: 'A (Iraq)' },
      { label: 'Energy consumption', value: '1.488 kWh / 24h' },
      { label: 'Annual energy consumption', value: '543 kWh / year' },
    ],
  },
  {
    group: 'Components',
    rows: [
      { label: 'Defrosting heater', value: '208 W (at 230 V)' },
      { label: 'Lamp rated power', value: '5 W' },
    ],
  },
  {
    group: 'Acoustic',
    rows: [{ label: 'Noise level', value: '41 dB(A) (Class C)' }],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Product dimensions (W×D×H)', value: '910 × 698 × 1793 mm' },
      { label: 'Overall space required (W×D×H)', value: '1470 × 1010 × 1893 mm' },
      { label: 'Carton dimensions (W×D×H)', value: '970 × 763 × 1825 mm' },
      { label: 'Packing dimensions (W×D×H)', value: '970 × 763 × 1885 mm' },
      { label: 'Net weight', value: '103 kg' },
      { label: 'Gross weight', value: '112 kg' },
      { label: 'Stacking layers', value: '2' },
    ],
  },
]

// Full spec sheet for the ROY / PLAZMA Side-by-Side family (SBS51). All three
// finishes share it; only the colour, series and model code differ.
const roySbsSpecs = (model: string, color: string): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: model },
      { label: 'Type', value: 'Side-by-Side Refrigerator' },
      { label: 'Colour / Finish', value: color },
      { label: 'Compressor', value: 'DZ100A1G' },
      { label: 'Climate class', value: 'T' },
      { label: 'Protection against electric shock', value: 'Class I' },
      { label: 'Rated voltage / frequency', value: 'AC 220–240 V / 50 Hz' },
      { label: 'Rated power', value: '170 W' },
      { label: 'Rated current', value: '1.55 A' },
      { label: 'Refrigerant / amount', value: 'R600a / 74 g' },
      { label: 'Foaming agent', value: 'Cyclopentane' },
    ],
  },
  {
    group: 'Capacity',
    rows: [
      { label: 'Total gross volume', value: '587 L' },
      { label: 'Gross refrigerator volume', value: '339 L' },
      { label: 'Gross freezer volume', value: '248 L' },
      { label: 'Total storage volume', value: '510 L' },
      { label: 'Refrigerator storage volume', value: '335 L' },
      { label: 'Freezer storage volume', value: '175 L' },
      { label: 'Two-star compartment', value: '16 L' },
      { label: 'Four-star compartment', value: '159 L' },
      { label: 'Freezing capacity', value: '10 kg / 24h' },
      { label: 'Temperature rise time', value: '9 h' },
    ],
  },
  {
    group: 'Energy',
    rows: [
      { label: 'Energy efficiency class', value: 'A (Iraq)' },
      { label: 'Energy consumption', value: '1.46 kWh / 24h' },
      { label: 'Annual energy consumption', value: '533 kWh / year' },
    ],
  },
  {
    group: 'Components',
    rows: [
      { label: 'Defrosting heater', value: '240 W' },
      { label: 'Lamp rated power', value: '5 W' },
    ],
  },
  {
    group: 'Acoustic',
    rows: [{ label: 'Noise level', value: '39 dB(A)' }],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Product dimensions (W×D×H)', value: '897 × 761 × 1765 mm' },
      { label: 'Overall space required (W×D×H)', value: '1600 × 1130 × 1800 mm' },
      { label: 'Carton dimensions (W×D×H)', value: '955 × 778 × 1825 mm' },
      { label: 'Packing dimensions (W×D×H)', value: '955 × 778 × 1855 mm' },
      { label: 'Net weight', value: '81 kg' },
      { label: 'Gross weight', value: '91 kg' },
      { label: 'Stacking layers', value: '3' },
    ],
  },
]

const miniHighlights = [
  'Compact mini refrigerator',
  'Space-saving single door',
  'Quiet, energy-efficient',
  'Ideal for bedroom or office',
]

const twinHighlights = [
  'Twin cooling system',
  'Separate fridge & freezer columns',
  'Frost-free (No Frost) cooling',
  'Stainless steel finish',
]

const refrigeratorProducts: Product[] = [
  {
    id: 'fridge-4door-un-4d49ss-vilox',
    name: 'UN-4D49SS VILOX',
    categoryId: 'fridge',
    series: 'VILOX Series · Stainless Steel',
    type: '4Door',
    rating: 4.7,
    badge: 'No Frost',
    highlights: vilox4DoorHighlights,
    models: ['UN-4D49SS VILOX'],
    image: img('Refrigerator/4door/UN-4D49SS VILOX.jpg'),
    gallery: [img('Refrigerator/4door/UN-4D49SS VILOX.jpg')],
    specs: vilox4DoorSpecs('UN-4D49SS VILOX', 'Stainless Steel'),
  },
  {
    id: 'fridge-4door-un-4d49bg-vilox',
    name: 'UN-4D49BG VILOX',
    categoryId: 'fridge',
    series: 'VILOX Series · Black Glass',
    type: '4Door',
    rating: 4.7,
    highlights: vilox4DoorHighlights,
    models: ['UN-4D49BG VILOX'],
    image: img('Refrigerator/4door/UN-4D49BG VILOX.png'),
    gallery: [img('Refrigerator/4door/UN-4D49BG VILOX.png')],
    specs: vilox4DoorSpecs('UN-4D49BG VILOX', 'Black Glass'),
  },

  // Side-by-Side — MAS (SBS57) and ROY / PLAZMA (SBS51) families.
  {
    id: 'fridge-sbs-un-sbs57ss-mas',
    name: 'UN-SBS57SS MAS',
    categoryId: 'fridge',
    series: 'MAS Series · Stainless Steel',
    type: 'Side-by-Side',
    rating: 4.6,
    badge: 'No Frost',
    highlights: sbsHighlights,
    models: ['UN-SBS57SS MAS'],
    image: img('Refrigerator/SBS/MAS/UN-SBS57SS MAS/UN-SBS57SS MAS.jpg'),
    gallery: [img('Refrigerator/SBS/MAS/UN-SBS57SS MAS/UN-SBS57SS MAS.jpg')],
    specs: masSbsSpecs('UN-SBS57SS MAS', 'Stainless Steel'),
  },
  {
    id: 'fridge-sbs-un-sbs57w-mas',
    name: 'UN-SBS57W MAS',
    categoryId: 'fridge',
    series: 'MAS Series · White',
    type: 'Side-by-Side',
    rating: 4.6,
    highlights: sbsHighlights,
    models: ['UN-SBS57W MAS'],
    image: img('Refrigerator/SBS/MAS/UN-SBS57W MAS/UN-SBS57W MAS.png'),
    gallery: [img('Refrigerator/SBS/MAS/UN-SBS57W MAS/UN-SBS57W MAS.png')],
    specs: masSbsSpecs('UN-SBS57W MAS', 'White'),
  },
  {
    id: 'fridge-sbs-un-sbs51ss-roy',
    name: 'UN-SBS51SS ROY',
    categoryId: 'fridge',
    series: 'ROY Series · Stainless Steel',
    type: 'Side-by-Side',
    rating: 4.6,
    highlights: sbsHighlights,
    models: ['UN-SBS51SS ROY'],
    image: img('Refrigerator/SBS/ROY , PLAZMA/UN-SBS51SS ROY/UN-SBS51SS ROY.jpg'),
    gallery: [img('Refrigerator/SBS/ROY , PLAZMA/UN-SBS51SS ROY/UN-SBS51SS ROY.jpg')],
    specs: roySbsSpecs('UN-SBS51SS ROY', 'Stainless Steel'),
  },
  {
    id: 'fridge-sbs-un-sbs51w-roy',
    name: 'UN-SBS51W ROY',
    categoryId: 'fridge',
    series: 'ROY Series · White',
    type: 'Side-by-Side',
    rating: 4.6,
    highlights: sbsHighlights,
    models: ['UN-SBS51W ROY'],
    image: img('Refrigerator/SBS/ROY , PLAZMA/UN-SBS51W ROY/UN-SBS51W ROY.png'),
    gallery: [img('Refrigerator/SBS/ROY , PLAZMA/UN-SBS51W ROY/UN-SBS51W ROY.png')],
    specs: roySbsSpecs('UN-SBS51W ROY', 'White'),
  },
  {
    id: 'fridge-sbs-un-sbs51b-plazma',
    name: 'UN-SBS51B PLAZMA',
    categoryId: 'fridge',
    series: 'PLAZMA Series · Black',
    type: 'Side-by-Side',
    rating: 4.6,
    highlights: sbsHighlights,
    models: ['UN-SBS51B PLAZMA'],
    image: img('Refrigerator/SBS/ROY , PLAZMA/UN-SBS51B PLAZMA/UN-SBS51B PLAZMA.jpg'),
    gallery: [img('Refrigerator/SBS/ROY , PLAZMA/UN-SBS51B PLAZMA/UN-SBS51B PLAZMA.jpg')],
    specs: roySbsSpecs('UN-SBS51B PLAZMA', 'Black'),
  },

  // Mini — R95 family (Silver / White), each with multiple view photos.
  {
    id: 'fridge-mini-un-r95s',
    name: 'UN-R95S MINI',
    categoryId: 'fridge',
    series: 'R95 Mini Series · Silver',
    type: 'Mini',
    rating: 4.5,
    badge: 'Compact',
    highlights: miniHighlights,
    models: ['UN-R95S MINI'],
    image: img('Refrigerator/mini/R95/R95S/UN-R95S MINI Closed Door Front View.png'),
    gallery: [
      img('Refrigerator/mini/R95/R95S/UN-R95S MINI Closed Door Front View.png'),
      img('Refrigerator/mini/R95/R95S/UN-R95S MINI Opening Door Front View.png'),
      img('Refrigerator/mini/R95/R95S/UN-R95S MINI Door Side View.png'),
      img('Refrigerator/mini/R95/R95S/UN-R95S MINI Opening  Door Side View.png'),
    ],
  },
  {
    id: 'fridge-mini-un-r95w',
    name: 'UN-R95W MINI',
    categoryId: 'fridge',
    series: 'R95 Mini Series · White',
    type: 'Mini',
    rating: 4.5,
    highlights: miniHighlights,
    models: ['UN-R95W MINI'],
    image: img('Refrigerator/mini/R95/R95W/UN-R95W MINI White Closed Door Front View.png'),
    gallery: [
      img('Refrigerator/mini/R95/R95W/UN-R95W MINI White Closed Door Front View.png'),
      img('Refrigerator/mini/R95/R95W/UN-R95W MINI White Opening Door Front View.png'),
      img('Refrigerator/mini/R95/R95W/UN-R95W MINI White Closed  Door Side View.png'),
      img('Refrigerator/mini/R95/R95W/UN-R95W MINI White Opening  Door Side View.png'),
    ],
  },

  // Twin — RFW family (twin cooling, stainless steel).
  {
    id: 'fridge-twin-un-rfw25ss',
    name: 'UN-RFW25SS TWIN',
    categoryId: 'fridge',
    series: 'Twin Series · Stainless Steel',
    type: 'Twin',
    rating: 4.5,
    highlights: twinHighlights,
    models: ['UN-RFW25SS TWIN'],
    image: img('Refrigerator/Twin/UN-RFW25SS TWIN/UN-RFW25SS TWIN.jpg'),
    gallery: [img('Refrigerator/Twin/UN-RFW25SS TWIN/UN-RFW25SS TWIN.jpg')],
  },
  {
    id: 'fridge-twin-un-rfw35ss',
    name: 'UN-RFW35SS TWIN',
    categoryId: 'fridge',
    series: 'Twin Series · Stainless Steel',
    type: 'Twin',
    rating: 4.5,
    highlights: twinHighlights,
    models: ['UN-RFW35SS TWIN'],
    image: img('Refrigerator/Twin/UN-RFW35SS TWIN/UN-RFW35SS TWIN.jpg'),
    gallery: [img('Refrigerator/Twin/UN-RFW35SS TWIN/UN-RFW35SS TWIN.jpg')],
  },
]

// ---------------------------------------------------------------------------
// Top-Freezer refrigerators (type "Top Freezer") — two families:
//   • RFT   — one card per size (RFT93 … RFT490); the size's colour finishes
//             become the model list and its photos (closed + open-door) the
//             gallery. Photos are auto-discovered (see topFreezerRFT in assets).
//   • TITAN — one card for the RF463 line, its colours as model variants.
// ---------------------------------------------------------------------------
const topFreezerHighlights = [
  'Top-mount freezer design',
  'Frost-free (No Frost) cooling',
  'Multi-airflow freshness',
  'Multiple finishes available',
]

// Preferred display order of the RFT sizes (smallest → largest).
const rftSizeOrder = ['UN-RFT93', 'UN-RFT226', 'UN-RFT280', 'UN-RFT380', 'UN-RFT490']

// Spec sheet for an RFT top-freezer (2-door direct cool). Shared values are
// baked in; only the size-dependent values are passed.
const rftSpecs = (o: {
  model: string
  gross: string
  net: string
  power: string
  current: string
  product: string
  packing: string
  loading: string
  weight: string
}): SpecGroup[] => [
  {
    group: 'Volume / Capacity',
    rows: [
      { label: 'Factory model', value: o.model },
      { label: 'Product type', value: '2-Door Direct Cool' },
      { label: 'Gross volume', value: `${o.gross} L` },
      { label: 'Net volume', value: `${o.net} L` },
    ],
  },
  {
    group: 'Cooling System',
    rows: [
      { label: 'Refrigerant', value: 'R600a' },
      { label: 'Foaming agent', value: 'C5H10 (cyclopentane)' },
      { label: 'Power voltage', value: '220–240 V' },
      { label: 'Total power input', value: `${o.power} W` },
      { label: 'Rated current', value: `${o.current} A` },
      { label: 'Power plug', value: 'BS' },
      { label: 'Condenser', value: 'Outside' },
      { label: 'Temperature control', value: 'Mechanical' },
      { label: 'Climate class', value: 'T' },
    ],
  },
  {
    group: 'General Features',
    rows: [
      { label: 'Number of doors', value: '2' },
      { label: 'Door type', value: 'Double door' },
      { label: 'Plastic top cover', value: 'No' },
      { label: 'Reversible door', value: 'Optional' },
      { label: 'Door lock', value: 'Available' },
      { label: 'Handle', value: 'Optional' },
      { label: 'Door panel', value: 'Optional' },
      { label: 'Cabinet colour', value: 'White / Grey / Black' },
    ],
  },
  {
    group: 'Fridge Compartment',
    rows: [
      { label: 'Evaporator', value: 'Outside' },
      { label: 'Defrost', value: 'Yes' },
      { label: 'Drain pan', value: 'Plastic ×1' },
      { label: 'Interior lamp', value: 'Yes' },
      { label: 'Adjustable shelves', value: 'Wire' },
      { label: 'Egg tray', value: '1' },
    ],
  },
  {
    group: 'Freezer Compartment',
    rows: [
      { label: 'Freezer rating', value: '4-star' },
      { label: 'Evaporator', value: 'Outside' },
      { label: 'Defrost', value: 'Yes' },
      { label: 'Freezer shelf', value: 'Wire ×1' },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Product dimensions (W×D×H)', value: `${o.product} mm` },
      { label: 'Package dimensions (W×D×H)', value: `${o.packing} mm` },
      { label: "Loading (20' / 40' / 40'HC)", value: o.loading },
      { label: 'Net / Gross weight', value: `${o.weight} kg` },
    ],
  },
]

const rftSpecsByFolder: Record<string, SpecGroup[]> = {
  'UN-RFT226': rftSpecs({ model: 'UN-RFT226', gross: '226', net: '196', power: '94', current: '0.77', product: '520 × 535 × 1485', packing: '560 × 574 × 1507', loading: '144', weight: '38 / 42' }),
  'UN-RFT280': rftSpecs({ model: 'UN-RFT280', gross: '280', net: '235', power: '90', current: '0.8', product: '520 × 535 × 1700', packing: '580 × 574 × 1739', loading: '111', weight: '47 / 51' }),
  'UN-RFT380': rftSpecs({ model: 'UN-RFT380', gross: '380', net: '294', power: '120', current: '1.1', product: '600 × 615 × 1750', packing: '635 × 645 × 1822', loading: '76', weight: '56 / 65' }),
  'UN-RFT490': rftSpecs({ model: 'UN-RFT490', gross: '490', net: '430', power: '130', current: '1.3', product: '690 × 660 × 1860', packing: '730 × 705 × 1926', loading: '69', weight: '65 / 76' }),
}

const rftProducts: Product[] = rftSizeOrder
  .filter((folder) => (topFreezerRFT[folder] ?? []).length > 0)
  .map((folder) => {
    const photos = topFreezerRFT[folder]
    const closed = photos.filter((p) => !p.open)
    const models = [...new Set(closed.map((p) => p.model))]
    // Closed shots first (one per finish), then the open-door shots.
    const gallery = [...closed.map((p) => p.url), ...photos.filter((p) => p.open).map((p) => p.url)]
    return {
      id: `fridge-topfreezer-${slug(folder)}`,
      name: folder,
      categoryId: 'fridge',
      series: 'RFT Series',
      type: 'Top Freezer',
      rating: 4.5,
      highlights: topFreezerHighlights,
      models,
      image: (closed[0] ?? photos[0]).url,
      gallery,
      ...(rftSpecsByFolder[folder] ? { specs: rftSpecsByFolder[folder] } : {}),
    }
  })

const titanProducts: Product[] = topFreezerTitan.length
  ? [
      {
        id: 'fridge-topfreezer-rf463-titan',
        name: 'UN-RF463 TITAN',
        categoryId: 'fridge',
        series: 'TITAN Series',
        type: 'Top Freezer',
        rating: 4.6,
        badge: 'No Frost',
        highlights: topFreezerHighlights,
        models: topFreezerTitan.map((p) => `${p.model} TITAN`),
        image: topFreezerTitan[0].url,
        gallery: topFreezerTitan.map((p) => p.url),
      },
    ]
  : []

// ---------------------------------------------------------------------------
// Washing machines (type "Front Load" / "Twin Tub") — one card per model, photos
// auto-discovered from src/images/wm/ (see washingMachines in assets). Drop a new
// model folder in, run `npm run images`, and it appears automatically.
// ---------------------------------------------------------------------------
const frontLoadHighlights = [
  'Front-loading drum',
  'Gentle fabric care',
  'High-speed spin & dry',
  'Energy-efficient wash',
]
const twinTubHighlights = [
  'Twin-tub wash & spin',
  'Fast, simple operation',
  'Water-saving design',
  'Great everyday value',
]
const topLoadHighlights = [
  'Top-loading convenience',
  'Gentle pulsator wash',
  'Quick & easy operation',
  'Energy-efficient wash',
]
const wmHighlightsBySubtype: Record<string, string[]> = {
  'Twin Tub': twinTubHighlights,
  'Top Load': topLoadHighlights,
  'Front Load': frontLoadHighlights,
}

// Full spec sheet for the MAXPRO front-load family (8 kg). Both finishes
// (UN-8WBL / UN-8TBL) share it; only the model code differs.
const maxproSpecs = (model: string): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: model },
      { label: 'Platform', value: 'MAXPRO' },
      { label: 'Type', value: 'Front Load Washing Machine' },
      { label: 'Colour', value: 'White' },
      { label: 'Motor', value: 'BLDC Motor' },
      { label: 'Display', value: 'LED (White)' },
      { label: 'Door lock', value: 'Electromagnetic Lock' },
      { label: 'Plug type', value: 'Euro Plug' },
      { label: 'Power cord length', value: '1.5 m' },
      { label: 'Water inlet hose length', value: '1.0 m' },
    ],
  },
  {
    group: 'Power & Water',
    rows: [
      { label: 'Rated power supply', value: '220–240 V' },
      { label: 'Rated frequency', value: '50 Hz' },
      { label: 'Rated washing capacity', value: '8 kg' },
      { label: 'Rated spinning capacity', value: '8 kg' },
      { label: 'Rated power', value: '2000 W' },
      { label: 'Rated current', value: '10 A' },
      { label: 'Max. spin speed', value: '1400 RPM' },
      { label: 'Standard water pressure', value: '0.05–1 MPa' },
    ],
  },
  {
    group: 'Energy & Efficiency',
    rows: [
      { label: 'Energy efficiency class', value: 'A' },
      { label: 'Spin-drying efficiency class', value: 'B' },
      { label: 'Moisture ratio', value: '53.9%' },
      { label: 'Washing efficiency index', value: '1.031' },
      { label: 'Energy efficiency index', value: '51.9' },
      { label: 'Power consumption (left-on mode)', value: '1 W' },
      { label: 'Power consumption (off-mode)', value: '0.5 W' },
      { label: 'Weighted energy consumption', value: '51 kWh / 100 cycles' },
      { label: 'Energy consumption per cycle', value: '0.513 kWh' },
      { label: 'Energy at rated capacity', value: '0.895 kWh / cycle' },
      { label: 'Energy at half capacity', value: '0.560 kWh / cycle' },
      { label: 'Energy at quarter capacity', value: '0.232 kWh / cycle' },
      { label: 'Weighted water consumption', value: '52 L / cycle' },
      { label: 'Water at rated capacity', value: '67 L / cycle' },
      { label: 'Water at half capacity', value: '52 L / cycle' },
      { label: 'Water at quarter capacity', value: '41.5 L / cycle' },
      { label: 'Program duration at rated capacity', value: '239 min' },
      { label: 'Program duration at half capacity', value: '180 min' },
      { label: 'Program duration at quarter capacity', value: '180 min' },
      { label: 'Spinning noise level', value: '72 dB (Class A)' },
    ],
  },
  {
    group: 'Programmes & Functions',
    rows: [
      { label: 'Number of programmes', value: '15' },
      {
        label: 'Programmes',
        value: 'Steam Wash, Quick 15′, Rapid 45′, ECO 40-60, Wool, Bulky, Jeans, Spin Only, Cotton, Synthetic, Mix, 20°C, Sportswear, Baby Care, Drum Clean',
      },
      { label: 'Buttons', value: 'Delay (24 h), Temp, Speed, Functions' },
      { label: 'Functions', value: 'Extra Rinse, Prewash, Extra Wash, Higiene Pro, Mute-washing, Reload, Child Lock' },
      { label: 'Spin speed selection', value: '0 / 400 / 600 / 800 / 1000 / 1200 / 1400 RPM' },
      { label: 'Temperature selection', value: 'Cold / 20 / 30 / 40 / 60 / 90 °C' },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Inner tub volume', value: '64 L' },
      { label: 'Inner tub diameter', value: '510 mm' },
      { label: 'Door diameter', value: '330 mm' },
      { label: 'Door outer frame diameter', value: '480 mm' },
      { label: 'Net dimensions (W×D×H)', value: '595 × 530 × 850 mm' },
      { label: 'Max net dimensions (W×D×H)', value: '595 × 600 × 850 mm' },
      { label: 'Gross dimensions (W×D×H)', value: '680 × 655 × 875 mm' },
      { label: 'Net weight', value: '65 kg' },
      { label: 'Gross weight', value: '69 kg' },
      { label: "Loading qty (20ft / 40ft / 40HQ)", value: '48 / 102 / 159' },
    ],
  },
]

// Spec sheet for a Twin Tub washing machine. Shared values are baked in; only
// the size-dependent values (capacity, dimensions, weight, power…) are passed.
const twinTubSpecs = (
  model: string,
  o: {
    washCap: string
    netDim: string
    packDim: string
    washTub: string
    spinTub: string
    weight: string
    waterVol: string
    washPower: string
    loading: string
  }
): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: model },
      { label: 'Type', value: 'Twin Tub Washing Machine' },
      { label: 'Colour', value: 'White' },
      { label: 'Control panel', value: 'Glass' },
      { label: 'Wash lid / Spin lid', value: 'Glass' },
      { label: 'Cabinet layers', value: '1' },
      { label: 'Packaging', value: 'Brown carton box' },
    ],
  },
  {
    group: 'Materials',
    rows: [
      { label: 'Pulsator', value: 'PP' },
      { label: 'Inner tub', value: 'PP' },
      { label: 'Cabinet', value: 'PP' },
      { label: 'Base', value: 'PP' },
    ],
  },
  {
    group: 'Power & Water',
    rows: [
      { label: 'Rated voltage / frequency', value: '220–240 V / 50–60 Hz' },
      { label: 'Wash capacity', value: o.washCap },
      { label: 'Spin capacity', value: '5 kg' },
      { label: 'Rated wash power', value: o.washPower },
      { label: 'Rated spin power', value: '180 W' },
      { label: 'Water inlets', value: '2' },
      { label: 'Water volume', value: o.waterVol },
      { label: 'Max. water temperature', value: '≤ 50 °C' },
      { label: 'Wash timer', value: '15 min' },
      { label: 'Spin timer', value: '5 min' },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Net dimensions (W×D×H)', value: o.netDim },
      { label: 'Packing dimensions (W×D×H)', value: o.packDim },
      { label: 'Wash tub dimensions', value: o.washTub },
      { label: 'Spin tub dimensions', value: o.spinTub },
      { label: 'Net / Gross weight', value: o.weight },
      { label: "Loading qty (1×40'HQ)", value: o.loading },
    ],
  },
]

// Full spec sheet for the OPAL front-load washer (UN-9SDD OPAL, 9 kg).
const opalSpecs: SpecGroup[] = [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: 'UN-9SDD OPAL' },
      { label: 'Type', value: 'Front Loader' },
      { label: 'Capacity', value: '9 kg' },
      { label: 'Motor type', value: 'Direct Drive Motor' },
      { label: 'Drum volume', value: '58 L' },
      { label: 'Inner drum size', value: 'Φ484 × 372 mm' },
      { label: 'Display', value: 'LED' },
      { label: 'Key type', value: 'Micro + Tact + Touch' },
      { label: 'Door switch type', value: 'Auto' },
      { label: 'Door outer frame diameter', value: '511 mm' },
      { label: 'Door opening angle', value: '155°' },
    ],
  },
  {
    group: 'Smart Features',
    rows: [
      { label: 'Intelligent Washing System', value: 'Yes' },
      { label: 'Auto Balance', value: 'Yes' },
      { label: 'Load Detect', value: 'Yes' },
      { label: 'Foam Sensing & Removal', value: 'Yes' },
      { label: 'Auto Restart', value: 'Yes' },
      { label: 'Variable spin speed', value: 'up to 1400 RPM' },
      { label: 'Variable temperature', value: 'Cold / 40 / 60 / 95 °C' },
    ],
  },
  {
    group: 'Performance (EU Standard)',
    rows: [
      { label: 'Operation voltage', value: 'AC 220–240 V' },
      { label: 'Rated frequency', value: '50 Hz' },
      { label: 'Rated heating input power', value: '2000 W' },
      { label: 'Max. input power', value: '2200 W' },
      { label: 'Rated washing input power', value: '200 W' },
      { label: 'Spinning input power', value: '500 W' },
      { label: 'Energy efficiency class', value: 'A+++' },
      { label: 'Water consumption', value: '55 L / cycle' },
      { label: 'Energy consumption', value: '0.89 kWh / cycle' },
      { label: 'Water consumption (annual)', value: '12000 L / year' },
      { label: 'Energy consumption (annual)', value: '195 kWh / year' },
      { label: 'Spin performance', value: 'B' },
      { label: 'Washing efficiency index', value: '1.03' },
      { label: 'Waterproof class', value: 'IPX4' },
      { label: 'Noise level – Wash', value: '60 dB(A)' },
      { label: 'Noise level – Spin', value: '75 dB(A)' },
      { label: 'Water pressure', value: '0.03–1 MPa' },
    ],
  },
  {
    group: 'Programmes & Options',
    rows: [
      { label: 'Number of programmes', value: '14' },
      {
        label: 'Programmes',
        value: 'Cotton, Sports, Duvet, Mix, Quick 30′ / Rapid 30′, Cotton+, Easy Care, Allergy Care, Baby Steam Care, Gentle Care, Dark Wash, Stain Care, Silent Wash, Download Cycle',
      },
      {
        label: 'Additional options',
        value: 'Pre Wash, Child Lock, Delay, Temp, Speed, Rinse, Soak, Crease Care, Intensive, Time Save, Add Clothes',
      },
      { label: 'Delay time', value: '3–19 h' },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Dimensions (W×D×H)', value: '595 × 600 × 850 mm' },
      { label: 'Dimensions with packing (W×D×H)', value: '652 × 671 × 885 mm' },
      { label: 'Net weight', value: '66 kg' },
      { label: 'Gross weight', value: '71 kg' },
      { label: 'Loading quantity (40HQ)', value: '162' },
    ],
  },
]

// Full spec sheet for the VEVO front-load family (9 kg). Both finishes
// (UN-9DSDD Dark Silver / UN-9WDD White) share it; only colour & code differ.
const vevoSpecs = (model: string, color: string): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Model', value: model },
      { label: 'Type', value: 'Front Loader' },
      { label: 'Capacity', value: '9 kg' },
      { label: 'Colour / Finish', value: color },
      { label: 'Motor type', value: 'Direct Drive Motor' },
      { label: 'Drum volume', value: '58 L' },
      { label: 'Inner drum size', value: 'Φ484 × 372 mm' },
      { label: 'Display', value: 'LED' },
      { label: 'Key type', value: 'Touch' },
      { label: 'Door switch type', value: 'Auto' },
      { label: 'Door outer frame diameter', value: '520 mm' },
      { label: 'Door opening angle', value: '150°' },
    ],
  },
  {
    group: 'Smart Features',
    rows: [
      { label: 'Intelligent Washing System', value: 'Yes' },
      { label: 'Auto Balance', value: 'Yes' },
      { label: 'Load Detect', value: 'Yes' },
      { label: 'Foam Sensing & Removal', value: 'Yes' },
      { label: 'Auto Restart', value: 'Yes' },
      { label: 'Variable spin speed', value: 'up to 1400 RPM' },
      { label: 'Variable temperature', value: 'Cold / 30 / 40 / 60 / 96 °C' },
    ],
  },
  {
    group: 'Performance (EU Standard)',
    rows: [
      { label: 'Operation voltage', value: 'AC 220–240 V' },
      { label: 'Rated frequency', value: '50 Hz' },
      { label: 'Rated heating input power', value: '2000 W' },
      { label: 'Max. input power', value: '2200 W' },
      { label: 'Rated washing input power', value: '200 W' },
      { label: 'Spinning input power', value: '500 W' },
      { label: 'Energy efficiency class', value: 'A+++' },
      { label: 'Water consumption', value: '55 L / cycle' },
      { label: 'Energy consumption', value: '0.89 kWh / cycle' },
      { label: 'Water consumption (annual)', value: '12000 L / year' },
      { label: 'Energy consumption (annual)', value: '195 kWh / year' },
      { label: 'Spin performance', value: 'B' },
      { label: 'Washing efficiency index', value: '1.03' },
      { label: 'Waterproof class', value: 'IPX4' },
      { label: 'Noise level – Wash', value: '60 dB(A)' },
      { label: 'Noise level – Spin', value: '75 dB(A)' },
      { label: 'Water pressure', value: '0.03–1 MPa' },
    ],
  },
  {
    group: 'Programmes & Options',
    rows: [
      { label: 'Number of programmes', value: '14' },
      {
        label: 'Programmes',
        value: 'Smart Wash, Sports, Duvet, Baby Care, Quick 15′, Wool, Rinse + Spin, Spin Only, Tub Clean, Shirts, Super Spa, Under Wear, Down Jacket, Soft Wash',
      },
      {
        label: 'Additional options',
        value: 'Pre Wash, UV, Delay, My Cycle / Memory, Temp, Speed, Rinse, Steam',
      },
      { label: 'Drum light', value: 'Yes' },
      { label: 'UV', value: 'Yes' },
      { label: 'Delay time', value: '3–24 h' },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Dimensions (W×D×H)', value: '595 × 600 × 850 mm' },
      { label: 'Dimensions with packing (W×D×H)', value: '652 × 671 × 885 mm' },
      { label: 'Net weight', value: '66 kg' },
      { label: 'Gross weight', value: '71 kg' },
      { label: 'Loading quantity (40HQ)', value: '162' },
    ],
  },
]

// Per-model spec sheets, keyed by the model's leaf folder. Models without an
// entry show photos + highlights only (no Full Specification section).
const wmSpecs: Record<string, SpecGroup[]> = {
  'UN-8TBL MAXPRO': maxproSpecs('UN-8TBL MAXPRO'),
  'UN-8WBL MAXPRO': maxproSpecs('UN-8WBL MAXPRO'),
  WM_OPAL: opalSpecs,
  'UN-9DSDD VEVO': vevoSpecs('UN-9DSDD VEVO', 'Dark Silver'),
  'UN-9WDD VEVO': vevoSpecs('UN-9WDD VEVO', 'White'),
  'UN-WMT18000': twinTubSpecs('UN-WMT18000', {
    washCap: '8 kg',
    netDim: '710 × 400 × 880 mm',
    packDim: '750 × 460 × 910 mm',
    washTub: '370 × 385 × 485 mm',
    spinTub: 'Φ230 (inner) × 370 mm',
    weight: '19 / 21 kg',
    waterVol: '55.5 L',
    washPower: '360 W',
    loading: '218',
  }),
  'UN-WMT26000': twinTubSpecs('UN-WMT26000', {
    washCap: '13 kg',
    netDim: '855 × 505 × 1020 mm',
    packDim: '915 × 545 × 1040 mm',
    washTub: '465 × 465 × 535 mm',
    spinTub: 'Φ250 (inner) × 380 mm',
    weight: '26 / 29 kg',
    waterVol: '79 L',
    washPower: '400 W',
    loading: '120',
  }),
}

// Tidy a leaf folder into a display name, e.g. 'WM_OPAL' → 'OPAL'. A folder can
// override this with its full model code where the folder name is abbreviated.
const wmNameOverride: Record<string, string> = {
  WM_OPAL: 'UN-9SDD OPAL',
}
const wmName = (folder: string) =>
  wmNameOverride[folder] ?? folder.replace(/^WM[_ ]/i, '').replace(/_/g, ' ').trim()

const washingMachineProducts: Product[] = washingMachines.map((wm) => ({
  id: `laundry-${slug(wm.subtype)}-${slug(wm.folder)}`,
  name: wmName(wm.folder),
  categoryId: 'laundry',
  series: `${wm.subtype} Series`,
  type: wm.subtype,
  rating: 4.5,
  highlights: wmHighlightsBySubtype[wm.subtype] ?? frontLoadHighlights,
  models: [wmName(wm.folder)],
  image: wm.photos[0],
  gallery: wm.photos,
  ...(wmSpecs[wm.folder] ? { specs: wmSpecs[wm.folder] } : {}),
}))

// ---------------------------------------------------------------------------
// Televisions — three families (MAX FHD / VENZA UHD / PRO QLED), photos
// auto-discovered from src/images/TV/<model>/ (see televisions in assets). Each
// model has a full spec sheet built from a per-model record + family defaults.
// ---------------------------------------------------------------------------
type TvRec = Record<string, string>

const TV_TEXT = {
  osGoogle: 'Google TV (Android 14)',
  videoDecG: 'VP9, HEVC/H.265, MPEG1/2, MPEG4, H.263, H.264, VC1, VP8, AV1',
  audioDecG: 'MPEG1/2 L1/L2/L3, AC3 (DD), EAC3 (DDP), AAC-LC, FLAC',
  photoDecG: 'JPG, JPEG, BMP, PNG, GIF',
}

// Shared defaults for the Google-TV platform (VENZA + PRO).
const googleBase: TvRec = {
  resolution: '3840×2160',
  chassis: 'MT9603',
  cpu: 'CA55×4 @1.5 GHz',
  gpu: 'Mali G52 MC1 @550 MHz',
  os: TV_TEXT.osGoogle,
  ram: '2 GB',
  storage: '16 GB',
  bt: 'Bluetooth 5.1',
  wifi: '2T2R 2.4G & 5G',
  browser: 'No',
  appStore: 'Google Play',
  multiscreen: 'DLNA, Google Cast, AirPlay',
  voice: 'Google Assistant',
  preApps: 'Netflix, Amazon Prime Video, YouTube',
  emanual: 'Yes',
  epg: 'Yes',
  aspectRatio: '16:9',
  refresh: '60 Hz',
  viewingAngle: '178°/178° (typ.)',
  backCover: 'Plastic / Black',
  displayColor: '1.07G',
  pictureMode: 'User, Standard, Vivid, Sport, Movie, Game, Energy Saving',
  hlg: 'Yes',
  hdr10: 'Yes',
  memc: 'Yes',
  allm: 'Yes',
  vrr: 'Yes',
  dynBacklight: 'Yes',
  colorTemp: 'Warm / Cold / Standard / User',
  advPicture: 'DNR, Blue Stretch, DI Film Mode, Local Contrast Control…',
  speakers: 'Integrated speaker boxes (bottom side)',
  audioPower: '2×10 W',
  soundMode: 'User, Standard, Vivid, Sport, Movie, Music, News',
  dap: 'Yes',
  dolby: 'Dolby / Dolby+',
  advAudio: 'Equalizer detail',
  digitalSystem: 'DVB-C, DVB-T/T2',
  channelBw: '6M / 7M / 8M',
  maxChannels: '9999',
  videoSystem: 'PAL',
  soundSystem: 'B, D, G, I, K',
  sidePorts: '2×HDMI 2.1, 2×USB 2.0',
  buttonPorts: '2×HDMI 2.1, 1×LAN, 1×AV Mini, 1×Earphone, 1×Optical, 2×ANT',
  powerSupply: 'AC 100–240 V 50/60 Hz',
  standby: '≤0.5 W',
  videoDecoder: TV_TEXT.videoDecG,
  audioDecoder: TV_TEXT.audioDecG,
  photoDecoder: TV_TEXT.photoDecG,
}

const venzaBase: TvRec = {
  ...googleBase,
  productType: 'UHD Google TV',
  backlight: 'DLED',
  frame: 'Metal frameless',
  bottomBezel: 'Metal / Black',
  baseStand: 'Plastic / Black',
  qled: 'No',
  wideGamut: 'No',
}
const proBase: TvRec = {
  ...googleBase,
  productType: 'QLED Google TV',
  backlight: 'QLED',
  frame: 'Metal frameless',
  bottomBezel: 'Metal / Grey',
  baseStand: 'Metal / Grey',
  qled: 'Yes',
  colorGamut: 'Up to 90% DCI-P3',
  wideGamut: 'No',
}

const TV_RECS: Record<string, TvRec> = {
  'F4314 MAX': {
    productType: 'FHD Smart TV', size: '43', resolution: '1920×1080',
    chassis: 'Hisi V352', cpu: 'CA53×4 @1.0 GHz', gpu: 'Mali450 MP2',
    os: 'AOSP (Android 14)', ram: '1 GB', storage: '8 GB', bt: 'Yes', wifi: '1T1R 2.4G',
    frame: 'Plastic narrow frame', bottomBezel: 'Plastic / Black', backCover: 'Plastic / Black',
    baseStand: 'Plastic / Black', backlight: 'DLED', openCell: 'VA', aspectRatio: '16:9',
    panelActive: '41.5"', brightness: '220 nit (typ.)', contrast: '3000:1 (typ.)', response: '8 ms',
    viewingAngle: '176°/176° (typ.)', displayColor: '16.7M', refresh: '60 Hz', qled: 'No',
    colorGamut: '68% NTSC', wideGamut: 'No', browser: 'Yes', appStore: 'Zeasn',
    multiscreen: 'Miracast', voice: 'No', preApps: 'No', emanual: 'No', epg: 'No',
    pictureMode: 'Standard, Soft, User, Vivid', hlg: 'No', hdr10: 'No', memc: 'No', allm: 'No',
    vrr: 'No', dynBacklight: 'No', colorTemp: 'Warm / Cold / Standard', advPicture: 'No',
    speakers: 'Integrated speaker boxes (bottom side)', audioPower: '2×8 W',
    soundMode: 'Standard, Music, Movie, Sport, User', dap: 'No', dolby: 'Dolby / Dolby+', advAudio: 'No',
    digitalSystem: 'DVB-C/T/T2/S/S2', channelBw: '6–8M', maxChannels: 'DVB-C/T/T2: 1000, DVB-S/S2: 4000',
    videoSystem: 'PAL', soundSystem: 'B, D, G, I, K',
    sidePorts: '1×HDMI 1.4, 2×ANT, 1×Optical, 1×AV Mini, 1×USB 2.0, 1×Earphone',
    buttonPorts: '1×LAN, 2×HDMI 1.4, 1×USB 2.0', powerSupply: 'AC 100–240 V 50/60 Hz', standby: '≤0.5 W',
    powerOn: '70 W', unitWithStand: '956×180×588 mm', unitNoStand: '956×78×542 mm',
    carton: '995×105×587 mm', loading: '463 / 957 / 1080', net: '6.2 kg', gross: '8.2 kg',
    wallSupport: '200×200, M6', videoDecoder: 'MPEG-1, MPEG-4, VP6, VP8, VP9, MJPEG',
    audioDecoder: 'AC3, ADPCM, APE, EAC3, FLAC, MID, MPEG, PCM', photoDecoder: 'JPEG, BMP, PNG',
  },
  'U5014 VENZA': {
    ...venzaBase, size: '50', openCell: 'VA', panelActive: '49.5"', brightness: '250 nit (typ.)',
    contrast: '5000:1 (typ.)', response: '6 ms', colorGamut: '70% NTSC', powerOn: '120 W',
    unitWithStand: '1118.1×275.2×703.8 mm', unitNoStand: '1110×91.7×641.8 mm', carton: '1215×125×730 mm',
    loading: '249 / 531 / 588', net: '8.4 kg', gross: '11 kg', wallSupport: '400×200, M6',
  },
  'U5514 VENZA': {
    ...venzaBase, size: '55', openCell: 'IPS', panelActive: '54.6"', brightness: '280 nit (typ.)',
    contrast: '1200:1 (typ.)', response: '8 ms', colorGamut: '72% NTSC', powerOn: '130 W',
    unitWithStand: '1231.6×273.7×770.5 mm', unitNoStand: '1225.6×90.8×709 mm', carton: '1320×128×800 mm',
    loading: '152 / 324 / 486', net: '10.3 kg', gross: '13.5 kg', wallSupport: '400×200, M6',
  },
  'U6514 VENZA': {
    ...venzaBase, size: '65', openCell: 'IPS', panelActive: '64.5"', brightness: '300 nit (typ.)',
    contrast: '1400:1 (typ.)', response: '10 ms', colorGamut: '72% NTSC', powerOn: '160 W',
    unitWithStand: '1445.3×299.9×891.4 mm', unitNoStand: '1445.3×91.7×831.5 mm', carton: '1610×165×974 mm',
    loading: '102 / 215 / 244', net: '14.6 kg', gross: '21.7 kg', wallSupport: '600×300, M6',
  },
  'Q5014 PRO': {
    ...proBase, size: '50', openCell: 'VA', panelActive: '49.5"', brightness: '300 nit (typ.)',
    contrast: '5000:1 (typ.)', response: '6 ms', powerOn: '130 W',
    unitWithStand: '1111×212.2×700 mm', unitNoStand: '1111×91.7×641.8 mm', carton: '1215×125×730 mm',
    loading: '249 / 531 / 588', net: '8.6 kg', gross: '11.2 kg', wallSupport: '400×200, M6',
  },
  'Q5514 PRO': {
    ...proBase, size: '55', openCell: 'IPS', panelActive: '54.6"', brightness: '350 nit (typ.)',
    contrast: '1200:1 (typ.)', response: '8 ms', powerOn: '150 W',
    unitWithStand: '1225.6×268.7×763.6 mm', unitNoStand: '1225.6×91×709 mm', carton: '1320×128×800 mm',
    loading: '152 / 324 / 486', net: '10.8 kg', gross: '14 kg', wallSupport: '400×200, M6',
  },
  'Q6514 PRO': {
    ...proBase, size: '65', openCell: 'IPS', panelActive: '64.5"', brightness: '350 nit (typ.)',
    contrast: '1400:1 (typ.)', response: '10 ms', powerOn: '180 W',
    unitWithStand: '1445.3×293.3×892.9 mm', unitNoStand: '1445.3×91.7×831.5 mm', carton: '1610×165×974 mm',
    loading: '102 / 215 / 244', net: '15.1 kg', gross: '22.2 kg', wallSupport: '600×300, M6',
  },
  'Q7514 PRO': {
    ...proBase, size: '75', openCell: 'VA', panelActive: '74.5"', brightness: '400 nit (typ.)',
    contrast: '6000:1 (typ.)', response: '6.5 ms', powerOn: '235 W',
    pictureMode: 'User, Standard, Vivid, Movie, Game, Energy Saving, Sport',
    unitWithStand: '1667×349×1028 mm', unitNoStand: '1667×89.5×956 mm', carton: '1835×175×1115 mm',
    loading: '80 / 166 / 166', net: '20.4 kg', gross: '29 kg', wallSupport: '400×200, M6',
  },
  'Q8514 PRO': {
    ...proBase, size: '85', openCell: 'VA', panelActive: '84.5"', brightness: '400 nit (typ.)',
    contrast: '5000:1 (typ.)', response: '8.5 ms', powerOn: '300 W', displayColor: '16.7M',
    refresh: '60 Hz (DLG 120 Hz)', colorGamut: 'Up to 95% DCI-P3', wideGamut: 'Yes',
    bottomBezel: 'Metal / Silver', baseStand: 'Metal / Silver',
    sidePorts: '3×HDMI 2.1, 1×USB 2.0',
    buttonPorts: '1×HDMI 2.1, 1×USB 2.0, 1×LAN, 1×AV, 1×Earphone, 1×Optical, 2×ANT',
    unitWithStand: '1889.6×386×1162.4 mm', unitNoStand: '1889.6×91.1×1079.5 mm', carton: '2110×225×1193 mm',
    loading: '27 / 56 / 112', net: '29.9 kg', gross: '43.8 kg', wallSupport: '600×400, M8',
  },
}

const tvSpecs = (r: TvRec): SpecGroup[] => [
  {
    group: 'Display',
    rows: [
      { label: 'Product type', value: r.productType },
      { label: 'Screen size', value: `${r.size}"` },
      { label: 'Resolution', value: r.resolution },
      { label: 'Backlight type', value: r.backlight },
      { label: 'Panel (open cell)', value: r.openCell },
      { label: 'Aspect ratio', value: r.aspectRatio },
      { label: 'Panel active size', value: r.panelActive },
      { label: 'Brightness', value: r.brightness },
      { label: 'Contrast ratio', value: r.contrast },
      { label: 'Response time (G to G)', value: r.response },
      { label: 'Viewing angle (H/V)', value: r.viewingAngle },
      { label: 'Display colour', value: r.displayColor },
      { label: 'Refresh rate', value: r.refresh },
      { label: 'QLED', value: r.qled },
      { label: 'Colour gamut', value: r.colorGamut },
      { label: 'Wide colour gamut', value: r.wideGamut },
    ],
  },
  {
    group: 'Platform & System',
    rows: [
      { label: 'Chassis platform', value: r.chassis },
      { label: 'CPU', value: r.cpu },
      { label: 'GPU', value: r.gpu },
      { label: 'Operating system', value: r.os },
      { label: 'RAM', value: r.ram },
      { label: 'Storage', value: r.storage },
    ],
  },
  {
    group: 'Smart & Connectivity',
    rows: [
      { label: 'Bluetooth', value: r.bt },
      { label: 'Wi-Fi', value: r.wifi },
      { label: 'App store', value: r.appStore },
      { label: 'Multiscreen', value: r.multiscreen },
      { label: 'Voice assistant', value: r.voice },
      { label: 'Pre-installed apps', value: r.preApps },
      { label: 'Web browser', value: r.browser },
      { label: 'E-manual', value: r.emanual },
      { label: 'EPG', value: r.epg },
    ],
  },
  {
    group: 'Picture',
    rows: [
      { label: 'Picture modes', value: r.pictureMode },
      { label: 'HLG', value: r.hlg },
      { label: 'HDR10', value: r.hdr10 },
      { label: 'MEMC', value: r.memc },
      { label: 'ALLM', value: r.allm },
      { label: 'VRR', value: r.vrr },
      { label: 'Dynamic backlight', value: r.dynBacklight },
      { label: 'Colour temperature', value: r.colorTemp },
      { label: 'Advanced settings', value: r.advPicture },
    ],
  },
  {
    group: 'Audio',
    rows: [
      { label: 'Speakers', value: r.speakers },
      { label: 'Audio power output', value: r.audioPower },
      { label: 'Sound modes', value: r.soundMode },
      { label: 'Dolby Audio Processing', value: r.dap },
      { label: 'Dolby', value: r.dolby },
      { label: 'Advanced audio', value: r.advAudio },
    ],
  },
  {
    group: 'Tuner',
    rows: [
      { label: 'Digital system', value: r.digitalSystem },
      { label: 'Channel bandwidth', value: r.channelBw },
      { label: 'Max channels', value: r.maxChannels },
      { label: 'Video system', value: r.videoSystem },
      { label: 'Sound system', value: r.soundSystem },
    ],
  },
  {
    group: 'Connections',
    rows: [
      { label: 'Side ports', value: r.sidePorts },
      { label: 'Rear ports', value: r.buttonPorts },
    ],
  },
  {
    group: 'Design',
    rows: [
      { label: 'Frame', value: r.frame },
      { label: 'Bottom bezel', value: r.bottomBezel },
      { label: 'Back cover', value: r.backCover },
      { label: 'Base stand', value: r.baseStand },
    ],
  },
  {
    group: 'Power',
    rows: [
      { label: 'Power supply', value: r.powerSupply },
      { label: 'Power consumption (on)', value: r.powerOn },
      { label: 'Power consumption (standby)', value: r.standby },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Unit with stand (W×D×H)', value: r.unitWithStand },
      { label: 'Unit without stand (W×D×H)', value: r.unitNoStand },
      { label: 'Carton (W×D×H)', value: r.carton },
      { label: 'Loading (20GP / 40GP / 40HQ)', value: r.loading },
      { label: 'Net weight', value: r.net },
      { label: 'Gross weight', value: r.gross },
      { label: 'Wall mount (VESA)', value: r.wallSupport },
    ],
  },
  {
    group: 'Decoders',
    rows: [
      { label: 'Video decoder', value: r.videoDecoder },
      { label: 'Audio decoder', value: r.audioDecoder },
      { label: 'Photo decoder', value: r.photoDecoder },
    ],
  },
]

// TVs are filtered by display technology (QLED / UHD / FHD) — taken straight from
// the tv.tech folder. The series (MAX / VENZA / PRO) is the model's last word.
const tvSeriesOf = (folder: string): string => folder.split(' ').pop() ?? 'TV'

const tvProducts: Product[] = televisions.map((tv) => {
  const rec = TV_RECS[tv.folder]
  const series = tvSeriesOf(tv.folder)
  return {
    id: `tv-${slug(tv.folder)}`,
    name: tv.folder,
    categoryId: 'tv',
    series: `${series} Series`,
    type: tv.tech, // filter by technology (QLED / UHD / FHD) — from the folder
    rating: 4.6,
    badge: series, // series (MAX / VENZA / PRO) shown as the card tag
    highlights: rec
      ? [`${rec.size}-inch ${rec.productType}`, `${rec.resolution} resolution`, rec.os, `${rec.audioPower} Dolby audio`]
      : ['Smart TV'],
    models: [tv.folder],
    image: tv.photos[0],
    gallery: tv.photos,
    ...(rec ? { specs: tvSpecs(rec) } : {}),
  }
})

// ---------------------------------------------------------------------------
// Chest freezers (type "Chest Freezer") — three capacities (CF194 / CF290 /
// CF352), each in a Silver (S) and White (W) finish that share the capacity's
// spec sheet. Photos: src/images/Freezer/Chest Freezer/<model>/<model>.jpg
// ---------------------------------------------------------------------------
const chestFreezerSpecs = (o: {
  model: string
  color: string
  capacity: string
  climate: string
  width: string
  depth: string
  height: string
  load: string
}): SpecGroup[] => [
  {
    group: 'Capacity & Performance',
    rows: [
      { label: 'Model', value: o.model },
      { label: 'Net capacity (freezer)', value: o.capacity },
      { label: 'Climate class', value: o.climate },
    ],
  },
  {
    group: 'General Features',
    rows: [
      { label: 'Type', value: 'Chest Freezer' },
      { label: 'Colour', value: o.color },
      { label: 'Condenser', value: 'Outside condenser' },
      { label: 'Number of doors', value: '1' },
      { label: 'Adjustable leg', value: 'Yes' },
      { label: 'Handle', value: 'Grip' },
      { label: 'Key / Lock', value: 'Yes' },
      { label: 'Interior light', value: 'Yes' },
      { label: 'Temperature control', value: 'Mechanical' },
      { label: 'Defrosting', value: 'Manual' },
      { label: 'Refrigerant', value: 'R600a' },
      { label: 'Freezer basket', value: 'Wire' },
    ],
  },
  {
    group: 'Compressor',
    rows: [
      { label: 'Brand', value: 'GMCC' },
      { label: 'Inverter', value: 'No' },
    ],
  },
  {
    group: 'Dimensions & Loading',
    rows: [
      { label: 'Width — net / packing', value: o.width },
      { label: 'Depth — net / packing', value: o.depth },
      { label: 'Height — net / packing', value: o.height },
      { label: 'Loading quantity (40HQ)', value: o.load },
      { label: 'Loading port', value: 'Nanjing' },
    ],
  },
]

const chestFreezerModels = [
  { code: 'CF194', capacity: '194 L', climate: 'T', width: '945 / 985 mm', depth: '523 / 547 mm', height: '850 / 885 mm', load: '144' },
  { code: 'CF290', capacity: '290 L', climate: 'T / ST', width: '1115 / 1155 mm', depth: '670 / 700 mm', height: '850 / 885 mm', load: '101' },
  { code: 'CF352', capacity: '352 L', climate: 'T', width: '1256 mm', depth: '750 mm', height: '825 mm', load: '81' },
]
const chestFinishes = [
  { s: 'S', color: 'Silver' },
  { s: 'W', color: 'White' },
]
const chestFreezerProducts: Product[] = chestFreezerModels.flatMap((m) =>
  chestFinishes.map((f) => {
    const model = `UN-${m.code}${f.s}`
    return {
      id: `freezer-chest-${slug(model)}`,
      name: model,
      categoryId: 'fridge',
      series: `Chest Freezer · ${f.color}`,
      type: 'Chest Freezer',
      rating: 4.5,
      ...(f.s === 'S' && m.code === 'CF194' ? { badge: 'R600a' } : {}),
      highlights: [`${m.capacity} net capacity`, 'Manual defrost', 'R600a refrigerant', 'Key lock & grip handle'],
      models: [model],
      image: img(`Freezer/Chest Freezer/${model}/${model}.jpg`),
      gallery: [img(`Freezer/Chest Freezer/${model}/${model}.jpg`)],
      specs: chestFreezerSpecs({
        model,
        color: f.color,
        capacity: m.capacity,
        climate: m.climate,
        width: m.width,
        depth: m.depth,
        height: m.height,
        load: m.load,
      }),
    }
  })
)

// Sliding-glass-door chest freezers (CF227 / CF327 / CF363), each in White,
// Dark Grey and Golden; two photos per colour. A separate spec sheet from the
// wire-basket chest freezers above.
const glassChestSpecs = (o: {
  model: string
  color: string
  capacity: string
  loading: string
  refrigerant: string
  fan: string
  net: string
  pack: string
}): SpecGroup[] => [
  {
    group: 'Capacity & Performance',
    rows: [
      { label: 'Model', value: o.model },
      { label: 'Gross capacity (freezer)', value: o.capacity },
      { label: 'Temperature range', value: '≤ −18 °C' },
      { label: 'Climate class', value: 'T' },
      { label: "Loading quantity (40' / 40'HQ)", value: o.loading },
    ],
  },
  {
    group: 'General Features',
    rows: [
      { label: 'Type', value: 'Chest Freezer (glass door)' },
      { label: 'Colour', value: o.color },
      { label: 'Condenser', value: 'Outside' },
      { label: 'Sliding glass door', value: 'Yes' },
      { label: 'Door type', value: 'Hinged' },
      { label: 'Defrosting', value: 'Manual' },
      { label: 'Defrost drain', value: 'Yes' },
      { label: 'Foaming agent', value: 'C-P (cyclopentane)' },
      { label: 'Refrigerant', value: o.refrigerant },
      { label: 'Compressor fan', value: o.fan },
      { label: 'Interior light', value: 'Yes / LED' },
      { label: 'Adjustable thermostat', value: 'Yes (mechanical)' },
      { label: 'Handle', value: 'Yes' },
      { label: 'Inside walls', value: 'Embossed aluminium' },
      { label: 'Basket', value: 'Plastic ×1' },
      { label: 'Ice scoop', value: '1' },
      { label: 'Mobility wheels', value: '4 (front / rear)' },
    ],
  },
  {
    group: 'Electrical',
    rows: [{ label: 'Voltage / Frequency', value: '220 V / 50 Hz' }],
  },
  {
    group: 'Dimensions',
    rows: [
      { label: 'Net dimensions (W×D×H)', value: o.net },
      { label: 'Packing dimensions (W×D×H)', value: o.pack },
    ],
  },
]

const glassChestModels = [
  { code: 'CF227', capacity: '227 L', loading: '129', refrigerant: 'R600a', fan: 'No', net: '834 × 678 × 830 mm', pack: '884 × 703 × 876 mm' },
  { code: 'CF327', capacity: '327 L', loading: '107', refrigerant: 'R600a', fan: 'No', net: '1104 × 670 × 830 mm', pack: '1142 × 665 × 876 mm' },
  { code: 'CF363', capacity: '363 L', loading: '75', refrigerant: 'R290', fan: 'Yes', net: '1304 × 678 × 830 mm', pack: '1354 × 703 × 876 mm' },
]
const glassColors = [
  { s: 'W', color: 'White' },
  { s: 'DG', color: 'Dark Grey' },
  { s: 'GL', color: 'Golden' },
]
const glassChestProducts: Product[] = glassChestModels.flatMap((m) =>
  glassColors.map((c) => {
    const model = `UN-${m.code}${c.s}`
    const un = img(`Freezer/Chest Freezer/${m.code}/UN_${m.code}${c.s}.jpg`)
    const plain = img(`Freezer/Chest Freezer/${m.code}/${m.code}${c.s}.jpg`)
    return {
      id: `freezer-chest-${slug(model)}`,
      name: model,
      categoryId: 'fridge',
      series: `Chest Freezer · ${c.color}`,
      type: 'Chest Freezer',
      rating: 4.5,
      highlights: [`${m.capacity} gross capacity`, 'Sliding glass door', `${m.refrigerant} refrigerant`, '4 mobility wheels'],
      models: [model],
      image: un,
      gallery: [un, plain],
      specs: glassChestSpecs({
        model,
        color: c.color,
        capacity: m.capacity,
        loading: m.loading,
        refrigerant: m.refrigerant,
        fan: m.fan,
        net: m.net,
        pack: m.pack,
      }),
    }
  })
)

// Showcase freezer (type "Showcase Freezer") — UN-CFS396WA, sliding tempered-
// glass door. One model shown in several scene-colour renders.
const scf = (f: string) => img(`Freezer/Showcase Freezer/UN-CFS396WA ${f}.jpg`)
const showcaseFreezerProducts: Product[] = [
  {
    id: 'freezer-showcase-un-cfs396wa',
    name: 'UN-CFS396WA',
    categoryId: 'fridge',
    series: 'Showcase Freezer',
    type: 'Showcase Freezer',
    rating: 4.5,
    badge: 'R290',
    highlights: ['396 L gross capacity', 'Sliding tempered-glass door', 'R290 refrigerant', '4 mobility wheels'],
    models: ['UN-CFS396WA'],
    image: scf('White'),
    gallery: [scf('White'), scf('Black'), scf('Blue'), scf('Yellow')],
    specs: [
      {
        group: 'Capacity & Performance',
        rows: [
          { label: 'Model', value: 'UN-CFS396WA' },
          { label: 'Gross capacity (freezer)', value: '396 L' },
          { label: 'Temperature range', value: '≤ −18 °C' },
          { label: 'Climate class', value: 'T' },
          { label: "Loading quantity (40'HQ)", value: '81' },
        ],
      },
      {
        group: 'General Features',
        rows: [
          { label: 'Type', value: 'Showcase Freezer' },
          { label: 'Colour', value: 'White' },
          { label: 'Frame / interior colour', value: 'White' },
          { label: 'Door glass', value: 'Tempered glass' },
          { label: 'Door type', value: 'Sliding' },
          { label: 'Condenser', value: 'Outside + roll-bond' },
          { label: 'Compressor fan', value: 'Yes' },
          { label: 'Defrosting', value: 'Manual' },
          { label: 'Refrigerant', value: 'R290' },
          { label: 'Handle', value: 'No' },
          { label: 'Lock', value: 'Yes' },
          { label: 'Inside walls', value: 'Aluminium' },
          { label: 'Basket', value: 'Plastic ×2' },
          { label: 'Ice scoop', value: 'Yes' },
          { label: 'Defrost drain', value: 'Yes' },
          { label: 'Mobility wheels', value: '4 pcs (4-side)' },
        ],
      },
      {
        group: 'Electrical',
        rows: [{ label: 'Voltage / Frequency', value: '220 V / 50 Hz' }],
      },
      {
        group: 'Dimensions & Weight',
        rows: [
          { label: 'Net dimensions (W×D×H)', value: '1234 × 653 × 860 mm' },
          { label: 'Packing dimensions (W×D×H)', value: '1280 × 720 × 880 mm' },
          { label: 'Net / Gross weight', value: '51.2 / 56.7 kg' },
        ],
      },
    ],
  },
]

// UN-RFC380 upright glass-door showcase coolers (0–10 °C), five colours; some
// have a second view photo. Grouped under the Showcase Freezer type.
const rfc380Specs = (model: string, color: string): SpecGroup[] => [
  {
    group: 'Capacity & Performance',
    rows: [
      { label: 'Model', value: model },
      { label: 'Gross cooling capacity', value: '380 L' },
      { label: 'Temperature range', value: '0 – 10 °C' },
      { label: 'Climate class', value: 'T' },
      { label: "Loading quantity (40'HC)", value: '99' },
      { label: 'CB certificate', value: 'Yes' },
    ],
  },
  {
    group: 'General Features',
    rows: [
      { label: 'Type', value: 'Showcase Cooler' },
      { label: 'Colour', value: color },
      { label: 'Door panel', value: 'Glass' },
      { label: 'Door type', value: 'Hinged' },
      { label: 'Door frame', value: 'Plastic' },
      { label: 'Self-closing door', value: 'Yes' },
      { label: 'Condenser', value: 'Outside' },
      { label: 'Thermostat', value: 'Mechanical' },
      { label: 'Refrigerant', value: 'R600a' },
      { label: 'Handle', value: 'Outside' },
      { label: 'Lock', value: 'Yes' },
      { label: 'Top lamp box', value: 'Yes' },
      { label: 'Inner fan', value: 'Yes' },
      { label: 'Compressor-room fan', value: 'Yes' },
      { label: 'Shelves', value: '5 × wire' },
      { label: 'Interior light', value: 'Yes' },
      { label: 'Mobility wheels', value: 'Yes' },
    ],
  },
  {
    group: 'Electrical',
    rows: [{ label: 'Voltage / Frequency', value: '220 V / 50 Hz' }],
  },
  {
    group: 'Dimensions',
    rows: [
      { label: 'Net dimensions (W×D×H)', value: '595 × 595 × 1995 mm' },
      { label: 'Packing dimensions (W×D×H)', value: '620 × 580 × 2000 mm' },
    ],
  },
]

const rfcColors = [
  { s: 'R', color: 'Red' },
  { s: 'BL', color: 'Blue' },
  { s: 'BK', color: 'Black' },
  { s: 'OR', color: 'Orange' },
  { s: 'S', color: 'Silver' },
]
const rfc380Products: Product[] = rfcColors.map((c) => {
  const model = `UN-RFC380${c.s}`
  const dir = 'Freezer/Showcase Freezer/UN-RFC380'
  const p1 = img(`${dir}/${model}.jpg`)
  const p2 = optionalImg(`${dir}/${model}2.jpg`)
  return {
    id: `freezer-showcase-${slug(model)}`,
    name: model,
    categoryId: 'fridge',
    series: `Showcase · ${c.color}`,
    type: 'Showcase',
    rating: 4.5,
    highlights: ['380 L glass-door cooler', '0–10 °C beverage cooling', 'R600a refrigerant', '5 wire shelves'],
    models: [model],
    image: p1,
    gallery: p2 ? [p1, p2] : [p1],
    specs: rfc380Specs(model, c.color),
  }
})

// VERO 4-Door refrigerators (500 L, No Frost, inverter) — four finishes sharing
// one spec sheet (factory BCD-500WTEP-53H). Three photos each.
const veroSpecs = (color: string): SpecGroup[] => [
  {
    group: 'Capacity',
    rows: [
      { label: 'Total net volume', value: '500 L' },
      { label: 'Fridge volume', value: '338 L' },
      { label: 'Freezer volume', value: '162 L' },
      { label: 'Freezing capacity', value: '9 kg / 24h' },
      { label: 'Freezing star rating', value: '4-star' },
      { label: 'Temperature rise time', value: '15 h' },
    ],
  },
  {
    group: 'General',
    rows: [
      { label: 'Factory model', value: 'BCD-500WTEP-53H-EUR(F)' },
      { label: 'Type', value: '4-Door Refrigerator' },
      { label: 'Colour / Finish', value: color },
      { label: 'Defrost', value: 'No Frost (frost-free)' },
      { label: 'Compressor', value: 'Inverter' },
      { label: 'Climate class', value: 'SN / N / ST / T' },
      { label: 'Refrigerant / amount', value: 'R600a / 72 g' },
      { label: 'Handle', value: 'Recessed' },
      { label: 'Control', value: 'Electronic · interior LED display' },
      { label: 'Interior light', value: 'LED' },
      { label: 'Shelves', value: 'Adjustable glass (chrome case)' },
      { label: 'Crisper drawer', value: 'Glassy' },
      { label: 'Door rack', value: 'Glassy' },
      { label: 'Modes', value: 'Fast Freezing · Smart Mode' },
    ],
  },
  {
    group: 'Energy',
    rows: [
      { label: 'Energy efficiency class', value: 'F (new EU standard)' },
      { label: 'Energy consumption', value: '0.591 kWh / 24h' },
      { label: 'Energy consumption (rated)', value: '1.241 kWh / 24h' },
    ],
  },
  {
    group: 'Electrical',
    rows: [
      { label: 'Rated voltage / frequency', value: '220–240 V / 50 Hz' },
      { label: 'Rated current', value: '1.6 A' },
      { label: 'Light power', value: '1 W' },
      { label: 'Defrost heater power', value: '220 W' },
    ],
  },
  {
    group: 'Dimensions & Loading',
    rows: [
      { label: 'Unit dimensions (W×D×H)', value: '820 × 673 × 1903 mm' },
      { label: 'Packing dimensions (W×D×H)', value: '882 × 709 × 1943 mm' },
      { label: "Loading quantity (40'HQ)", value: '52' },
    ],
  },
]
const veroColors = [
  { s: 'BK', color: 'Black (VCM)' },
  { s: 'W', color: 'White (PCM)' },
  { s: 'SS', color: 'Stainless Steel' },
  { s: 'SL', color: 'Look Silver (VCM)' },
]
const veroProducts: Product[] = veroColors.map((c) => {
  const model = `UN-4D50${c.s} VERO`
  const base = `Refrigerator/4door/VERO SERIES/${model}/${model}`
  return {
    id: `fridge-4door-${slug(model)}`,
    name: model,
    categoryId: 'fridge',
    series: `VERO Series · ${c.color}`,
    type: '4Door',
    rating: 4.7,
    ...(c.s === 'BK' ? { badge: 'No Frost' } : {}),
    highlights: ['500 L 4-Door · No Frost', 'Inverter compressor', 'Fast Freezing & Smart Mode', 'Adjustable glass shelves'],
    models: [model],
    image: img(`${base}.jpg`),
    gallery: [img(`${base}.jpg`), img(`${base}1.jpg`), img(`${base}2.jpg`)],
    specs: veroSpecs(c.color),
  }
})

// Nobel Series 21 L barrel vacuum — four colours sharing one spec sheet; each
// colour has a hero render plus five detail shots.
const nobelSpecs = (color: string): SpecGroup[] => [
  {
    group: 'General',
    rows: [
      { label: 'Series', value: 'Nobel Series' },
      { label: 'Type', value: 'Barrel / Drum Vacuum' },
      { label: 'Colour', value: color },
      { label: 'Dust capacity', value: '21 L' },
      { label: 'Power cord length', value: '5 m' },
      { label: 'Telescopic tube', value: 'Metal' },
      { label: 'Brush base', value: 'Steel' },
    ],
  },
  {
    group: 'Features',
    rows: [
      { label: 'Performance', value: 'High efficiency & high power' },
      { label: 'Blower function', value: 'Yes' },
      { label: 'Filtration system', value: 'Yes' },
      { label: 'Dust-full indicator', value: 'Yes' },
    ],
  },
  {
    group: 'Electrical',
    rows: [
      { label: 'Power input', value: '2800 W' },
      { label: 'Voltage / Frequency', value: 'AC 220–240 V, 50–60 Hz' },
    ],
  },
  {
    group: 'Dimensions & Weight',
    rows: [
      { label: 'Dimensions (H×W×D)', value: '387 × 340 × 445 mm' },
      { label: 'Net weight', value: '5.9 kg' },
    ],
  },
]
const nobelColors = [
  { name: 'Blue', hero: 'bl' },
  { name: 'Green', hero: 'g' },
  { name: 'Grey', hero: 'graye' },
  { name: 'White', hero: 'w' },
]
const nobelProducts: Product[] = nobelColors.map((c) => {
  const dir = `Vacuum Cleaner/${c.name}`
  const hero = img(`${dir}/${c.hero}.png`)
  const shots = ['01', '02', '03', '04', '05'].map((n) => img(`${dir}/${n}.jpg`))
  return {
    id: `vacuum-nobel-${slug(c.name)}`,
    name: `Nobel Series ${c.name}`,
    categoryId: 'vacuum',
    series: `Nobel Series · ${c.name}`,
    type: 'Barrel',
    rating: 4.5,
    ...(c.name === 'Blue' ? { badge: '2800 W' } : {}),
    highlights: ['21 L drum capacity', '2800 W high power', 'Blower function', 'Steel brush & metal telescopic tube'],
    models: [`Nobel Series ${c.name}`],
    image: hero,
    gallery: [hero, ...shots],
    specs: nobelSpecs(c.name),
  }
})

// Explicit products injected into a category alongside its auto-generated types.
const extraProducts: Record<string, Product[]> = {
  ac: [...acPistonProducts, ...acWindowProducts, ...acFloorProducts, ...acCassetteProducts],
  cooking: microwaveProducts,
  waterdispenser: waterDispenserProducts,
  vacuum: nobelProducts,
  fridge: [
    ...refrigeratorProducts,
    ...veroProducts,
    ...rftProducts,
    ...titanProducts,
    // Freezers live under "Refrigerators & Freezers" (types: Chest / Showcase / Upright Freezer).
    ...chestFreezerProducts,
    ...glassChestProducts,
    ...showcaseFreezerProducts,
    ...rfc380Products,
  ],
  laundry: washingMachineProducts,
  tv: tvProducts,
}

export const products: Product[] = categories.flatMap((cat) => {
  if (cat.id === 'dishwasher') return dishwasherProducts
  const types = categoryTypes[cat.id] ?? []
  const tags = categoryTags[cat.id] ?? []
  const image = categoryImage[cat.id] ?? placeholder(cat.name)
  const generated = types.map((type, i) => ({
    id: `${cat.id}-${slug(type)}`,
    name: type,
    categoryId: cat.id,
    series: cat.name,
    type,
    rating: 4.5,
    highlights: tags,
    ...(i === 0 && featuredBadge[cat.id] ? { badge: featuredBadge[cat.id] } : {}),
    image: categoryImage[cat.id] ? image : placeholder(type)
  }))
  return [...(extraProducts[cat.id] ?? []), ...generated]
})

// ---------------------------------------------------------------------------
// Category hero sliders — the cinematic banners shown at the top of each
// category listing page. Images are auto-discovered from
// src/images/Slides/<Folder>/ (see slideBanners in assets.ts): drop a banner
// into a category's folder and it appears in that category's slider. These are
// self-contained designed banners, so they're shown full-bleed with no text
// overlay. Categories with no banner images fall back to a gradient text slide
// built from the category name + tagline (handled in CategoryHero).
// ---------------------------------------------------------------------------

// Maps a category id (or 'all') to its Slides/<Folder> banner folder.
const bannerFolder: Record<string, string> = {
  all: 'Home',
  tv: 'TV',
  ac: 'AC',
  laundry: 'wm',
  dishwasher: 'Dishwasher',
  fridge: 'Refrigerator',
  waterheater: 'Water Heater',
  vacuum: 'Vacuum Cleaner',
  fan: 'Fan',
  solar: 'Solar',
  generator: 'Generator'
}

export function bannerSlides(categoryId: string): CategorySlide[] {
  const folder = bannerFolder[categoryId]
  const files = folder ? slideBanners[folder] ?? [] : []
  return files.map((f, i) => ({
    id: `${categoryId}-banner-${i}`,
    title: '',
    fit: 'contain', // show the whole banner, fit to the viewport (no crop)
    ...(f.video ? { video: f.url } : { image: f.url })
  }))
}

export const showcases: Showcase[] = [
  {
    id: 's-tv',
    eyebrow: 'Vision Series',
    title: 'See every detail in 4K',
    description: 'Crisp 4K UHD resolution, vivid color and a fast smart platform bring movies, sport and games to life on the big screen.',
    cta: 'Explore Televisions',
    link: '/products/tv',
    image: img('home_section/tv.png')
  },
  {
    id: 's-wm',
    eyebrow: 'VEVO Series',
    title: 'Laundry care, perfected',
    description: 'Inverter-driven front loaders run quieter and gentler, with steam refresh and auto-dosing that protect every fabric.',
    cta: 'Explore Washing Machines',
    link: '/products/laundry',
    image: img('home_section/wm.jpg')
  },
  {
    id: 's-fridge',
    eyebrow: 'FreshZone',
    title: 'Food that stays fresh for longer',
    description: 'Multi-air-flow cooling and a precision inverter compressor hold steady temperature and humidity on every shelf.',
    cta: 'Shop Refrigerators',
    link: '/products/fridge',
    image: img('home_section/ref.jpg')
  }
]

export const news: NewsItem[] = [
  { id: 'n1', category: 'Innovation', title: 'Uneva expands its 4K smart TV lineup for 2026', date: 'June 2026', image: img('TV/tv.jpg') },
  { id: 'n2', category: 'Home', title: 'Inside the FreshZone cooling system that keeps food fresher', date: 'May 2026', image: img('Refrigerator/Refrigerator.jpg') },
  { id: 'n3', category: 'Comfort', title: 'How ClimaSmart inverter AC cuts energy use at home', date: 'April 2026', image: img('Air_Conditioner/air_co.jpg') }
]

export const innovations: Innovation[] = [
  { id: 'smart', title: 'Smart Platform', description: 'A fast, app-rich smart system with voice control and seamless casting across your devices.', icon: '🧠' },
  { id: 'inverter', title: 'Inverter Core', description: 'Variable-speed motors that run quieter, cooler and more energy efficient, year after year.', icon: '⚡' },
  { id: 'fresh', title: 'FreshAir Cooling', description: 'Multi-vent airflow keeps temperature and humidity balanced on every shelf of your fridge.', icon: '❄️' },
  { id: 'care', title: 'Fabric Care', description: 'Gentle inverter wash, steam refresh and smart programs protect clothes load after load.', icon: '🧺' }
]
