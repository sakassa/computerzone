"use client"

import Link from "next/link"
import { CartSidebar } from "./cart-sidebar"
import { Monitor } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Monitor className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">ComputerZone</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors">
              Catalog
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center">
            <CartSidebar />
          </div>
        </div>
      </div>
    </header>
  )
}
