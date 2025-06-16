"use client"

import type { Laptop } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { addToCart } from "@/lib/cart"
import { toast } from "@/hooks/use-toast"

interface LaptopCardProps {
  laptop: Laptop
}

export function LaptopCard({ laptop }: LaptopCardProps) {
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
    <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-colors">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={laptop.image_url || "/placeholder.svg?height=200&width=300"}
            alt={laptop.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge
            className={`absolute top-2 right-2 ${
              laptop.condition === "New" ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {laptop.condition}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-white">{laptop.name}</h3>
          <p className="text-gray-400">{laptop.brand}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-400">${laptop.price.toFixed(2)}</span>
            <Badge variant={laptop.stock > 0 ? "default" : "destructive"}>
              {laptop.stock > 0 ? `${laptop.stock} in stock` : "Sold Out"}
            </Badge>
          </div>
          <div className="text-sm text-gray-400">
            <p>{laptop.specs.CPU}</p>
            <p>{laptop.specs.GPU}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Link href={`/laptop/${laptop.id}`} className="flex-1">
          <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
            View Details
          </Button>
        </Link>
        <Button
          onClick={handleAddToCart}
          disabled={laptop.stock === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
