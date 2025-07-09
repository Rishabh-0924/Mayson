"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Star, Shield, Package, Award, CheckCircle, Sparkles, Zap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const products = [
    {
      id: "vacuum-sealer",
      name: "Vacuum Sealer Pro",
      price: "$89.99",
      originalPrice: "$119.99",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviews: 1247,
      category: "kitchen",
      badge: "Best Seller",
      badgeColor: "bg-slate-800",
      shortDesc: "Powerful 60kPa suction with fast 10-15 second sealing for all your food preservation needs.",
      features: ["60kPa Heavy-duty Suction", "3 Sealing Modes", "Digital Countdown Display", "Compact Design"],
      specifications: {
        Material: "ABS (Acrylonitrile Butadiene Styrene)",
        Color: "Black",
        Weight: "0.65 Kilograms",
        "Power Source": "Corded Electric",
        Voltage: "110 Volts (DC)",
      },
    },
    {
      id: "lint-remover",
      name: "Fabric Care Lint Remover",
      price: "$34.99",
      originalPrice: "$49.99",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviews: 892,
      category: "home-care",
      badge: "Premium",
      badgeColor: "bg-blue-600",
      shortDesc: "Rechargeable lint remover with 5W motor and 60 minutes cordless operation time.",
      features: ["5W Motor 6500 RPM", "60 Min Battery Life", "3 Steel Blades", "Safety Features"],
      specifications: {
        Material: "Stainless Steel",
        Color: "Sea Green",
        Dimensions: "5.5D x 6W x 12.5H Centimeters",
        "Handle Material": "Stainless Steel",
      },
    },
    {
      id: "lint-roller",
      name: "Premium Lint Roller",
      price: "$19.99",
      originalPrice: "$29.99",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviews: 654,
      category: "home-care",
      badge: "New",
      badgeColor: "bg-gray-700",
      shortDesc: "Extra sticky lint roller with ergonomic handle for quick fabric cleaning and pet hair removal.",
      features: ["Extra Sticky Sheets", "Ergonomic Handle", "Refillable Design", "Pet Hair Removal"],
      specifications: {
        Material: "Plastic Handle with Adhesive Sheets",
        Color: "Blue & White",
        Dimensions: "25cm Length",
        "Sheet Count": "60 Sheets per Roll",
      },
    },
  ]

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "kitchen", name: "Kitchen", icon: Zap },
    { id: "home-care", name: "Home Care", icon: Heart },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50">
      {/* Subtle Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gray-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-slate-100 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-80 left-1/3 w-24 h-24 bg-blue-50 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute bottom-40 right-10 w-36 h-36 bg-gray-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-80 left-20 w-20 h-20 bg-slate-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-60 right-1/3 w-16 h-16 bg-blue-100 rounded-full opacity-15"></div>
        <div className="absolute bottom-60 left-1/2 w-28 h-28 bg-gray-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-10 w-18 h-18 bg-slate-100 rounded-full opacity-10"></div>
      </div>

      {/* Header */}
      <header className="bg-black shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white hover:text-blue-300 transition-all duration-300 group"
            >
              <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">MAYSON</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/products"
                className="text-blue-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium"
              >
                Products
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Warranty
              </Link>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">Premium Home</span>
              <br />
              <span className="text-blue-600">Appliances</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Discover our carefully curated selection of high-quality home appliances designed to make your life
              easier. Each product comes with comprehensive warranty coverage and exceptional customer support.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span>6 Month Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                <span>Fast Support</span>
              </div>
            </div>
          </div>

          {/* Enhanced Category Filter */}
          <div className="flex justify-center mb-16">
            <div className="flex space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-2xl border border-gray-200">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? "bg-gray-900 text-white shadow-2xl scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Enhanced Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group relative overflow-hidden border-0 bg-white hover:bg-gray-50 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                {/* Subtle Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className="absolute inset-[2px] bg-white rounded-lg"></div>

                {/* Content */}
                <div className="relative z-10">
                  <CardHeader className="pb-4">
                    {/* Product Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge
                        className={`${product.badgeColor} text-white border-0 px-3 py-1 text-xs font-bold shadow-lg`}
                      >
                        {product.badge}
                      </Badge>
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl mb-6 overflow-hidden group-hover:shadow-2xl transition-shadow duration-500">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                        >
                          MAYSON
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                          <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                        </div>
                      </div>

                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {product.name}
                      </CardTitle>

                      {/* Rating */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-colors duration-300 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      <CardDescription className="text-gray-600 leading-relaxed">{product.shortDesc}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Specifications Preview */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6 group-hover:from-blue-50 group-hover:to-slate-50 transition-all duration-500">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Package className="h-4 w-4 mr-2 text-blue-500" />
                        Key Specifications
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(product.specifications)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-600">{key}:</span>
                              <span className="text-gray-900 font-medium">{value}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/products/${product.id}`}>
                      <Button className="w-full group/btn bg-gray-900 hover:bg-blue-600 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-white border-0 py-3">
                        <span className="flex items-center justify-center space-x-2">
                          <span className="font-semibold">Explore Details</span>
                          <Package className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Enhanced Why Choose Mayson Section */}
          <section className="py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200">
            <div className="max-w-4xl mx-auto px-8">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 text-gray-900">Why Choose MAYSON Products?</h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  We're committed to providing premium quality products with exceptional warranty coverage and customer
                  service.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    icon: Award,
                    title: "Premium Quality",
                    description: "High-quality materials and advanced technology in every product.",
                    bgColor: "bg-gray-100",
                    iconColor: "text-gray-700",
                  },
                  {
                    icon: Shield,
                    title: "6 Month Warranty",
                    description: "Comprehensive warranty coverage for 6 months from your purchase date.",
                    bgColor: "bg-blue-100",
                    iconColor: "text-blue-600",
                  },
                  {
                    icon: Package,
                    title: "Fast Support",
                    description: "Quick customer support and warranty processing when you need it.",
                    bgColor: "bg-slate-100",
                    iconColor: "text-slate-700",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center group hover:scale-105 transition-transform duration-500">
                    <div
                      className={`w-20 h-20 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-500 group-hover:rotate-3`}
                    >
                      <item.icon className={`h-10 w-10 ${item.iconColor}`} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced Warranty CTA Section */}
          <section className="py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-slate-800/95"></div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold mb-6">Ready to Protect Your Purchase?</h3>
                  <p className="text-xl mb-10 text-gray-300 leading-relaxed">
                    Set up your warranty coverage today and enjoy peace of mind with comprehensive protection for your
                    MAYSON products.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/warranty-setup">
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 transition-all duration-300 shadow-xl px-8 py-4"
                      >
                        <Shield className="mr-3 h-5 w-5" />
                        <span className="font-semibold">Setup Warranty</span>
                      </Button>
                    </Link>
                    <Link href="/warranty-claim">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300 shadow-xl px-8 py-4 bg-transparent"
                      >
                        <Package className="mr-3 h-5 w-5" />
                        <span className="font-semibold">Claim Warranty</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">MAYSON</span>
              </div>
              <p className="text-gray-400">
                Premium home appliances with reliable warranty support and exceptional customer service.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Vacuum Sealer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Lint Remover
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Coffee Maker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Warranty Setup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Warranty Claims
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Warranty Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MAYSON. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
