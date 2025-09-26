export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

export interface CartSummary {
  subtotal: number
  delivery: number
  total: number
}

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Tommy Hilfiger Men's Kelby Sneaker",
    price: 1250,
    quantity: 1,
    image: "/marketimg/sport.png",
    size: "38",
    color: "White/Navy"
  },
  {
    id: 2,
    name: "Tommy Hilfiger Men's Kelby Sneaker",
    price: 1250,
    quantity: 1,
    image: "/marketimg/sport.png",
    size: "39",
    color: "White/Navy"
  },
  {
    id: 3,
    name: "Tommy Hilfiger Men's Kelby Sneaker",
    price: 1250,
    quantity: 1,
    image: "/marketimg/sport.png",
    size: "39",
    color: "White/Navy"
  },
  {
    id: 4,
    name: "Tommy Hilfiger Men's Kelby Sneaker",
    price: 1250,
    quantity: 1,
    image: "/marketimg/sport.png",
    size: "39",
    color: "White/Navy"
  }
]

export const calculateCartSummary = (items: CartItem[]): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const delivery = subtotal > 100 ? 0 : 20 // Free delivery over 100 AZN
  const total = subtotal + delivery
  
  return {
    subtotal,
    delivery,
    total
  }
}
