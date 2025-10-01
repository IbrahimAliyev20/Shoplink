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
  promocodeDiscount: number
  total: number
  
}

export const calculateCartSummary = (items: CartItem[], promocodeDiscount: number = 0): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const delivery = subtotal > 100 ? 0 : 20 
  const total = Math.max(0, subtotal - promocodeDiscount + delivery) 
  
  
  return {
    subtotal,
    delivery,
    promocodeDiscount,
    total
  }
}
