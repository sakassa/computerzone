"use client"

import { useState, useEffect } from "react"
import { supabase, type Laptop } from "@/lib/supabase"
import { LaptopCard } from "@/components/laptop-card"
import { LaptopFilters } from "@/components/laptop-filters"
import { Header } from "@/components/header"
import { Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<string[]>([])

  // Filter states
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchLaptops()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [laptops, selectedBrand, selectedCondition, priceRange, searchQuery])

  const fetchLaptops = async () => {
    try {
      const { data, error } = await supabase.from("laptops").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setLaptops(data || [])

      // Extract unique brands
      const uniqueBrands = [...new Set((data || []).map((laptop) => laptop.brand))]
      setBrands(uniqueBrands)
    } catch (error) {
      console.error("Error fetching laptops:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = laptops

    // Brand filter
    if (selectedBrand !== "all") {
      filtered = filtered.filter((laptop) => laptop.brand === selectedBrand)
    }

    // Condition filter
    if (selectedCondition !== "all") {
      filtered = filtered.filter((laptop) => laptop.condition === selectedCondition)
    }

    // Price range filter
    filtered = filtered.filter((laptop) => laptop.price >= priceRange[0] && laptop.price <= priceRange[1])

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (laptop) =>
          laptop.name.toLowerCase().includes(query) ||
          laptop.brand.toLowerCase().includes(query) ||
          Object.values(laptop.specs).some((spec) => spec.toLowerCase().includes(query)),
      )
    }

    setFilteredLaptops(filtered)
  }

  const clearFilters = () => {
    setSelectedBrand("all")
    setSelectedCondition("all")
    setPriceRange([0, 9999])
    setSearchQuery("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 to-black flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Level Up Your Gaming Experience
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12">
              Discover our premium collection of high-performance gaming laptops, 
              featuring cutting-edge technology and unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                  Browse Catalog
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16" id="catalog">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Gaming Laptops</h2>
          <p className="text-gray-400">Discover high-performance gaming laptops, both new and like new</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <LaptopFilters
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedCondition={selectedCondition}
              setSelectedCondition={setSelectedCondition}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 text-gray-400">
              Showing {filteredLaptops.length} of {laptops.length} laptops
            </div>

            {filteredLaptops.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No laptops found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLaptops.map((laptop) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
