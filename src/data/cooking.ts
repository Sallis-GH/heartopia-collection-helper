import type { CookingItem } from '../types'

export const cookingData: CookingItem[] = [
  // Salads
  { id: 'cook-001', name: 'House Salad', category: 'Salad', level: 1, recipePrice: null, ingredients: [{ name: 'Any Vegetable', quantity: 2 }], energy: [15, 18, 21, 24, null], starPrices: [90, 135, 180, 360, null] },
  // Jams
  { id: 'cook-002', name: 'Mixed Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Any Fruit', quantity: 4 }], energy: [22, 26, 31, null, null], starPrices: [160, 240, 320, null, null] },
  { id: 'cook-003', name: 'Blueberry Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Blueberry', quantity: 4 }], energy: [22, 26, null, null, null], starPrices: [170, 255, 340, null, null] },
  { id: 'cook-004', name: 'Raspberry Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Raspberry', quantity: 4 }], energy: [null, 36, null, null, null], starPrices: [250, 375, null, null, null] },
  { id: 'cook-005', name: 'Apple Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Apple', quantity: 4 }], energy: [35, 42, null, null, null], starPrices: [270, 405, 540, null, null] },
  { id: 'cook-006', name: 'Mandarin Jam', category: 'Jam', level: 1, recipePrice: null, ingredients: [{ name: 'Mandarin', quantity: 4 }], energy: [35, 42, null, null, null], starPrices: [270, 405, 540, null, null] },
  { id: 'cook-007', name: 'Pineapple Jam', category: 'Jam', level: 4, recipePrice: null, ingredients: [{ name: 'Pineapple', quantity: 4 }], energy: [40, 48, 56, null, null], starPrices: [280, 420, 560, null, null] },
  { id: 'cook-008', name: 'Strawberry Jam', category: 'Jam', level: 6, recipePrice: null, ingredients: [{ name: 'Strawberry', quantity: 4 }], energy: [40, null, null, null, null], starPrices: [1580, null, null, null, null] },
  // Sauces
  { id: 'cook-009', name: 'Tomato Sauce', category: 'Sauce', level: 1, recipePrice: null, ingredients: [{ name: 'Tomato', quantity: 4 }], energy: [35, 42, null, 56, null], starPrices: [180, 270, 360, 720, null] },
  { id: 'cook-010', name: 'Chocolate Sauce', category: 'Sauce', level: 12, recipePrice: null, ingredients: [{ name: 'Cocoa', quantity: 4 }], energy: [50, 60, null, null, null], starPrices: [400, 600, null, null, null] },
  // Grilled Mushrooms
  { id: 'cook-011', name: 'Grilled Mushroom', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Any Mushroom', quantity: 4 }], energy: [15, null, null, null, null], starPrices: [180, null, null, null, null] },
  { id: 'cook-012', name: 'Grilled Oyster Mushroom', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Oyster Mushroom', quantity: 4 }], energy: [15, 18, null, null, null], starPrices: [180, 270, null, null, null] },
  { id: 'cook-013', name: 'Grilled Shiitake', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Shiitake', quantity: 4 }], energy: [null, 18, null, null, null], starPrices: [null, 270, null, null, null] },
  { id: 'cook-014', name: 'Grilled Button Mushroom', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Button Mushroom', quantity: 4 }], energy: [15, 18, null, null, null], starPrices: [180, 270, null, null, null] },
  { id: 'cook-015', name: 'Grilled Penny Bun', category: 'Grill', level: 1, recipePrice: null, ingredients: [{ name: 'Penny Bun', quantity: 4 }], energy: [15, 18, null, null, null], starPrices: [180, 270, null, null, null] },
  // Cheese Cake (initial)
  { id: 'cook-016', name: 'Cheese Cake', category: 'Cake', level: 1, recipePrice: 100, ingredients: [{ name: 'Cheese', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Wheat', quantity: 1 }], energy: [50, 60, 70, null, null], starPrices: [480, 720, 960, null, null] },
  // Fish & Chips (initial)
  { id: 'cook-017', name: 'Fish & Chips', category: 'Main', level: 1, recipePrice: 100, ingredients: [{ name: 'Any Fish', quantity: 2 }, { name: 'Potato', quantity: 2 }], energy: [40, 48, null, null, null], starPrices: [310, 465, 620, null, null] },
  // Level 2
  { id: 'cook-018', name: 'Coffee', category: 'Drink', level: 2, recipePrice: 200, ingredients: [{ name: 'Coffee Beans', quantity: 4 }], energy: [40, null, null, null, null], starPrices: [290, null, null, null, null] },
  { id: 'cook-019', name: 'Original Roll Cake', category: 'Roll Cake', level: 2, recipePrice: 300, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Rainbow Sugar', quantity: 2 }], energy: [null, 42, 49, null, null], starPrices: [550, 825, 1100, null, null] },
  { id: 'cook-020', name: 'Smoked Fish Bagel', category: 'Main', level: 2, recipePrice: 200, ingredients: [{ name: 'Any Fish', quantity: 1 }, { name: 'Cheese', quantity: 1 }, { name: 'Any Vegetable', quantity: 1 }, { name: 'Wheat', quantity: 1 }], energy: [50, 60, null, null, null], starPrices: [520, 780, null, null, null] },
  { id: 'cook-021', name: 'Mushroom Pie', category: 'Pie', level: 2, recipePrice: 200, ingredients: [{ name: 'Any Mushroom', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, null, null, null], starPrices: [500, 750, null, null, null] },
  { id: 'cook-022', name: 'Oyster Mushroom Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Oyster Mushroom', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, null, null, null], starPrices: [500, 750, null, null, null] },
  { id: 'cook-023', name: 'Shiitake Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Shiitake', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, null, null, null], starPrices: [500, 750, null, null, null] },
  { id: 'cook-024', name: 'Button Mushroom Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Button Mushroom', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, 49, null, null], starPrices: [500, 750, 1000, null, null] },
  { id: 'cook-025', name: 'Penny Bun Pie', category: 'Pie', level: 2, recipePrice: null, ingredients: [{ name: 'Penny Bun', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [35, 42, 49, null, null], starPrices: [500, 750, 1000, null, null] },
  { id: 'cook-026', name: 'Latte', category: 'Drink', level: 2, recipePrice: null, ingredients: [{ name: 'Coffee Beans', quantity: 2 }, { name: 'Milk', quantity: 2 }], energy: [40, 48, null, null, null], starPrices: [300, 450, null, null, null] },
  // Roll cake variants
  { id: 'cook-027', name: 'Red Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Red Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, null, null, null] },
  { id: 'cook-028', name: 'Orange Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Orange Sugar', quantity: 2 }], energy: [48, 58, null, 77, null], starPrices: [670, 1005, null, 2680, null] },
  { id: 'cook-029', name: 'Yellow Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Yellow Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, null, null, null] },
  { id: 'cook-030', name: 'Green Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Green Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, null, null, null] },
  { id: 'cook-031', name: 'Blue Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Blue Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, null, null, null] },
  { id: 'cook-032', name: 'Indigo Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Indigo Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, null, null, null] },
  { id: 'cook-033', name: 'Violet Roll Cake', category: 'Roll Cake', level: 2, recipePrice: null, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Violet Sugar', quantity: 2 }], energy: [48, 58, null, null, null], starPrices: [570, 855, null, null, null] },
  // Level 3
  { id: 'cook-034', name: 'Seafood Risotto', category: 'Main', level: 3, recipePrice: 300, ingredients: [{ name: 'Any Seafood', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Tomato', quantity: 1 }], energy: [null, null, 56, 64, null], starPrices: [490, null, 980, 1960, null] },
  { id: 'cook-035', name: 'Rustic Ratatouille', category: 'Main', level: 3, recipePrice: 300, ingredients: [{ name: 'Tomato', quantity: 1 }, { name: 'Potato', quantity: 1 }, { name: 'Lettuce', quantity: 1 }], energy: [60, 72, null, null, null], starPrices: [640, 960, 1280, null, null] },
  { id: 'cook-036', name: 'Black Truffle Cream Pasta', category: 'Pasta', level: 3, recipePrice: 400, ingredients: [{ name: 'Black Truffle', quantity: 1 }, { name: 'Wheat', quantity: 2 }, { name: 'Milk', quantity: 1 }], energy: [90, 108, null, null, null], starPrices: [900, 1350, null, null, null] },
  { id: 'cook-037', name: 'Black Truffle Pie', category: 'Pie', level: 3, recipePrice: null, ingredients: [{ name: 'Black Truffle', quantity: 2 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }], energy: [80, 96, null, null, null], starPrices: [830, 1245, 1660, 3320, null] },
  // Level 4
  { id: 'cook-038', name: 'Meat Sauce Pasta', category: 'Pasta', level: 4, recipePrice: 400, ingredients: [{ name: 'Meat', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Tomato', quantity: 1 }, { name: 'Cheese', quantity: 1 }], energy: [80, 96, 112, null, null], starPrices: [670, 1005, 1340, null, null] },
  { id: 'cook-039', name: 'Seafood Pizza', category: 'Pizza', level: 4, recipePrice: 500, ingredients: [{ name: 'Cheese', quantity: 1 }, { name: 'Tomato Sauce', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Any Fish', quantity: 1 }], energy: [70, 84, 98, null, null], starPrices: [780, 1170, 1560, null, null] },
  // Level 5
  { id: 'cook-040', name: 'Carrot Cake', category: 'Cake', level: 5, recipePrice: 500, ingredients: [{ name: 'Egg', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Carrot', quantity: 2 }], energy: [70, null, null, null, null], starPrices: [840, 1260, null, null, null] },
  { id: 'cook-041', name: 'Corn Soup', category: 'Soup', level: 5, recipePrice: 500, ingredients: [{ name: 'Milk', quantity: 1 }, { name: 'Butter', quantity: 1 }, { name: 'Corn', quantity: 2 }], energy: [80, null, 112, 128, null], starPrices: [1340, 2010, 2680, 5360, null] },
  { id: 'cook-042', name: 'Apple Pie', category: 'Pie', level: 5, recipePrice: 500, ingredients: [{ name: 'Apple', quantity: 1 }, { name: 'Wheat', quantity: 1 }, { name: 'Egg', quantity: 1 }, { name: 'Butter', quantity: 1 }], energy: [70, 84, null, null, null], starPrices: [730, 1095, 1460, null, null] },
  // Level 6
  { id: 'cook-043', name: 'Tiramisu', category: 'Cake', level: 6, recipePrice: 600, ingredients: [{ name: 'Coffee', quantity: 1 }, { name: 'Egg', quantity: 1 }, { name: 'Milk', quantity: 1 }, { name: 'Cheese', quantity: 1 }], energy: [65, 78, null, 104, null], starPrices: [530, 795, null, 2120, null] },
  { id: 'cook-044', name: 'Deluxe Seafood Platter', category: 'Main', level: 6, recipePrice: 600, ingredients: [{ name: 'European Crayfish', quantity: 2 }, { name: 'Any Fish', quantity: 2 }], energy: [65, 78, null, null, null], starPrices: [410, 615, null, null, null] },
  // Additional recipes
  { id: 'cook-045', name: 'Bizarre Food', category: 'Special', level: 1, recipePrice: null, ingredients: [{ name: 'Burned Dish', quantity: 1 }], energy: [5, null, null, null, null], starPrices: [10, null, null, null, null] },
  { id: 'cook-046', name: 'Bizarre Drink', category: 'Special', level: 1, recipePrice: null, ingredients: [{ name: 'Burned Drink', quantity: 1 }], energy: [5, null, null, null, null], starPrices: [10, null, null, null, null] },
]
