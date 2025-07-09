"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Database, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelUploader } from "@/components/excel-uploader"
import { createWarrantyExcel, createClaimsExcel, downloadExcel } from "@/lib/excel-handler"
import type { CustomerData } from "@/lib/excel-handler"
import { AdminLogin } from "@/components/admin-login"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerData[]>([])
  const [warrantyCount, setWarrantyCount] = useState(0)
  const [claimCount, setClaimCount] = useState(0)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem("adminAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }

    // Load existing counts
    updateCounts()
  }, [])

  const updateCounts = () => {
    const warranties = JSON.parse(localStorage.getItem("warrantyData") || "[]")
    const claims = JSON.parse(localStorage.getItem("claimData") || "[]")
    setWarrantyCount(warranties.length)
    setClaimCount(claims.length)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    sessionStorage.setItem("adminAuthenticated", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuthenticated")
  }

  const handleCustomerDataUpload = (data: CustomerData[]) => {
    console.log("Admin: Received customer data:", data.length, "records")
    setCustomerData(data)

    // Ensure data is saved to localStorage
    localStorage.setItem("customerData", JSON.stringify(data))
    console.log("Admin: Customer data saved to localStorage")

    // Trigger storage event for other tabs/components
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "customerData",
        newValue: JSON.stringify(data),
      }),
    )

    console.log("Admin: Storage event dispatched")
  }

  const downloadWarrantyExcel = () => {
    const storedWarranties = localStorage.getItem("warrantyData")
    const warranties = storedWarranties ? JSON.parse(storedWarranties) : []

    if (warranties.length === 0) {
      alert("No warranty data to download")
      return
    }

    const excelData = createWarrantyExcel(warranties)
    downloadExcel(excelData, `warranties_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  const downloadClaimsExcel = () => {
    const storedClaims = localStorage.getItem("claimData")
    const claims = storedClaims ? JSON.parse(storedClaims) : []

    if (claims.length === 0) {
      alert("No claim data to download")
      return
    }

    const excelData = createClaimsExcel(claims)
    downloadExcel(excelData, `claims_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  const customerColumns = [
    "Order ID",
    "Customer Name",
    "Email",
    "Phone",
    "Purchase Date",
    "Product Name",
    "Product Model",
    "Order Value",
  ]

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-15"></div>
        <div className="absolute top-80 left-1/3 w-20 h-20 bg-violet-100 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-purple-50 rounded-full opacity-25"></div>
        <div className="absolute bottom-80 left-20 w-16 h-16 bg-pink-50 rounded-full opacity-20"></div>
        <div className="absolute top-60 right-1/3 w-12 h-12 bg-fuchsia-100 rounded-full opacity-15"></div>
        <div className="absolute bottom-60 left-1/2 w-18 h-18 bg-violet-50 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-1/4 w-22 h-22 bg-pink-200 rounded-full opacity-12"></div>
        <div className="absolute bottom-32 left-1/4 w-26 h-26 bg-fuchsia-50 rounded-full opacity-18"></div>
        <div className="absolute bottom-96 right-1/3 w-36 h-36 bg-purple-300 rounded-full opacity-6"></div>
      </div>
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Upload customer data and manage warranty system</p>
          </div>

          <div className="grid gap-6 mb-8">
            {/* Customer Data Upload */}
            <ExcelUploader
              title="Upload Customer Data"
              description="Upload your Excel file with customer order information. This data will be used for warranty setup validation."
              onFileUploaded={handleCustomerDataUpload}
              expectedColumns={customerColumns}
            />
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{customerData.length}</div>
                <div className="text-sm text-gray-600">Customer Records</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{warrantyCount}</div>
                <div className="text-sm text-gray-600">Warranties Activated</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{claimCount}</div>
                <div className="text-sm text-gray-600">Claims Submitted</div>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download Data
              </CardTitle>
              <CardDescription>Download updated warranty and claim data as Excel files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button onClick={downloadWarrantyExcel} className="w-full">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Download Warranty Data
                </Button>
                <Button onClick={downloadClaimsExcel} variant="outline" className="w-full bg-transparent">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Download Claims Data
                </Button>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Warranty Data:</strong> Contains all warranty setups with expiry dates
                </p>
                <p>
                  <strong>Claims Data:</strong> Contains all warranty claims with problem descriptions and status
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data Management
              </CardTitle>
              <CardDescription>View and manage your warranty system data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    updateCounts()
                    const customerData = localStorage.getItem("customerData")
                    const customerCount = customerData ? JSON.parse(customerData).length : 0
                    alert(
                      `System refreshed!\nCustomer Records: ${customerCount}\nWarranties: ${warrantyCount}\nClaims: ${claimCount}`,
                    )
                  }}
                  className="w-full bg-transparent"
                >
                  Refresh System Data
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const customerData = localStorage.getItem("customerData")
                    const warrantyData = localStorage.getItem("warrantyData")
                    const claimData = localStorage.getItem("claimData")
                    console.log("=== SYSTEM DEBUG INFO ===")
                    console.log("Customer Data:", customerData ? JSON.parse(customerData) : "No data")
                    console.log("Warranty Data:", warrantyData ? JSON.parse(warrantyData) : "No data")
                    console.log("Claim Data:", claimData ? JSON.parse(claimData) : "No data")
                    alert("Debug information logged to console. Press F12 to view.")
                  }}
                  className="w-full bg-transparent"
                >
                  Debug System Data
                </Button>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>System Status:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Customer data is loaded and ready for warranty setup</li>
                  <li>Warranty period: 6 months from activation date</li>
                  <li>Claims can be submitted within warranty period</li>
                  <li>All data is automatically saved and downloadable</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
