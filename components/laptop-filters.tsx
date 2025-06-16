"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface LaptopFiltersProps {
  brands: string[]
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  selectedCondition: string
  setSelectedCondition: (condition: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onClearFilters: () => void
}

export function LaptopFilters({
  brands,
  selectedBrand,
  setSelectedBrand,
  selectedCondition,
  setSelectedCondition,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  onClearFilters,
}: LaptopFiltersProps) {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-gray-300">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search laptops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div>
          <Label className="text-gray-300">Brand</Label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-300">Condition</Label>
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="All conditions" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All conditions</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Like New">Like New</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-300">Price Range</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0] || ""}
              onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
              className="bg-gray-800 border-gray-600 text-white"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1] || ""}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 9999])}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
