import type { GardenItem } from '../types'

export const gardenData: GardenItem[] = [
  // Vegetables
  { id: 'garden-001', name: 'Tomato', subcategory: 'Vegetable', level: 1, growthTime: '15 min', seedPrice: 10, starPrices: [30, 40, 50, 60, 70] },
  { id: 'garden-002', name: 'Potato', subcategory: 'Vegetable', level: 1, growthTime: '1 hour', seedPrice: 30, starPrices: [90, 120, 150, 180, 210] },
  { id: 'garden-003', name: 'Lettuce', subcategory: 'Vegetable', level: 3, growthTime: '8 hours', seedPrice: 145, starPrices: [435, 582, 726, 870, 1015] },
  { id: 'garden-004', name: 'Carrot', subcategory: 'Vegetable', level: 5, growthTime: '2 hours', seedPrice: 50, starPrices: [155, 207, 258, 310, 362] },
  { id: 'garden-005', name: 'Eggplant', subcategory: 'Vegetable', level: 8, growthTime: '7 hours', seedPrice: 135, starPrices: [406, 544, 680, 816, 952] },
  // Fruits
  { id: 'garden-006', name: 'Pineapple', subcategory: 'Fruit', level: 4, growthTime: '30 min', seedPrice: 15, starPrices: [52, 69, 86, 103, 120] },
  { id: 'garden-007', name: 'Strawberry', subcategory: 'Fruit', level: 6, growthTime: '6 hours', seedPrice: 125, starPrices: [375, 502, 626, 751, 876] },
  { id: 'garden-008', name: 'Grape', subcategory: 'Fruit', level: 7, growthTime: '10 hours', seedPrice: 160, starPrices: [480, 643, 801, 961, 1121] },
  { id: 'garden-009', name: 'Avocado', subcategory: 'Fruit', level: 13, growthTime: '16 hours', seedPrice: 180, starPrices: [540, 720, 900, 1080, 1260] },
  // Grains
  { id: 'garden-010', name: 'Wheat', subcategory: 'Grain', level: 2, growthTime: '4 hours', seedPrice: 95, starPrices: [285, 381, 475, 570, 665] },
  { id: 'garden-011', name: 'Corn', subcategory: 'Grain', level: 6, growthTime: '12 hours', seedPrice: 170, starPrices: [515, 690, 860, 1032, 1204] },
  // Special
  { id: 'garden-012', name: 'Tea Tree', subcategory: 'Special', level: 11, growthTime: '8 hours', seedPrice: 25, starPrices: [75, 100, 125, 150, 175] },
  { id: 'garden-013', name: 'Cacao Tree', subcategory: 'Special', level: 12, growthTime: '10 hours', seedPrice: 110, starPrices: [330, 440, 550, 660, 770] },
  // Flowers
  { id: 'garden-014', name: 'Daisy', subcategory: 'Flower', level: 3, growthTime: '18 hours', seedPrice: 30, starPrices: [20, 30, 40, 50, 60] },
  { id: 'garden-015', name: 'Pansy', subcategory: 'Flower', level: 4, growthTime: '18 hours', seedPrice: 30, starPrices: [25, 35, 45, 55, 65] },
  { id: 'garden-016', name: 'Laceleaf', subcategory: 'Flower', level: 5, growthTime: '20 hours', seedPrice: 60, starPrices: [40, 55, 70, 85, 100] },
  { id: 'garden-017', name: 'Corn Poppy', subcategory: 'Flower', level: 5, growthTime: '20 hours', seedPrice: 60, starPrices: [40, 55, 70, 85, 100] },
  { id: 'garden-018', name: 'Calla Lily', subcategory: 'Flower', level: 6, growthTime: '22 hours', seedPrice: 90, starPrices: [60, 80, 100, 120, 140] },
  { id: 'garden-019', name: 'Morning Glory', subcategory: 'Flower', level: 6, growthTime: '22 hours', seedPrice: 90, starPrices: [60, 80, 100, 120, 140] },
  { id: 'garden-020', name: 'Carnation', subcategory: 'Flower', level: 7, growthTime: '24 hours', seedPrice: 120, starPrices: [80, 110, 140, 170, 200] },
  { id: 'garden-021', name: 'Tulip', subcategory: 'Flower', level: 8, growthTime: '24 hours', seedPrice: 150, starPrices: [100, 140, 180, 220, 260] },
  { id: 'garden-022', name: 'Lily', subcategory: 'Flower', level: 9, growthTime: '28 hours', seedPrice: 200, starPrices: [140, 190, 240, 290, 340] },
  { id: 'garden-023', name: 'Rose', subcategory: 'Flower', level: 10, growthTime: '30 hours', seedPrice: 300, starPrices: [200, 270, 340, 410, 480] },
  { id: 'garden-024', name: 'Hyacinth', subcategory: 'Flower', level: 11, growthTime: '30 hours', seedPrice: 300, starPrices: [200, 270, 340, 410, 480] },
  { id: 'garden-025', name: 'Moth Orchid', subcategory: 'Flower', level: 12, growthTime: '32 hours', seedPrice: 300, starPrices: [220, 300, 380, 460, 540] },
  { id: 'garden-026', name: 'Cranesbill', subcategory: 'Flower', level: 13, growthTime: '32 hours', seedPrice: 300, starPrices: [220, 300, 380, 460, 540] },
]
