"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase, type Laptop } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { toast } from "@/hooks/use-toast"

export default function LaptopDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [laptop, setLaptop] = useState<Laptop | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchLaptop(params.id as string)
    }
  }, [params.id])

  const fetchLaptop = async (id: string) => {
    try {
      const { data, error } = await supabase.from("laptops").select("*").eq("id", id).single()

      if (error) throw error
      setLaptop(data)
    } catch (error) {
      console.error("Error fetching laptop:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (laptop && laptop.stock > 0) {
      addToCart(laptop)
      toast({
        title: "Added to cart",
        description: `${laptop.name} has been added to your cart.`,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    )
  }

  if (!laptop) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-white">Laptop not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={laptop.image_url || "/placeholder.svg?height=400&width=600"}
              alt={laptop.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{laptop.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{laptop.brand}</p>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-blue-400">${laptop.price.toFixed(2)}</span>
                <Badge
                  className={`${
                    laptop.condition === "New" ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {laptop.condition}
                </Badge>
                <Badge variant={laptop.stock > 0 ? "default" : "destructive"}>
                  {laptop.stock > 0 ? `${laptop.stock} in stock` : "Sold Out"}
                </Badge>
              </div>
            </div>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(laptop.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={laptop.stock === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {laptop.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>

              <p className="text-sm text-gray-400 text-center">Checkout via WhatsApp • No account required</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
