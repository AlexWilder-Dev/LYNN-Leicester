// Everything the site says about LYNN lives here: contact, hours, menus, quotes, photos.
// Sources are noted per block. Where a price or time isn't published, it is left out.

export const BASE = import.meta.env.BASE_URL

export const info = {
  name: 'LYNN',
  address: ['14 St Martins Square', 'Leicester', 'LE1 5DF'],
  addressLine: '14 St Martins Square, Leicester LE1 5DF',
  phoneDisplay: '07342 375899',
  phoneHref: 'tel:+447342375899',
  instagram: { handle: '@lynn_leics', url: 'https://www.instagram.com/lynn_leics/' },
  // Google "Reserve a table" (SevenRooms) and Google Maps place for LYNN.
  bookingUrl: 'https://www.google.com/maps/reserve/v/dine/c/G3iEjmYOmx4',
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ4dokyYthd0gRAsoB7H4nNlo',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=LYNN%2C%2014%20St%20Martins%20Square%2C%20Leicester%20LE1%205DF&destination_place_id=ChIJ4dokyYthd0gRAsoB7H4nNlo',
}

// Opening hours from LYNN's Google listing. Minutes after midnight; null = closed.
// Index 0 = Sunday, matching Date.getDay().
export type Day = { name: string; short: string; open: number | null; close: number | null }

const t = (h: number, m = 0) => h * 60 + m

export const week: Day[] = [
  { name: 'Sunday', short: 'Sun', open: t(10), close: t(16, 30) },
  { name: 'Monday', short: 'Mon', open: t(9, 30), close: t(16, 30) },
  { name: 'Tuesday', short: 'Tue', open: null, close: null },
  { name: 'Wednesday', short: 'Wed', open: t(9, 30), close: t(16, 30) },
  { name: 'Thursday', short: 'Thu', open: t(9, 30), close: t(16, 30) },
  { name: 'Friday', short: 'Fri', open: t(9, 30), close: t(21, 30) },
  { name: 'Saturday', short: 'Sat', open: t(9, 30), close: t(21, 30) },
]

// What's on when. Brunch to 15:00 every open day (Be-Lavie, Instagram bio).
// Dinner and cocktails on Friday and Saturday evenings (Instagram bio). The start of
// dinner service isn't published; EVENING is only where the site turns the lights down.
export const service = {
  brunchEnd: t(15),
  dinnerDays: [5, 6],
  roastDay: 0,
  evening: t(17),
}

export const words = ['Coffee', 'Brunch', 'Cocktails', 'Dinner'] as const
export type Word = (typeof words)[number]

export type Photo = { src: string; alt: string; w: number; h: number }
const p = (file: string, alt: string, w: number, h: number): Photo => ({ src: `${BASE}photos/${file}`, alt, w, h })

// All photos are LYNN's own: owner uploads on Google and posts on @lynn_leics.
export const photos = {
  windowNight: p('window-night.jpg', 'LYNN at night from St Martins Square: the brushed Lynn sign over the door, globe lights on inside', 1600, 1200),
  terraceDay: p('terrace-day.jpg', 'A glass of herbal tea on the terrace, with the LYNN chalkboard by the door', 900, 1600),
  counter: p('counter.jpg', 'The cannoli cabinet at LYNN, with handwritten flavour cards', 1600, 1170),
  caprese: p('caprese-focaccia.jpg', 'Caprese sandwich on homemade focaccia', 900, 1220),
  matchaSquare: p('matcha-square.jpg', 'Iced strawberry matcha held up outside LYNN', 900, 1194),
  matchaLayers: p('matcha-layers.jpg', 'Two iced matcha lattes', 900, 1193),
  porkBelly: p('pork-belly.jpg', 'Braised pork belly', 900, 1200),
  carrots: p('bbq-carrots.jpg', 'BBQ carrots', 900, 1194),
  prawns: p('sauteed-prawns.jpg', 'Sautéed prawns', 900, 1200),
  starter: p('starter-plate.jpg', 'A starter plate at dinner', 900, 1194),
  pass: p('dinner-pass.jpg', 'A dinner plate on the pass', 900, 1200),
  wings: p('dinner-wings.jpg', 'A dinner plate', 900, 1200),
  roast: p('sunday-roast.jpg', 'Sunday roast at LYNN: Yorkshire pudding, roast potatoes, greens and a glass of red', 899, 1220),
}

// The cannoli cabinet. Flavour names as written on LYNN's own cards in the owner photo.
// fx/fy: where that tray sits in the photo (0–1).
export const cannoli = [
  { name: 'Zabaglione', note: 'Italian custard', fx: 0.18, fy: 0.13 },
  { name: 'Hazelnut', note: null, fx: 0.62, fy: 0.13 },
  { name: 'Lemon', note: null, fx: 0.25, fy: 0.38 },
  { name: 'Pistachio', note: null, fx: 0.67, fy: 0.5 },
  { name: 'Salted Caramel', note: null, fx: 0.27, fy: 0.72 },
]

export type MenuItem = { name: string; desc?: string; price?: string; tag?: string }
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }
export type Menu = { id: string; label: string; when: string; intro?: string; groups: MenuGroup[] }

export const menus: Menu[] = [
  {
    id: 'brunch',
    label: 'Brunch',
    when: 'Until 15:00, every day but Tuesday. Walk in.',
    // Be-Lavie guide (Sep 2026), Google reviews. Prices aren't published online.
    groups: [
      {
        title: 'On sourdough',
        items: [
          { name: 'Smashed avocado', desc: 'Toasted sourdough, tomato salsa, poached egg, hollandaise, micro herbs' },
          { name: 'Eggs Benedict', desc: 'With smoked salmon if you like' },
          { name: 'Scrambled tofu', desc: 'With tomatoes on sourdough' },
          { name: 'Hummus & roasted vegetables', desc: 'Mediterranean roasted vegetables on toasted sourdough' },
        ],
      },
      {
        title: 'And',
        items: [
          { name: 'Loaded hash browns' },
          { name: 'Breakfast rolls' },
          { name: 'Fresh croissants & pain au chocolat' },
        ],
      },
    ],
  },
  {
    id: 'counter',
    label: 'Counter',
    when: 'Coffee, the cannoli cabinet and lunch from the counter.',
    // Owner photo (cannoli cards), Instagram (Caprese), Be-Lavie, Google reviews.
    groups: [
      {
        title: 'Cannoli',
        items: [
          { name: 'Zabaglione', desc: 'Italian custard' },
          { name: 'Hazelnut' },
          { name: 'Lemon' },
          { name: 'Pistachio' },
          { name: 'Salted Caramel' },
        ],
      },
      {
        title: 'Lunch',
        items: [
          { name: 'Caprese focaccia', desc: 'Mozzarella, tomatoes, pesto and mixed leaf on homemade focaccia', tag: 'v' },
          { name: 'Toasties', desc: 'With cheese and onion crisps and a side salad' },
          { name: 'Sausage rolls' },
          { name: 'Arancini' },
          { name: 'Pastries' },
        ],
      },
      {
        title: 'To drink',
        items: [
          { name: 'Coffee' },
          { name: 'Matcha latte', desc: 'Hot or iced, or iced with strawberry' },
          { name: 'Herbal teas' },
        ],
      },
    ],
  },
  {
    id: 'dinner',
    label: 'Dinner',
    when: 'Friday & Saturday evenings, until 21:30. Book ahead.',
    intro: 'Small plates and larger plates from the open kitchen. These are dishes from recent services.',
    // Instagram (4 Oct 2026) and a Google review. Prices aren't published online.
    groups: [
      {
        title: 'Small plates',
        items: [
          { name: 'Braised pork belly' },
          { name: 'BBQ carrots' },
          { name: 'Sautéed prawns' },
          { name: 'Smoked beetroot & goats cheese' },
        ],
      },
      { title: 'Larger plates', items: [{ name: 'Braised beef cheek' }, { name: 'Vegetable lasagne' }] },
      { title: 'Afters', items: [{ name: 'Hibiscus parfait' }, { name: 'Lemon tart' }] },
    ],
  },
  {
    id: 'sunday',
    label: 'Sunday',
    when: 'Sundays. Book your table.',
    intro: 'Crispy roasties, golden Yorkshire puddings, tender meat, lashings of gravy and all the trimmings.',
    groups: [],
  },
  {
    id: 'christmas',
    label: 'Christmas',
    when: '25 November – 24 December 2026, by booking.',
    intro: '2 courses £30 · 3 courses £35',
    // LYNN Restaurant Christmas Dinner Menu, Instagram 8 Oct 2026.
    groups: [
      {
        title: 'Starters',
        items: [
          { name: 'Brie & Cranberry Croquettes', desc: 'Bitter leaf salad, cranberry jam' },
          { name: 'Roasted Tomato and Red Pepper Soup', desc: 'With bread & butter', tag: 'vg' },
          { name: 'Lime & Chilli Prawns', desc: 'Served on sourdough' },
          { name: 'Smoked Salmon', desc: 'Dill crème fraîche, capers, pickled cucumber' },
          { name: 'Chicken Liver Paté', desc: 'With bread & butter, cranberry jam' },
          { name: 'Mushroom Arancini', desc: 'With parmesan and truffle' },
        ],
      },
      {
        title: 'Main course',
        items: [
          { name: 'Herb-Roasted Turkey', desc: 'Sage & onion stuffing, pigs in blankets, seasonal vegetables, cranberry sauce' },
          { name: 'Pork Belly', desc: 'New potatoes, sautéed cabbage, apple & mustard jus' },
          { name: 'Roasted Chicken Breast', desc: 'Tenderstem broccoli, potato terrine, chicken jus' },
          { name: 'Tandoori Cauliflower', desc: 'New potatoes, tenderstem broccoli' },
          { name: 'Duo of Lamb', desc: 'Potato terrine, sautéed cabbage, nutloaf' },
        ],
      },
      {
        title: 'Dessert',
        items: [
          { name: 'Christmas Pudding Parfait', desc: 'Rum & raisin ice cream' },
          { name: 'Lemon Tart', desc: 'Torched meringue, winter berries' },
          { name: 'Chocolate Brownie', desc: 'Vanilla ice cream' },
          { name: 'British Cheese Board', desc: 'Selection of cheese, crackers, chutney & grapes' },
        ],
      },
      {
        title: 'Sides',
        note: '£4 each',
        items: [{ name: 'Chips' }, { name: 'Seasonal Greens' }, { name: 'Roast Potatoes' }],
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    when: 'Cocktails, wine, spirits, beer and soft drinks.',
    // LYNN drinks menu, owner upload on Google.
    groups: [
      {
        title: 'Cocktails',
        note: '£10 each',
        items: [
          { name: 'Honey Daiquiri', desc: 'Gold rum, honey, lime, orange' },
          { name: 'Raspberry & Lime Mojito', desc: 'White rum, mint, lime, raspberry, prosecco' },
          { name: 'Aperol Spritz', desc: 'Aperol, prosecco, soda' },
          { name: 'Passionfruit Margarita', desc: 'Tequila, Passoa, lime, orange' },
          { name: 'Limoncello Spritz', desc: 'Limoncello, prosecco, soda' },
          { name: 'Praline Espresso Martini', desc: 'Vodka, Kahlua, espresso, praline syrup' },
        ],
      },
      {
        title: 'White',
        items: [
          { name: 'Organic Pinot Grigio', price: '£6.20 / £8.20 / £24' },
          { name: 'Silver Ghost Sauvignon Blanc', price: '£6.50 / £8.50 / £28' },
          { name: 'Chardonnay', price: '£6.25 / £8.25 / £26' },
        ],
      },
      {
        title: 'Red',
        items: [
          { name: 'Silver Ghost Cabernet Sauvignon', price: '£6.50 / £8.50 / £26' },
          { name: 'LB7 Vinho Verde', price: '£6.70 / £8.70 / £28' },
          { name: 'Naudin Pinot Noir', price: '£6.50 / £8.50 / £28' },
          { name: 'Surani Costarossa Primitivo di Manduria', price: '£32' },
        ],
      },
      {
        title: 'Rosé',
        items: [
          { name: 'LB7 Vinho Verde', price: '£6.50 / £8.50 / £28' },
          { name: 'Organic Pinot Grigio Rosé', price: '£6.20 / £8.20 / £24' },
        ],
      },
      {
        title: 'Spirits',
        note: '£4.50 / £7.50',
        items: [
          { name: 'Vodka' },
          { name: 'Vanilla vodka' },
          { name: 'Bacardi' },
          { name: 'Kingston Gold Rum' },
          { name: 'Jura' },
          { name: 'Disaronno' },
          { name: 'Gin' },
          { name: 'Pink gin' },
          { name: 'Tequila' },
          { name: 'Limoncello' },
        ],
      },
      {
        title: 'Beer & cider',
        note: 'By the bottle',
        items: [
          { name: 'Peroni', desc: '330ml', price: '£5' },
          { name: 'Corona', desc: '330ml', price: '£5.25' },
          { name: 'Cherry & Pineapple Cider', desc: '500ml', price: '£4.50' },
        ],
      },
      {
        title: 'Soft drinks',
        items: [
          { name: 'Coke', price: '£3' },
          { name: 'Coke Zero', price: '£3' },
          { name: 'Lemonade', price: '£3' },
          { name: 'Juice', desc: 'Apple or orange', price: '£2.75' },
          { name: 'Soda water', price: '£2.50' },
        ],
      },
    ],
  },
]

// Chalked on the A-board outside, as posted on Instagram 15 Oct 2026.
export const board = { lines: ['Cocktails', '2 for £14'], footer: 'Iced matcha' }

// Real words, credited. Google reviews and the guides that wrote about LYNN.
export const quotes = {
  visitLeicester: { text: 'a café by day and Bistro by night', who: 'Visit Leicester' },
  belavieCannoli: {
    text: 'some of the best Sicilian lemon Cannoli and arancini you’re likely to have in the centre of Leicester',
    who: 'Be-Lavie',
  },
  belavieChefs: { text: 'From the chefs that brought Leicester the former 2 Rosette Restaurant 263', who: 'Be-Lavie' },
  belavieIykyk: { text: 'one of those, if you know, you know places, so go early on weekends', who: 'Be-Lavie' },
  avo: { text: 'The best and tastiest avo and eggs on toast I’ve had.', who: 'Adele Amor, Google review' },
  openKitchen: {
    text: 'A small intimate setting where you can see the chefs prepare your food, they also bring it over to you which is a nice touch.',
    who: 'Rose MN, Google review',
  },
  rare: { text: 'It’s very rare to have good food, good atmosphere and good service.', who: 'Rose MN, Google review' },
  sunday: { text: 'the best Sunday lunch in the city', who: 'kay hewitt, Google review' },
  value: { text: 'The prices are excellent for the quality and taste of the food', who: 'Dylan Uppal, Google review' },
}

// LYNN's own words, from their Instagram captions and Google posts.
export const voice = {
  sunday: 'Sunday plans? Sorted.',
  sundayMore: 'Gather your favourite people, leave the washing-up to us, and make this Sunday one to remember.',
  matcha: 'Whether you prefer it hot or iced, Lynn will make sure it tastes great.',
  tea: 'Tea Season is here. Why not come and warm your hands on a delicious mug of tea and pair it with a hearty Brunch meal.',
  caprese: 'A fresh Caprese sandwich on homemade focaccia bread, the perfect way to start a day!',
  starters: 'Starter plates crafted just as beautifully as the mains.',
  bookNow: 'So why not get booked in now?',
  parties: 'We are happy to host parties big and small. Includes vegetarian options so there’s something for everyone.',
  seeYou: 'Can’t wait to see you all.',
}
