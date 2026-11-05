const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// 4th parameter is for the image path (folder + filename)
const mk = (category, rows, suffix = "") =>
  rows.map(([name, prices = [], options = [], imageName = null]) => ({
    id: slug(`${category}-${name}${suffix}`),
    name: name + suffix,
    description: "",
    prices,
    category,
    image_url: imageName ? `${imageName}` : null,
    is_available: true,
    is_new: false,
    options,
  }));

const CATEGORIES = [
  "All Day Breakfast",
  "Waffle",
  "Bread and Pastries",
  "Snacks",
  "Pasta",
  "Wings/Fries",
  "Hot Coffee",
  "Iced Coffee",
  "Smoke Series",
  "Non-Espresso",
  "Frappe",
  "Soda & Tea",
];

const SIZE_LABELS = ["Regular", "Large"];

const PRODUCTS = [
  ...mk("All Day Breakfast", [
    ["Liempisilog", [140], [], "images/ALL_DAY_BREAKFAST/liempisilog.webp"],
    ["Hungariansilog", [140], [], null],
    ["Spamsilog", [140], [], "images/ALL_DAY_BREAKFAST/spamsilog.webp"],
    ["Tocilog", [140], [], null],
    ["Chicksilog", [150], [], "images/ALL_DAY_BREAKFAST/chicksilog.webp"],
    ["Tapsilog", [150], [], "images/ALL_DAY_BREAKFAST/tapsilog.webp"],
    [
      "Chicken Ala King",
      [190],
      [],
      "images/ALL_DAY_BREAKFAST/chicken-ala-king.webp",
    ],
    ["American Breakfast", [240], [], null],
  ]),
  ...mk("Waffle", [
    ["Biscoff Waffle", [160], [], "images/SPECIAL_WAFFLE/waffle-biscoff.webp"],
    [
      "Chocolate Oreo Waffle",
      [160],
      [],
      "images/SPECIAL_WAFFLE/waffle-chocolate-oreo.webp",
    ],
    [
      "Strawberry Waffle",
      [160],
      [],
      "images/SPECIAL_WAFFLE/waffle-strawberry.webp",
    ],
    [
      "Pistachio Waffle",
      [160],
      [],
      "images/SPECIAL_WAFFLE/waffle-pistachio.webp",
    ],
    ["Nutella Waffle", [160], [], "images/SPECIAL_WAFFLE/waffle-nutella.webp"],
    ["Blueberry Waffle", [160], [], null],
  ]),
  ...mk("Bread and Pastries", [
    ["Cookies", [0], [], "images/BREAD_AND_PASTRY/cookies.webp"],
    ["Brownies", [0], [], "images/BREAD_AND_PASTRY/brownies.webp"],
    ["Biscoff Cake", [0], [], "images/BREAD_AND_PASTRY/biscoff-cake.webp"],
    [
      "Blueberry Cheesecake",
      [0],
      [],
      "images/BREAD_AND_PASTRY/blueberry-cheesecake.webp",
    ],
    ["Leche Flan", [0], [], "images/BREAD_AND_PASTRY/leche-flan.webp"],
  ]),
  ...mk("Snacks", [
    ["Spam & Fries", [130], [], null],
    ["Cheesy Bacon Fries", [150], [], null],
    ["Chicken Poppers", [160], [], null],
    ["Chick & Fries", [160], [], null],
    ["Cheesy Meaty Fries", [190], [], null],
    ["Salchipapa", [160], [], null],
    [
      "Chicken Fingers",
      [190],
      [],
      "images/SPECIAL_SNACKS/chicken-fingers.webp",
    ],
    ["Bangbang Tofu", [170], [], null],
    ["Fiesta Trio", [250], [], null],
    ["Fiesta Nachos", [270], [], null],
  ]),
  ...mk("Pasta", [
    [
      "Creamy Sausage",
      [220],
      [],
      "images/PASTA_AND_NOODLES/creamy-sausage.webp",
    ],
    [
      "Chicken Truffle",
      [220],
      [],
      "images/PASTA_AND_NOODLES/chicken-truffle.webp",
    ],
    ["Chicken Pesto", [220], [], "images/PASTA_AND_NOODLES/chicken-pesto.webp"],
    [
      "Spicy Korean Pasta",
      [220],
      [],
      "images/PASTA_AND_NOODLES/spicy-korean-pasta.webp",
    ],
    ["Pasta Negra", [250], [], null],
    ["Aglio Olio", [250], [], null],
    ["Lasagna Fritta", [260], [], null],
  ]),
  ...mk("Wings/Fries", [
    [
      "6-pc Chicken Wings",
      [180],
      [
        "Cheese",
        "Teriyaki",
        "Sweet Chili",
        "Honey Garlic",
        "Honey Butter",
        "Salted Egg",
        "Spiced Maple",
        "Honey Mustard",
        "Soy Garlic",
        "Lemon Glaze",
        "Yang Nyeom",
      ],
      "images/SPECIAL_SNACKS/chicken-wings.webp",
    ],
    ["French Fries", [95], [], "images/SPECIAL_SNACKS/french-fries.webp"],
  ]),
  ...mk("Hot Coffee", [
    ["Americano", [80], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Café Latte", [80], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Salted Caramel", [90], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Hazelnut Latte", [90], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["White Mocha", [90], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Spanish Latte", [100], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Caramel Macchiato", [100], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Hot Oat Latte", [100], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Hot Biscoff Latte", [130], [], "images/HOT_COFFEE/hot-coffee.webp"],
    ["Hot Chocolate", [90], [], "images/HOT_COFFEE/hot-chocolate.webp"],
  ]),
  ...mk("Iced Coffee", [
    [
      "Americano",
      [90, 100],
      [],
      "images/ICE_COFFEE_REGULAR/iced-americano.webp",
    ],
    ["Café Latte", [90, 100], [], "images/ICE_COFFEE_REGULAR/iced-latte.webp"],
    [
      "Salted Caramel",
      [130, 140],
      [],
      "images/ICE_COFFEE_REGULAR/iced-latte.webp",
    ],
    [
      "Hazelnut Latte",
      [130, 140],
      [],
      "images/ICE_COFFEE_REGULAR/iced-latte.webp",
    ],
    [
      "French Vanilla Latte",
      [130, 140],
      [],
      "images/ICE_COFFEE_REGULAR/iced-latte.webp",
    ],
    [
      "White Mocha",
      [130, 140],
      [],
      "images/ICE_COFFEE_REGULAR/iced-mocha.webp",
    ],
    [
      "Spanish Latte",
      [140, 150],
      [],
      "images/ICE_COFFEE_REGULAR/iced-spanish-latte.webp",
    ],
    [
      "Dirty Matcha",
      [90, 110],
      [],
      "images/ICE_COFFEE_REGULAR/iced-dirty-matcha.webp",
    ],
    [
      "Signature Coffee",
      [140, 160],
      [],
      "images/ICE_COFFEE_REGULAR/iced-latte.webp",
    ],
    [
      "Barista Drink",
      [155, 175],
      [],
      "images/ICE_COFFEE_REGULAR/iced-latte.webp",
    ],
    [
      "Macadamia Nut Latte",
      [155, 175],
      [],
      "images/ICE_COFFEE_REGULAR/iced-latte.webp",
    ],
    [
      "Caramel Macchiato",
      [130, 140],
      [],
      "images/SPECIAL_COFFEE/iced-caramel-macchiato.webp",
    ],
    [
      "Himalayan Salt Cream",
      [155, 175],
      [],
      "images/SPECIAL_COFFEE/iced-himalayan-salt-cream.webp",
    ],
    [
      "Caramel Toffee Nut Latte",
      [155, 175],
      [],
      "images/SPECIAL_COFFEE/iced-caramel-toffee-nut.webp",
    ],
    [
      "Salted Caramel Punch",
      [175],
      [],
      "images/SPECIAL_COFFEE/iced-salted-caramel-punch.webp",
    ],
  ]),
  ...mk("Smoke Series", [
    ["Salted Caramel", [160], [], null],
    ["Chocolate", [160], [], null],
    ["French Vanilla", [160], [], null],
  ]),
  ...mk("Non-Espresso", [
    [
      "Matcha Latte",
      [90, 130],
      [],
      "images/DRINKS_W_O_COFFEE/matcha-latte.webp",
    ],
    ["Chocolate", [90, 130], [], "images/DRINKS_W_O_COFFEE/chocolate.webp"],
    ["Ube Latte", [90, 130], [], "images/DRINKS_W_O_COFFEE/ube-latte.webp"],
    [
      "Strawberry Latte",
      [100, 140],
      [],
      "images/DRINKS_W_O_COFFEE/nom-yen-pink-milk.webp",
    ],
    ["Oreo Latte", [130, 150], [], "images/DRINKS_W_O_COFFEE/oreo-latte.webp"],
    [
      "Nom-Yen Pink Milk",
      [120, 140],
      [],
      "images/DRINKS_W_O_COFFEE/nom-yen-pink-milk.webp",
    ],
    [
      "Strawberry Matcha Latte",
      [130, 140],
      [],
      "images/DRINKS_W_O_COFFEE/strawberry-matcha-latte.webp",
    ],
  ]),
  ...mk(
    "Frappe",
    [
      ["Avocado", [150, 160], [], null],
      ["Matcha", [150, 160], [], "images/FRAPPE_NON_COFFEE/matcha-frappe.webp"],
      [
        "Java Chip Cream",
        [150, 160],
        [],
        "images/FRAPPE_NON_COFFEE/java-chip-frappe.webp",
      ],
      ["Ube Cheese", [150, 160], [], null],
      ["Avocado Graham", [150, 160], [], null],
      ["Salted Caramel", [150, 160], [], null],
      [
        "Biscoff",
        [170, 190],
        [],
        "images/FRAPPE_NON_COFFEE/biscoff-frappe.webp",
      ],
      ["Blueberry Cheesecake", [170, 190], [], null],
      [
        "Strawberry Cream",
        [170, 190],
        [],
        "images/FRAPPE_NON_COFFEE/strawberry-cream-frappe.webp",
      ],
      ["Cashew Praline", [170, 190], [], null],
      ["Red Velvet", [170, 190], [], null],
      ["Cheesy Mango Cheesecake", [170, 190], [], null],
      [
        "Red Dragonfruit",
        [170, 190],
        [],
        "images/FRAPPE_NON_COFFEE/red-dragonfruit-frappe.webp",
      ],
      [
        "Cheesy Dragon Fruit",
        [175, 195],
        [],
        "images/FRAPPE_NON_COFFEE/red-dragonfruit-frappe.webp",
      ],
      [
        "Mixed Berries",
        [175, 195],
        [],
        "images/FRAPPE_NON_COFFEE/mixed-berries-frappe.webp",
      ],
    ],
    " Frappe",
  ),
  ...mk("Soda & Tea", [
    [
      "Strawberry Soda",
      [110, 130],
      [],
      "images/JUICE_AND_TEA/strawberry-soda.webp",
    ],
    ["Blueberry Soda", [110, 130], [], null],
    ["Peach Soda", [110, 130], [], null],
    [
      "Blue Ocean Soda",
      [110, 130],
      [],
      "images/JUICE_AND_TEA/blue-ocean-soda.webp",
    ],
    ["Lychee Fizz", [90, 100], [], "images/JUICE_AND_TEA/lychee-fizz.webp"],
    [
      "House-Blend Iced Tea",
      [90, 100],
      [],
      "images/JUICE_AND_TEA/house-blend-iced-tea.webp",
    ],
    [
      "Passion Fruit Tea",
      [90, 100],
      [],
      "images/JUICE_AND_TEA/passion-fruit-tea.webp",
    ],
    ["Hibiscus Tea", [120, 130], [], null],
    ["Lemon Yakult", [120, 130], [], "images/JUICE_AND_TEA/lemon-yakult.webp"],
  ]),
];

const FEATURED_IDS = [
  "all-day-breakfast-chicken-ala-king",
  "frappe-biscoff-frappe",
  "pasta-lasagna-fritta",
  "iced-coffee-spanish-latte",
];

//Staff
const staffDatabase = [
  { name: "Maria Clara", password: "staff123" },
  { name: "Crisostomo Ibarra", password: "staff456" },
];
