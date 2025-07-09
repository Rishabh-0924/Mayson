"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Search, CheckCircle, AlertTriangle, Calendar, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { CustomerData, WarrantyRecord } from "@/lib/excel-handler"

export default function WarrantySetupPage() {
  const [searchValue, setSearchValue] = useState("")
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [warrantyActivated, setWarrantyActivated] = useState(false)
  const [error, setError] = useState("")
  const [allCustomerData, setAllCustomerData] = useState<CustomerData[]>([])
  const [existingWarranty, setExistingWarranty] = useState<WarrantyRecord | null>(null)

  useEffect(() => {
    // Load customer data from localStorage
    const loadCustomerData = () => {
      const storedData = localStorage.getItem("customerData")
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          setAllCustomerData(parsed)
          console.log("Warranty Setup: Loaded customer data:", parsed.length, "records")
        } catch (error) {
          console.error("Warranty Setup: Error parsing customer data:", error)
        }
      } else {
        console.log("Warranty Setup: No customer data found in localStorage")
      }
    }

    loadCustomerData()

    // Listen for storage events (when admin uploads new data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "customerData" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setAllCustomerData(parsed)
          console.log("Warranty Setup: Updated customer data from storage event:", parsed.length, "records")
        } catch (error) {
          console.error("Warranty Setup: Error parsing updated customer data:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError("Please enter an Order ID")
      return
    }

    setIsLoading(true)
    setError("")
    setCustomerData(null)
    setExistingWarranty(null)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Searching for Order ID:", searchValue)
    console.log("Available customer data:", allCustomerData.length, "records")

    if (allCustomerData.length === 0) {
      setError("No customer data available. Please contact admin to upload customer records first.")
      setIsLoading(false)
      return
    }

    // Search for customer data
    const foundCustomer = allCustomerData.find(
      (customer) => customer.orderId.toUpperCase() === searchValue.toUpperCase(),
    )

    if (!foundCustomer) {
      setError("Order ID not found. Please check your Order ID or contact customer support.")
      setIsLoading(false)
      return
    }

    // Check if warranty already exists
    const existingWarranties = JSON.parse(localStorage.getItem("warrantyData") || "[]")
    const existingWarranty = existingWarranties.find(
      (warranty: WarrantyRecord) => warranty.orderId.toUpperCase() === searchValue.toUpperCase(),
    )

    if (existingWarranty) {
      setExistingWarranty(existingWarranty)
      setError("")
    } else {
      setCustomerData(foundCustomer)
    }

    setIsLoading(false)
  }

  const handleActivateWarranty = async () => {
    if (!customerData) return

    setIsLoading(true)

    // Simulate warranty activation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const activationDate = new Date()
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 6) // 6 months from activation

    const warrantyRecord: WarrantyRecord = {
      orderId: customerData.orderId,
      customerName: customerData.customerName,
      email: customerData.email,
      phone: customerData.phone,
      productName: customerData.productName,
      productModel: customerData.productModel,
      purchaseDate: customerData.purchaseDate,
      activationDate: activationDate.toISOString().split("T")[0],
      expiryDate: expiryDate.toISOString().split("T")[0],
      status: "Active",
    }

    // Save warranty record
    const existingWarranties = JSON.parse(localStorage.getItem("warrantyData") || "[]")
    const updatedWarranties = [...existingWarranties, warrantyRecord]
    localStorage.setItem("warrantyData", JSON.stringify(updatedWarranties))

    console.log("Warranty activated:", warrantyRecord)
    setWarrantyActivated(true)
    setIsLoading(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = "/admin"
  }

  const calculateDaysRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-100 rounded-full opacity-15"></div>
        <div className="absolute top-80 left-1/3 w-20 h-20 bg-purple-100 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-blue-50 rounded-full opacity-25"></div>
        <div className="absolute bottom-80 left-20 w-16 h-16 bg-indigo-50 rounded-full opacity-20"></div>
        <div className="absolute top-60 right-1/3 w-12 h-12 bg-cyan-100 rounded-full opacity-15"></div>
        <div className="absolute bottom-60 left-1/2 w-18 h-18 bg-purple-50 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-10 w-14 h-14 bg-blue-200 rounded-full opacity-10"></div>
        <div className="absolute top-32 right-1/4 w-22 h-22 bg-indigo-200 rounded-full opacity-12"></div>
        <div className="absolute bottom-32 left-1/4 w-26 h-26 bg-cyan-50 rounded-full opacity-18"></div>
      </div>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div
              className="flex items-center space-x-2 select-none animate-fade-in"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            >
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MAYSON</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Products
              </Link>
              <Link
                href="/warranty-claim"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Claims
              </Link>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-20 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Setup Your Warranty</h1>
            <p className="text-xl text-gray-600">
              Activate your 6-month warranty coverage and protect your MAYSON product investment.
            </p>
          </div>

          {!warrantyActivated ? (
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Find Your Order</CardTitle>
                <CardDescription className="text-center">
                  Enter your Order ID to locate your purchase and activate warranty coverage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Order ID</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Enter your Order ID (e.g., ORD001)"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 text-lg py-3"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleSearch} disabled={!searchValue || isLoading} className="w-full py-3 text-lg">
                  {isLoading ? "Searching..." : "Find My Order"}
                </Button>

                {/* Existing Warranty Display */}
                {existingWarranty && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-yellow-800 flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Warranty Already Active
                        </div>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-yellow-700">
                        This Order ID has already been used to activate warranty coverage.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Customer:</span>
                          <p className="text-gray-900">{existingWarranty.customerName}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Product:</span>
                          <p className="text-gray-900">{existingWarranty.productName}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Activated:</span>
                          <p className="text-gray-900">
                            {new Date(existingWarranty.activationDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Expires:</span>
                          <p className="text-gray-900">{new Date(existingWarranty.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="font-semibold text-blue-800">Warranty Status</span>
                          </div>
                          <span className="text-blue-700 font-medium">
                            {calculateDaysRemaining(existingWarranty.expiryDate)} days remaining
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link href="/warranty-claim">
                          <Button className="bg-blue-600 hover:bg-blue-700">File a Warranty Claim</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Customer Data Display */}
                {customerData && (
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Order Found!
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        Please verify your details below and activate your warranty.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <User className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-semibold text-gray-700">Customer Details</p>
                              <p className="text-gray-900">{customerData.customerName}</p>
                              <p className="text-gray-600 text-sm">{customerData.email}</p>
                              <p className="text-gray-600 text-sm">{customerData.phone}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Package className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-semibold text-gray-700">Product Details</p>
                              <p className="text-gray-900">{customerData.productName}</p>
                              <p className="text-gray-600 text-sm">Model: {customerData.productModel}</p>
                              <p className="text-gray-600 text-sm">Order: {customerData.orderId}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-blue-800">Warranty Coverage</span>
                        </div>
                        <p className="text-blue-700 text-sm">
                          Purchase Date: {new Date(customerData.purchaseDate).toLocaleDateString()}
                        </p>
                        <p className="text-blue-700 text-sm">Coverage: 6 months from activation date (today)</p>
                        <p className="text-blue-700 text-sm font-medium">
                          Warranty will expire on:{" "}
                          {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                      </div>

                      <Button
                        onClick={handleActivateWarranty}
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                      >
                        {isLoading ? "Activating warranty..." : "Activate Warranty Coverage"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl border-0 bg-green-50 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-800">Warranty Activated Successfully!</CardTitle>
                <CardDescription className="text-green-700">
                  Your 6-month warranty coverage is now active and ready to protect your investment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Warranty Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Customer:</span>
                      <p className="text-gray-900">{customerData?.customerName}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Product:</span>
                      <p className="text-gray-900">{customerData?.productName}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Order ID:</span>
                      <p className="text-gray-900">{customerData?.orderId}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Activation Date:</span>
                      <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-gray-700">Warranty Expires:</span>
                      <p className="text-gray-900 font-semibold">
                        {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Save your Order ID <strong>{customerData?.orderId}</strong> for future
                    reference. You'll need it to file warranty claims or check your coverage status.
                  </AlertDescription>
                </Alert>

                <div className="text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWarrantyActivated(false)
                        setCustomerData(null)
                        setSearchValue("")
                        setError("")
                      }}
                      className="flex-1 bg-transparent"
                    >
                      Setup Another Warranty
                    </Button>
                    <Link href="/warranty-claim" className="flex-1">
                      <Button className="w-full">File a Claim</Button>
                    </Link>
                  </div>
                  <Link href="/">
                    <Button variant="outline" className="w-full bg-transparent">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
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
