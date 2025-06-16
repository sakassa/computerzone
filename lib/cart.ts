import type { Laptop } from "./supabase"

export type CartItem = {
  laptop: Laptop
  quantity: number
}

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("computerzone-cart")
  return cart ? JSON.parse(cart) : []
}

export const addToCart = (laptop: Laptop, quantity = 1) => {
  const cart = getCart()
  const existingItem = cart.find((item) => item.laptop.id === laptop.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ laptop, quantity })
  }

  localStorage.setItem("computerzone-cart", JSON.stringify(cart))
  // Dispatch a custom event to notify the CartSidebar
  window.dispatchEvent(new Event("cart-updated"))
}

export const removeFromCart = (laptopId: string) => {
  const cart = getCart().filter((item) => item.laptop.id !== laptopId)
  localStorage.setItem("computerzone-cart", JSON.stringify(cart))
  // Dispatch a custom event to notify the CartSidebar
  window.dispatchEvent(new Event("cart-updated"))
}

export const updateCartQuantity = (laptopId: string, quantity: number) => {
  const cart = getCart()
  const item = cart.find((item) => item.laptop.id === laptopId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(laptopId)
    } else {
      item.quantity = quantity
      localStorage.setItem("computerzone-cart", JSON.stringify(cart))
      // Dispatch a custom event to notify the CartSidebar
      window.dispatchEvent(new Event("cart-updated"))
    }
  }
}

export const clearCart = () => {
  localStorage.removeItem("computerzone-cart")
}

export const getCartTotal = (): number => {
  return getCart().reduce((total, item) => total + item.laptop.price * item.quantity, 0)
}

export const generateWhatsAppUrl = (phoneNumber: string): string => {
  const cart = getCart()
  if (cart.length === 0) return ""

  let message = "I'm interested in buying these gaming laptops from ComputerZone:\n\n"

  cart.forEach((item) => {
    message += `• ${item.laptop.name} (${item.laptop.brand})\n`
    message += `  Price: $${item.laptop.price} - ${item.laptop.condition}\n`
    message += `  Quantity: ${item.quantity}\n`
    message += `  Subtotal: $${(item.laptop.price * item.quantity).toFixed(2)}\n\n`
  })

  message += `Total: $${getCartTotal().toFixed(2)}\n\n`
  message += "Please confirm availability and provide payment details."

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
