"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Shield,
  Star,
  Award,
  CheckCircle,
  Sparkles,
  Zap,
  Heart,
  Package,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const productData = {
  "vacuum-sealer": {
    name: "Vacuum Sealer Pro",
    price: "$89.99",
    originalPrice: "$119.99",
    images: [
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
    ],
    rating: 4.8,
    reviews: 1247,
    brand: "Mayson",
    model: "VS-Pro-2024",
    inStock: true,
    badge: "Best Seller",
    badgeColor: "bg-slate-800",
    shortDesc: "Powerful 60kPa suction with fast 10-15 second sealing for all your food preservation needs.",
    description:
      "Equipped with 60kPa heavy-duty suction pump, this vacuum sealer machine effectively realizes vacuum sealing in 10-15 seconds, providing the best level of vacuum and sealing faster and more efficiently than low suction machines.",
    specifications: {
      Material: "ABS (Acrylonitrile Butadiene Styrene)",
      Color: "Black",
      Weight: "0.65 Kilograms",
      "Power Source": "Corded Electric",
      Voltage: "110 Volts (DC)",
      Dimensions: "13.62 x 2.48 x 2.13 inches",
      "Suction Power": "60kPa",
      "Sealing Time": "10-15 seconds",
      "Warranty Period": "6 Months",
      "Package Contents": "Machine, 10 Bags, Manual, Power Cord",
    },
    features: [
      "【Powerful Suction & Fast Sealing】Equipped with 60kPa heavy-duty suction pump, this vacuum sealer machine effectively realizes vacuum sealing in 10-15 seconds, providing the best level of vacuum and sealing faster and more efficiently than low suction machines.",
      "【Wide Range Of Applications】Versatile enough to process meat, seafood, fruits, vegetables, nuts, bread, snacks, and more. This vacuum sealer effectively seals wet and dry items to meet all your food preservation needs.",
      "【Easy to Operate & Store】With a simple press of the automatic button, this food vacuum sealer automatically performs the whole process, from vacuum sealing to sealing. It is designed to be easily used by the elderly and children. The digital countdown shows the sealing time, making the waiting time visible. Its compact size makes it easy to store in lockers or drawers and carry it when needed.",
      "【3 Modes - Meet Your Needs】'Manual sealing' mode - automatic one-touch vacuum sealing and sealing, perfect for foods that are not easily deformed, such as meat, nuts and vegetables; Vacuum sealing mode - control the vacuum sealing process yourself, suitable for soft or wet food, such as bread or foods containing soup; 'Sealing mode Manual vacuum sealing' - sealing only, for chip bags or foil bags.",
      "【FULL STARTER KITS】The package includes 1 x vacuum sealing machine, 10 x food sealing bags, 1 x user manual, 1 x power cord. You can contact us at any time if you have any questions.",
    ],
    warranty: "6 months comprehensive warranty coverage",
  },
  "lint-remover": {
    name: "Fabric Care Lint Remover",
    price: "$34.99",
    originalPrice: "$49.99",
    images: [
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
    ],
    rating: 4.6,
    reviews: 892,
    brand: "Mayson",
    model: "LR-Green-2024",
    inStock: true,
    badge: "Premium",
    badgeColor: "bg-blue-600",
    shortDesc: "Rechargeable lint remover with 5W motor and 60 minutes cordless operation time.",
    description:
      "Efficiently removes fabric fluff, fuzz, bobbles, pills, burr from all types of garments, fabrics and restores to a fresh look.",
    specifications: {
      Material: "Stainless Steel",
      Color: "Sea Green",
      Dimensions: "5.5D x 6W x 12.5H Centimeters",
      "Handle Material": "Stainless Steel",
      "Operation Mode": "Automatic",
      "Motor Power": "5W",
      "Motor Speed": "6500 RPM",
      "Battery Life": "60 minutes",
      "Charging Time": "1 hour",
      "Warranty Period": "1 Year",
      "Package Contents": "Main Unit, USB Cable, Cleaning Brush",
    },
    features: [
      "Efficiently removes fabric fluff, fuzz, bobbles, pills, burr from all types of garments, fabrics and restores to a fresh look.",
      "Fabric brush to quickly remove dust, fuzz, dandruff from shirts, pants jacket and more.",
      "5W motor with 6500 RPM ensures quick and smooth removal of lints.",
      "3 leaf stainless steel blades eliminates the lint smoothly and prevents the fabric from getting damaged.",
      "Rechargeable lithium ion battery gives 60 minutes of cordless use with 1 hours of recharge.",
      "The smart safety features ensures the device to work only once the steel mesh cover is properly and tightly fitted to avoid injury.",
      "1 Year warranty, Includes main unit, USB charging cable, cleaning brush.",
    ],
    warranty: "1 Year warranty included",
  },
  "lint-roller": {
    name: "Premium Lint Roller",
    price: "$19.99",
    originalPrice: "$29.99",
    images: [
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
      "/placeholder.svg?height=500&width=700",
    ],
    rating: 4.7,
    reviews: 654,
    brand: "Mayson",
    model: "LR-Premium-2024",
    inStock: true,
    badge: "New",
    badgeColor: "bg-gray-700",
    shortDesc: "Extra sticky lint roller with ergonomic handle for quick fabric cleaning and pet hair removal.",
    description:
      "Premium lint roller designed for effective removal of lint, pet hair, dust, and debris from clothing, upholstery, and fabrics. Features extra-sticky adhesive sheets and comfortable ergonomic handle for easy use.",
    specifications: {
      Material: "Plastic Handle with Adhesive Sheets",
      Color: "Blue & White",
      Dimensions: "25cm Length x 10cm Width",
      "Sheet Count": "60 Sheets per Roll",
      "Handle Type": "Ergonomic Grip",
      Weight: "0.2 Kilograms",
      "Refill Compatible": "Yes",
      "Surface Types": "All Fabrics",
      "Warranty Period": "6 Months",
      "Package Contents": "Roller, 60 Sheets, Instructions",
    },
    features: [
      "【Extra Sticky Sheets】High-quality adhesive sheets that effectively pick up lint, pet hair, dust, and debris from all types of fabrics and surfaces.",
      "【Ergonomic Handle】Comfortable grip handle designed for easy maneuvering and reduced hand fatigue during extended use.",
      "【Refillable Design】Eco-friendly refillable system - simply replace the adhesive roll when sheets are used up, reducing waste.",
      "【Versatile Use】Perfect for clothing, upholstery, car interiors, bedding, curtains, and any fabric surface that needs cleaning.",
      "【Compact & Portable】Lightweight and compact design makes it easy to store in closets, cars, or travel bags for on-the-go use.",
      "【Pet Hair Specialist】Specially designed adhesive formula that effectively removes stubborn pet hair from furniture and clothing.",
      "【60 Sheets Included】Each roll comes with 60 perforated sheets, providing long-lasting cleaning power for multiple uses.",
    ],
    warranty: "6 months comprehensive warranty coverage",
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [selectedImage, setSelectedImage] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [activeTab, setActiveTab] = useState("specifications")

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const product = productData[productId as keyof typeof productData]

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Not Found</h1>
          <Link href="/">
            <Button className="bg-gray-900 hover:bg-blue-600 text-white">Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50">
      {/* Subtle Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gray-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-slate-100 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-80 left-1/3 w-24 h-24 bg-blue-50 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute bottom-40 right-10 w-36 h-36 bg-gray-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-80 left-20 w-20 h-20 bg-slate-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* Header */}
      <header className="bg-black shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center space-x-3 text-white hover:text-blue-300 transition-all duration-300 group"
            >
              <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-lg font-medium">Back to Products</span>
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

      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative group">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isImageZoomed ? "scale-150" : "group-hover:scale-110"
                    }`}
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>

                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <Eye className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-4 ring-blue-500 scale-105 shadow-xl"
                        : "hover:scale-105 hover:shadow-lg"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Quality Assurance */}
              <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200 hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-gray-700" />
                <p className="text-lg font-semibold text-gray-900">Quality Assured</p>
                <p className="text-gray-600">Premium materials & craftsmanship</p>
              </div>
            </div>

            {/* Enhanced Product Info */}
            <div className="space-y-8">
              {/* Product Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                      {product.brand}
                    </Badge>
                    {product.inStock && <Badge className="bg-blue-600 text-white px-3 py-1">In Stock</Badge>}
                    <Badge className={`${product.badgeColor} text-white px-3 py-1`}>{product.badge}</Badge>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 transition-colors duration-300 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-semibold text-gray-800">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-5xl font-bold text-blue-600">{product.price}</span>
                  <span className="text-2xl text-gray-400 line-through">{product.originalPrice}</span>
                  <Badge className="bg-gray-800 text-white px-3 py-1 text-sm">
                    Save{" "}
                    {Math.round(
                      ((Number.parseFloat(product.originalPrice.slice(1)) - Number.parseFloat(product.price.slice(1))) /
                        Number.parseFloat(product.originalPrice.slice(1))) *
                        100,
                    )}
                    %
                  </Badge>
                </div>

                <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Info Card */}
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Product Information
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  This product comes with comprehensive warranty coverage. Set up your warranty after purchase for full
                  protection and peace of mind.
                </p>
              </div>

              {/* Enhanced Warranty Info */}
              <Card className="border-0 bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="h-6 w-6 mr-3 text-blue-600" />
                    <span className="text-gray-900">Warranty Coverage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6 text-lg">{product.warranty}</p>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "Easy warranty setup process",
                      "Quick claim resolution",
                      "Comprehensive coverage",
                      "24/7 customer support",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 mr-3 text-blue-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Product Details Tabs */}
          <div className="mt-20">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-gray-200">
                {[
                  { id: "specifications", name: "Specifications", icon: Package },
                  { id: "features", name: "Features", icon: Zap },
                ].map((tab) => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 ${
                        activeTab === tab.id
                          ? "bg-gray-900 text-white shadow-2xl scale-105"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="grid lg:grid-cols-2 gap-12">
              {activeTab === "specifications" && (
                <>
                  <Card className="border-0 bg-white shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center">
                        <Package className="h-6 w-6 mr-3 text-blue-600" />
                        <span className="text-gray-900">Technical Specifications</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 rounded px-2"
                          >
                            <span className="font-semibold text-gray-700">{key}:</span>
                            <span className="text-gray-900 font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Heart className="h-6 w-6 mr-3 text-gray-600" />
                      Why You'll Love It
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Premium build quality with attention to detail",
                        "Designed for long-lasting performance",
                        "Easy to use for all family members",
                        "Compact design saves space",
                        "Energy efficient operation",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <Heart className="h-4 w-4 mr-3 text-gray-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "features" && (
                <div className="lg:col-span-2">
                  <Card className="border-0 bg-white shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center">
                        <Zap className="h-6 w-6 mr-3 text-blue-600" />
                        <span className="text-gray-900">Key Features & Benefits</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {product.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-slate-50 transition-all duration-300"
                          >
                            <CheckCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
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
