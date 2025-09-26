
// Simple product interface for product list
export interface SimpleProduct {
  id: number
  name: string
  price: string
  image: string
  category: string
}

// Detailed product interface for single product page
export interface Product {
  id: number
  name: string
  price: string
  images: string[]
  colors: { id: string; name: string; image: string }[]
  sizes: string[]
  details: {
    material: string
    comfort: string
    sole: string
  }
}

// Product list data
export const allProducts: SimpleProduct[] = [
  {
    id: 1,
    name: "Nike Air Zoom Pegasus",
    price: "120 AZN",
    image: "/marketimg/sport.png",
    category: "sports"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: "150 AZN",
    image: "/marketimg/sport.png",
    category: "sports"
  },
  {
    id: 3,
    name: "Classic Leather Oxford",
    price: "200 AZN",
    image: "/marketimg/sport.png",
    category: "classic"
  },
  {
    id: 4,
    name: "Timberland Boots",
    price: "180 AZN",
    image: "/marketimg/sport.png",
    category: "boots"
  },
  {
    id: 5,
    name: "Summer Sandals",
    price: "80 AZN",
    image: "/marketimg/sport.png",
    category: "sandals"
  },
  {
    id: 6,
    name: "Loafers Premium",
    price: "160 AZN",
    image: "/marketimg/sport.png",
    category: "loafers"
  },
  {
    id: 7,
    name: "Running Shoes Pro",
    price: "140 AZN",
    image: "/marketimg/sport.png",
    category: "sports"
  },
  {
    id: 8,
    name: "Formal Dress Shoes",
    price: "220 AZN",
    image: "/marketimg/sport.png",
    category: "classic"
  }
]

// Detailed product for single product page
export const mockProduct: Product = {
  id: 1,
  name: "Tommy Hilfiger Men's Kelby Sneaker",
  price: "1200 AZN",
  images: [
    "/marketimg/sport.png",
    "/marketimg/sport.png", 
    "/marketimg/sport.png",
    "/marketimg/sport.png"
  ],
  colors: [
    { id: "white-navy", name: "White/Navy", image: "/marketimg/sport.png" },
    { id: "black", name: "Black", image: "/marketimg/sport.png" },
    { id: "brown", name: "Brown", image: "/marketimg/sport.png" },
    { id: "gray", name: "Gray", image: "/marketimg/sport.png" }
  ],
  sizes: ["36", "37", "38", "39", "40"],
  details: {
    material: "Təbii dəri",
    comfort: "Ortopedik içlik", 
    sole: "Sürüşməz rezin"
  }
}