"use client"

import { useState, useEffect } from "react"
import { supabase, type Laptop } from "@/lib/supabase"
import { LaptopCard } from "@/components/laptop-card"
import { LaptopFilters } from "@/components/laptop-filters"
import { Header } from "@/components/header"
import { Loader2 } from "lucide-react"

export default function CatalogPage() {
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
      setFilteredLaptops(data || [])

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
    let filtered = [...laptops]

    // Apply brand filter
    if (selectedBrand !== "all") {
      filtered = filtered.filter((laptop) => laptop.brand === selectedBrand)
    }

    // Apply condition filter
    if (selectedCondition !== "all") {
      filtered = filtered.filter((laptop) => laptop.condition === selectedCondition)
    }

    // Apply price range filter
    filtered = filtered.filter(
      (laptop) => laptop.price >= priceRange[0] && laptop.price <= priceRange[1]
    )

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (laptop) =>
          laptop.name.toLowerCase().includes(query) ||
          laptop.brand.toLowerCase().includes(query) ||
          laptop.description?.toLowerCase().includes(query)
      )
    }

    setFilteredLaptops(filtered)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
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
              onClearFilters={() => {
                setSelectedBrand("all")
                setSelectedCondition("all")
                setPriceRange([0, 9999])
                setSearchQuery("")
              }}
            />
          </div>

          {/* Laptop Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : filteredLaptops.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>No laptops found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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