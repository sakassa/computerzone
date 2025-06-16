"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { toast } from "@/hooks/use-toast"
import type { Laptop } from "@/lib/supabase"

interface AddToCartButtonProps {
  laptop: Laptop
}

export function AddToCartButton({ laptop }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    if (laptop.stock > 0) {
      addToCart(laptop)
      toast({
        title: "Added to cart",
        description: `${laptop.name} has been added to your cart.`,
      })
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={laptop.stock === 0}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
      size="lg"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      {laptop.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </Button>
  )
} 