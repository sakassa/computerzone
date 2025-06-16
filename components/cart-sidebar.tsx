"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle } from "lucide-react"
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartTotal,
  generateWhatsAppUrl,
  type CartItem,
} from "@/lib/cart"

const WHATSAPP_NUMBER = "1234567890" // Replace with your WhatsApp number

export function CartSidebar() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateCart = () => setCart(getCart())
    updateCart()

    // Listen for storage changes to update cart across tabs
    window.addEventListener("storage", updateCart)
    // Listen for cart updates in the same tab
    window.addEventListener("cart-updated", updateCart)
    
    return () => {
      window.removeEventListener("storage", updateCart)
      window.removeEventListener("cart-updated", updateCart)
    }
  }, [])

  const handleQuantityChange = (laptopId: string, newQuantity: number) => {
    updateCartQuantity(laptopId, newQuantity)
    setCart(getCart())
  }

  const handleRemoveItem = (laptopId: string) => {
    removeFromCart(laptopId)
    setCart(getCart())
  }

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppUrl(WHATSAPP_NUMBER)
    if (url) {
      window.open(url, "_blank")
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = getCartTotal()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative border-gray-600 text-gray-300 hover:bg-gray-800">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-gray-900 border-gray-700 text-white w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-white">Shopping Cart ({totalItems} items)</SheetTitle>
          <SheetDescription className="text-gray-400">
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto py-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.laptop.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.laptop.image_url || "/placeholder.svg?height=60&width=80"}
                        alt={item.laptop.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.laptop.name}</h4>
                        <p className="text-xs text-gray-400">{item.laptop.brand}</p>
                        <p className="text-sm font-bold text-blue-400">${item.laptop.price.toFixed(2)}</p>
                        <Badge
                          className={`mt-1 ${item.laptop.condition === "New" ? "bg-green-600" : "bg-orange-600"}`}
                        >
                          {item.laptop.condition}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.laptop.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.laptop.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0 border-gray-600 bg-gray-800 hover:bg-gray-700 text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.laptop.id, item.quantity + 1)}
                          disabled={item.quantity >= item.laptop.stock}
                          className="w-8 h-8 p-0 border-gray-600 bg-gray-800 hover:bg-gray-700 text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-bold text-white">${(item.laptop.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-700 pt-4 space-y-4 mt-auto">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-400">${total.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Checkout via WhatsApp
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
