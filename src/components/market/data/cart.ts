export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  stock: number
  size?: string
  color?: string
}

// Utility function to round monetary values to 2 decimal places
export const roundMoney = (value: number): number => {
  return Math.round(value * 100) / 100
}

export interface CartSummary {
  subtotal: number
  delivery: number
  promocodeDiscount: number
  total: number
  
}

export const calculateCartSummary = (items: CartItem[], promocodeDiscount: number = 0): CartSummary => {
  const subtotal = roundMoney(items.reduce((sum, item) => sum + (item.price * item.quantity), 0))
  const delivery = subtotal > 100 ? 0 : 5 
  const total = roundMoney(Math.max(0, subtotal - promocodeDiscount + delivery))
  
  return {
    subtotal,
    delivery,
    promocodeDiscount: roundMoney(promocodeDiscount),
    total
  }
}
