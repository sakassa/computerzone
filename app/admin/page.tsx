"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type Laptop } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogIn, LogOut, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { User } from "@supabase/supabase-js"

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingLaptop, setEditingLaptop] = useState<Laptop | null>(null)

  // Auth form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)

  // Laptop form state
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    condition: "New" as "New" | "Like New",
    stock: "",
    image_url: "",
    specs: {
      CPU: "",
      GPU: "",
      RAM: "",
      SSD: "",
      Screen: "",
      Weight: "",
    },
  })

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchLaptops()
    }
  }, [user])

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error("Error checking user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setUser(data.user)
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel.",
      })
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setLaptops([])
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const fetchLaptops = async () => {
    try {
      const { data, error } = await supabase.from("laptops").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setLaptops(data || [])
    } catch (error) {
      console.error("Error fetching laptops:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      condition: "New",
      stock: "",
      image_url: "",
      specs: {
        CPU: "",
        GPU: "",
        RAM: "",
        SSD: "",
        Screen: "",
        Weight: "",
      },
    })
    setEditingLaptop(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const laptopData = {
        name: formData.name,
        brand: formData.brand,
        price: Number.parseFloat(formData.price),
        condition: formData.condition,
        stock: Number.parseInt(formData.stock),
        image_url: formData.image_url || null,
        specs: formData.specs,
      }

      if (editingLaptop) {
        const { error } = await supabase.from("laptops").update(laptopData).eq("id", editingLaptop.id)

        if (error) throw error

        toast({
          title: "Laptop updated",
          description: "The laptop has been updated successfully.",
        })
      } else {
        const { error } = await supabase.from("laptops").insert([laptopData])

        if (error) throw error

        toast({
          title: "Laptop added",
          description: "The laptop has been added successfully.",
        })
      }

      fetchLaptops()
      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (laptop: Laptop) => {
    setFormData({
      name: laptop.name,
      brand: laptop.brand,
      price: laptop.price.toString(),
      condition: laptop.condition,
      stock: laptop.stock.toString(),
      image_url: laptop.image_url || "",
      specs: laptop.specs,
    })
    setEditingLaptop(laptop)
    setShowForm(true)
    setTimeout(() => {
      const formElement = document.getElementById('laptop-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this laptop?")) return

    try {
      const { error } = await supabase.from("laptops").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Laptop deleted",
        description: "The laptop has been deleted successfully.",
      })

      fetchLaptops()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  Admin Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <Button type="submit" disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                    {authLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <LogIn className="w-4 h-4 mr-2" />
                    )}
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Welcome, {user.email}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Laptop
          </Button>
        </div>

        {showForm && (
          <Card id="laptop-form" className="bg-gray-900 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">{editingLaptop ? "Edit Laptop" : "Add New Laptop"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand" className="text-gray-300">
                      Brand
                    </Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-gray-300">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value: "New" | "Like New") => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-gray-300">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image_url" className="text-gray-300">
                      Image URL
                    </Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(formData.specs).map(([key, value]) => (
                      <div key={key}>
                        <Label htmlFor={key} className="text-gray-300">
                          {key}
                        </Label>
                        <Input
                          id={key}
                          value={value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specs: { ...formData.specs, [key]: e.target.value },
                            })
                          }
                          required
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingLaptop ? "Update Laptop" : "Add Laptop"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops.map((laptop) => (
            <Card key={laptop.id} className="bg-gray-900 border-gray-700">
              <CardHeader className="p-0">
                <img
                  src={laptop.image_url || "/placeholder.svg?height=200&width=300"}
                  alt={laptop.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-white">{laptop.name}</h3>
                  <p className="text-gray-400">{laptop.brand}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-400">${laptop.price.toFixed(2)}</span>
                    <div className="flex space-x-2">
                      <Badge className={`${laptop.condition === "New" ? "bg-green-600" : "bg-orange-600"}`}>
                        {laptop.condition}
                      </Badge>
                      <Badge variant={laptop.stock > 0 ? "default" : "destructive"}>{laptop.stock} in stock</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => handleEdit(laptop)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(laptop.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
