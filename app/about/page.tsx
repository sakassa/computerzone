import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Shield, MessageCircle, Truck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">About ComputerZone</h1>
            <p className="text-xl text-gray-400">Your trusted destination for high-performance gaming laptops</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Monitor className="w-6 h-6 mr-2 text-blue-500" />
                  Premium Gaming Laptops
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  We specialize in curating the finest selection of gaming laptops, featuring the latest processors,
                  graphics cards, and cutting-edge technology to deliver exceptional gaming performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-green-500" />
                  Quality Guaranteed
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Every laptop in our inventory undergoes rigorous testing and quality checks. Our "Like New" condition
                  items are carefully inspected to ensure they meet our high standards for performance and appearance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-green-500" />
                  WhatsApp Checkout
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Experience hassle-free purchasing with our WhatsApp checkout system. No complicated forms or lengthy
                  processes - just add items to your cart and complete your purchase through a simple WhatsApp
                  conversation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-blue-500" />
                  Fast & Secure Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  We ensure your gaming laptop reaches you safely and quickly. All items are carefully packaged and
                  shipped with tracking information so you can monitor your order every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-center">
              <p className="text-lg leading-relaxed">
                At ComputerZone, we believe that every gamer deserves access to high-performance hardware without
                breaking the bank. Whether you're a competitive esports player, a content creator, or a casual gamer,
                we're here to help you find the perfect gaming laptop that fits your needs and budget.
              </p>
              <div className="mt-8 p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                <p className="text-gray-300">
                  Ready to upgrade your gaming setup? Browse our catalog and reach out to us via WhatsApp for any
                  questions or to complete your purchase.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
