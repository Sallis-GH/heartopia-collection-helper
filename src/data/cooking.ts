import type { CookingItem } from '../types'

export const cookingData: CookingItem[] = [
  // Salads
  { id: 'cook-001', name: 'House Salad', category: 'Salad', level: 1, recipePrice: null, ingredients: [{ name: 'Any Vegetable', quantity: 2 }], energy: [15, 18, 21, 24, null], starPrices: [90, 135, 180, 360, 720] },
  // Jams
  { id: 'cook-002', name: 'Mixed Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Any Fruit', quantity: 4 }], energy: [22, 26, 31, null, null], starPrices: [160, 240, 320, 640, 1280] },
  { id: 'cook-003', name: 'Blueberry Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Blueberry', quantity: 4 }], energy: [22, 26, null, null, null], starPrices: [170, 255, 340, 680, 1360] },
  { id: 'cook-004', name: 'Raspberry Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Raspberry', quantity: 4 }], energy: [null, 36, null, null, null], starPrices: [250, 375, 500, 1000, 2000] },
  { id: 'cook-005', name: 'Apple Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Apple', quantity: 4 }], energy: [35, 42, null, null, null], starPrices: [270, 405, 540, 1080, 2160] },
  { id: 'cook-006', name: 'Mandarin Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Mandarin', quantity: 4 }], energy: [35, 42, null, null, null], starPrices: [270, 405, 540, 1080, 2160] },
  { id: 'cook-007', name: 'Pineapple Jam', category: 'Jam', level: 4, recipePrice: null, ingredients: [{ name: 'Pineapple', quantity: 4 }], energy: [40, 48, 56, null, null], starPrices: [280, 420, 560, 1120, 2240] },
  { id: 'cook-008', name: 'Strawberry Jam', category: 'Jam', level: 6, recipePrice: null, ingredients: [{ name: 'Strawberry', quantity: 4 }], energy: [40, null, null, null, null], starPrices: [1580, 2370, 3160, 6320, 12640] },
  { id: 'cook-009', name: 'Grape Jam', category: 'Jam', level: 7, recipePrice: null, ingredients: [{ name: 'Grape', quantity: 4 }], energy: [40, null, null, null, null], starPrices: [2020, 3030, 4040, 8080, 16160] },
  // Sauces
  { id: 'cook-010', name: 'Tomato Sauce', category: 'Sauce', level: 1, recipePrice: null, ingredients: [{ name: 'Tomato', quantity: 4 }], energy: [35, 42, null, 56, null], starPrices: [180, 270, 360, 720, 1440] },
  { id: 'cook-011', name: 'Chocolate Sauce', category: 'Sauce', level: 12, recipePrice: null, ingredients: [{ name: 'Cocoa', quantity: 4 }], energy: [50, 60, null, null, null], starPrices: [400, 600, 800, 1600, 3200] },
  // Grilled Mushrooms
  { id: 'cook-012', name: 'Grilled Mushroom', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Any Mushroom', quantity: 4 }], energy: [15, null, null, null, null], starPrices: [180, 270, 360, 720, 1440] },
  { id: 'cook-013', name: 'Grilled Oyster Mushroom', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Oyster Mushroom', quantity: 4 }], energy: [15, 18, null, null, null], starPrices: [180, 270, 360, 720, 1440] },
  { id: 'cook-014', name: 'Grilled Shiitake', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Shiitake', quantity: 4 }], energy: [null, 18, null, null, null], starPrices: [180, 270, 360, 720, 1440] },
  { id: 'cook-015', name: 'Grilled Button Mushroom', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Button Mushroom', quantity: 4 }], energy: [15, 18, null, null, null], starPrices: [180, 270, 360, 720, 1440] },
  { id: 'cook-016', name: 'Grilled Penny Bun', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Penny Bun', quantity: 4 }], energy: [15, 18, null, null, null], starPrices: [180, 270, 360, 720, 1440] },
  // Cheese Cake (initial)
  { id: 'cook-017', name: 'Cheese Cake', category: 'Cake', level: 1, recipePrice: 100, ingredients: [{ name: 'Cheese', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Wheat', quantity: 1 }], energy: [50, 60, 70, null, null], starPrices: [480, 720, 960, 1920, 3840] },
  // Fish & Chips (initial)
  { id: 'cook-018', name: 'Fish & Chips', category: 'Main', level: 1, recipePrice: 100, ingredients: [{ name: 'Any Fish', quantity: 2 }, { name: 'Potato', quantity: 2 }], energy: [40, 48, null, null, null], starPrices: [310, 465, 620, 1240, 2480] },
  // Level 2
  { id: 'cook-019', name: 'Coffee', category: 'Drink', level: 2, recipePrice: 200, ingredients: [{ name: 'Coffee Beans', quantity: 4 }], energy: [40, null, null, null, null], starPrices: [290, 435, 580, 1160, 2320] },
  { id: 'cook-020', name: 'Original Roll Cake', category: 'Roll Cake', level: 2, recipePrice: 300, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Rainbow Sugar', quantity: 2 }], energy: [null, 42, 49, null, null], starPrices: [550, 825, 1100, 2200, 4400] },
  { id: 'cook-021', name: 'Smoked Fish Bagel', category: 'Main', level: 2, recipePrice: 200, ingredients: [{ name: 'Any Fish', quantity: 1 }, { name: 'Cheese', quantity: 1 }, { name: 'Any Vegetable', quantity: 1 }, { name: 'Wheat', quantity: 1 }], energy: [50, 60, null, null, null], starPrices: [520, 780, 1040, 2080, 4160] },
  { id: 'cook-022', name: 'Mushroom Pie', category: 'Pie', level: 2, recipePrice: 200, ingredients: [{ name: 'Any Mushroom', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, null, null, null], starPrices: [500, 750, 1000, 2000, 4000] },
  { id: 'cook-023', name: 'Oyster Mushroom Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Oyster Mushroom', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, null, null, null], starPrices: [500, 750, 1000, 2000, 4000] },
  { id: 'cook-024', name: 'Shiitake Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Shiitake', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, null, null, null], starPrices: [500, 750, 1000, 2000, 4000] },
  { id: 'cook-025', name: 'Button Mushroom Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Button Mushroom', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, 49, null, null], starPrices: [500, 750, 1000, 2000, 4000] },
  { id: 'cook-026', name: 'Penny Bun Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Penny Bun', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, 49, null, null], starPrices: [500, 750, 1000, 2000, 4000] },
  { id: 'cook-027', name: 'Latte', category: 'Drink', level: 2, recipePrice: null, ingredients: [{ name: 'Coffee Beans', quantity: 2 }, { name: 'Milk', quantity: 2 }], energy: [40, 48, null, null, null], starPrices: [300, 450, 600, 1200, 2400] },
  // Roll cake variants
  { id: 'cook-028', name: 'Red Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Red Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, 1140, 2280, 4560] },
  { id: 'cook-029', name: 'Orange Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Orange Sugar', quantity: 2 }], energy: [48, 58, null, 77, null], starPrices: [670, 1005, 1340, 2680, 5360] },
  { id: 'cook-030', name: 'Yellow Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Yellow Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, 1140, 2280, 4560] },
  { id: 'cook-031', name: 'Green Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Green Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, 1140, 2280, 4560] },
  { id: 'cook-032', name: 'Blue Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Blue Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, 1140, 2280, 4560] },
  { id: 'cook-033', name: 'Indigo Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Indigo Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, 1140, 2280, 4560] },
  { id: 'cook-034', name: 'Violet Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Violet Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, 1140, 2280, 4560] },
  // Level 3
  { id: 'cook-035', name: 'Seafood Risotto', category: 'Main', level: 3, recipePrice: 300, ingredients: [{ name: 'Any Seafood', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Tomato', quantity: 1 }], energy: [null, null, 56, 64, null], starPrices: [490, 735, 980, 1960, 3920] },
  { id: 'cook-036', name: 'Rustic Ratatouille', category: 'Main', level: 3, recipePrice: 300, ingredients: [{ name: 'Tomato', quantity: 1 }, { name: 'Potato', quantity: 1 }, { name: 'Lettuce', quantity: 1 }], energy: [60, 72, null, null, null], starPrices: [640, 960, 1280, 2560, 5120] },
  { id: 'cook-037', name: 'Black Truffle Cream Pasta', category: 'Pasta', level: 3, recipePrice: 400, ingredients: [{ name: 'Black Truffle', quantity: 1 }, { name: 'Wheat', quantity: 2 }, { name: 'Milk', quantity: 1 }], energy: [90, 108, null, null, null], starPrices: [900, 1350, 1800, 3600, 7200] },
  { id: 'cook-038', name: 'Black Truffle Pie', category: 'Pie', level: 3, recipePrice: null, ingredients: [{ name: 'Black Truffle', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [80, 96, null, null, null], starPrices: [830, 1245, 1660, 3320, 6640] },
  // Level 4
  { id: 'cook-039', name: 'Meat Sauce Pasta', category: 'Pasta', level: 4, recipePrice: 400, ingredients: [{ name: 'Meat', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Tomato', quantity: 1 }, { name: 'Cheese', quantity: 1 }], energy: [80, 96, 112, null, null], starPrices: [670, 1005, 1340, 2680, 5360] },
  { id: 'cook-040', name: 'Seafood Pizza', category: 'Pizza', level: 4, recipePrice: 500, ingredients: [{ name: 'Cheese', quantity: 1 }, { name: 'Tomato Sauce', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Any Fish', quantity: 1 }], energy: [70, 84, 98, null, null], starPrices: [780, 1170, 1560, 3120, 6240] },
  // Level 5
  { id: 'cook-041', name: 'Carrot Cake', category: 'Cake', level: 5, recipePrice: 500, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Carrot', quantity: 2 }], energy: [70, null, null, null, null], starPrices: [840, 1260, 1680, 3360, 6720] },
  { id: 'cook-042', name: 'Corn Soup', category: 'Soup', level: 5, recipePrice: 500, ingredients: [{ name: 'Milk', quantity: 1 }, { name: 'Butter', quantity: 1 }, { name: 'Corn', quantity: 2 }], energy: [80, null, 112, 128, null], starPrices: [1340, 2010, 2680, 5360, 10720] },
  { id: 'cook-043', name: 'Apple Pie', category: 'Pie', level: 5, recipePrice: 500, ingredients: [{ name: 'Apple', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }, { name: 'Butter', quantity: 1 }], energy: [70, 84, null, null, null], starPrices: [730, 1095, 1460, 2920, 5840] },
  // Level 6
  { id: 'cook-044', name: 'Tiramisu', category: 'Cake', level: 6, recipePrice: 600, ingredients: [{ name: 'Coffee', quantity: 1 }, { name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Cheese', quantity: 1 }], energy: [65, 78, null, 104, null], starPrices: [530, 795, 1060, 2120, 4240] },
  { id: 'cook-045', name: 'Deluxe Seafood Platter', category: 'Main', level: 6, recipePrice: 600, ingredients: [{ name: 'European Crayfish', quantity: 2 }, { name: 'Any Fish', quantity: 2 }], energy: [65, 78, null, null, null], starPrices: [410, 615, 820, 1640, 3280] },
  // Level 7
  { id: 'cook-046', name: 'Afternoon Tea', category: 'Cake', level: 7, recipePrice: 700, ingredients: [{ name: 'Tiramisu', quantity: 1 }, { name: 'Any Fruit', quantity: 1 }], energy: [20, 30, 35, 40, null], starPrices: [710, 1065, 1420, 2840, 5680] },
  { id: 'cook-047', name: 'Picnic Set', category: 'Special', level: 7, recipePrice: 800, ingredients: [{ name: 'Any Pizza', quantity: 1 }, { name: 'Any Pie', quantity: 1 }, { name: 'Fish & Chips', quantity: 1 }, { name: 'Any Beverage', quantity: 1 }], energy: [100, 140, 160, 200, null], starPrices: [2260, 3390, 4520, 9040, 18080] },
  // Level 8
  { id: 'cook-048', name: 'Crayfish Sashimi', category: 'Main', level: 8, recipePrice: 800, ingredients: [{ name: 'Any Shellfish', quantity: 3 }, { name: 'Lettuce', quantity: 1 }], energy: [30, 36, 42, 48, null], starPrices: [850, 1275, 1700, 3400, 6800] },
  { id: 'cook-049', name: 'Meat Burger', category: 'Main', level: 8, recipePrice: 800, ingredients: [{ name: 'Meat', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Lettuce', quantity: 1 }, { name: 'Any Sauce', quantity: 1 }], energy: [75, 90, 105, 120, 150], starPrices: [1350, 2025, 2700, 5400, 10800] },
  // Level 9
  { id: 'cook-050', name: 'Baked Eggplant with Meat', category: 'Main', level: 9, recipePrice: 900, ingredients: [{ name: 'Eggplant', quantity: 1 }, { name: 'Meat', quantity: 1 }, { name: 'Oil', quantity: 1 }, { name: 'Any Sauce', quantity: 1 }], energy: [75, 90, 105, null, null], starPrices: [1230, 1845, 2460, 4920, 9840] },
  { id: 'cook-051', name: 'Candlelight Dinner', category: 'Special', level: 9, recipePrice: 1000, ingredients: [{ name: 'Any Salad', quantity: 1 }, { name: 'Smoked Fish Bagel', quantity: 1 }, { name: 'Seafood Risotto', quantity: 1 }, { name: 'Tiramisu', quantity: 1 }], energy: [75, 90, 105, 120, 150], starPrices: [1760, 2640, 3520, 7040, 14080] },
  // Additional recipes
  { id: 'cook-052', name: 'Bizarre Food', category: 'Special', level: 1, recipePrice: null, ingredients: [{ name: 'Burned Dish', quantity: 1 }], energy: [5, null, null, null, null], starPrices: [10, 15, 20, 40, 80] },
  { id: 'cook-053', name: 'Bizarre Drink', category: 'Special', level: 1, recipePrice: null, ingredients: [{ name: 'Burned Drink', quantity: 1 }], energy: [5, null, null, null, null], starPrices: [10, 15, 20, 40, 80] },
]
