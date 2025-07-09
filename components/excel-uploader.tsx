"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { parseExcelFile, type CustomerData } from "@/lib/excel-handler"

interface ExcelUploaderProps {
  title: string
  description: string
  onFileUploaded: (data: CustomerData[]) => void
  expectedColumns: string[]
}

export function ExcelUploader({ title, description, onFileUploaded, expectedColumns }: ExcelUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [uploadedData, setUploadedData] = useState<CustomerData[]>([])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadStatus("idle")
    setErrorMessage("")

    try {
      console.log("Excel Uploader: Starting file parsing...")
      const data = await parseExcelFile(file)
      console.log("Excel Uploader: Parsed data:", data.length, "records")

      if (data.length === 0) {
        throw new Error("No data found in the Excel file")
      }

      // Validate required columns
      const firstRow = data[0]
      const missingColumns = expectedColumns.filter((col) => {
        const key = col.replace(/\s+/g, "").toLowerCase()
        return !Object.keys(firstRow).some((k) => k.replace(/\s+/g, "").toLowerCase().includes(key.toLowerCase()))
      })

      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(", ")}`)
      }

      setUploadedData(data)
      setUploadStatus("success")

      // Save to localStorage immediately
      localStorage.setItem("customerData", JSON.stringify(data))
      console.log("Excel Uploader: Data saved to localStorage")

      // Trigger storage event
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "customerData",
          newValue: JSON.stringify(data),
        }),
      )

      onFileUploaded(data)
      console.log("Excel Uploader: File upload completed successfully")
    } catch (error) {
      console.error("Excel Uploader: Error parsing file:", error)
      setErrorMessage(error instanceof Error ? error.message : "Failed to parse Excel file")
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSpreadsheet className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            {isUploading ? "Processing file..." : "Click to upload Excel file"}
          </p>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="excel-upload"
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => document.getElementById("excel-upload")?.click()}
          >
            {isUploading ? "Uploading..." : "Choose File"}
          </Button>
        </div>

        {uploadStatus === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Successfully uploaded {uploadedData.length} customer records!</AlertDescription>
          </Alert>
        )}

        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Expected columns:</p>
          <div className="grid grid-cols-2 gap-1">
            {expectedColumns.map((col) => (
              <span key={col} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {col}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
