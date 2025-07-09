"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { WarrantyRecord, ClaimRecord } from "@/lib/excel-handler";

export default function WarrantyClaimPage() {
  const [orderId, setOrderId] = useState("");
  const [warrantyData, setWarrantyData] = useState<WarrantyRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"search" | "claim" | "success">("search");
  const [problemDescription, setProblemDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setIsLoading(true);
    setError("");
    setWarrantyData(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Searching for warranty with Order ID:", orderId);

    // Check if warranty exists and is active
    const existingWarranties = JSON.parse(
      localStorage.getItem("warrantyData") || "[]"
    );
    const warranty = existingWarranties.find(
      (w: WarrantyRecord) => w.orderId.toUpperCase() === orderId.toUpperCase()
    );

    if (!warranty) {
      setError(
        "Warranty not yet set up for this Order ID. Please set up your warranty first."
      );
      setIsLoading(false);
      return;
    }

    // Check if warranty is still valid (within 6 months from activation)
    const today = new Date();
    const expiryDate = new Date(warranty.expiryDate);

    if (today > expiryDate) {
      setError(
        `Warranty expired on ${expiryDate.toLocaleDateString()}. Claims can only be submitted within the warranty period.`
      );
      setIsLoading(false);
      return;
    }

    console.log("Valid warranty found:", warranty);
    setWarrantyData(warranty);
    setStep("claim");
    setIsLoading(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
  };

  const handleSubmitClaim = async () => {
    if (!warrantyData || !problemDescription.trim()) {
      setError("Please describe the problem you're experiencing");
      return;
    }

    setIsLoading(true);

    // Simulate claim submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const claimId = `CLM${Date.now()}`;
    const submissionDate = new Date().toISOString().split("T")[0];

    const claimRecord: ClaimRecord = {
      claimId,
      orderId: warrantyData.orderId,
      customerName: warrantyData.customerName,
      productName: warrantyData.productName,
      problemDescription,
      submissionDate,
      status: "Under Review",
      uploadedFiles: uploadedFiles.map((f) => f.name).join(", "),
    };

    // Save claim record
    const existingClaims = JSON.parse(
      localStorage.getItem("claimData") || "[]"
    );
    const updatedClaims = [...existingClaims, claimRecord];
    localStorage.setItem("claimData", JSON.stringify(updatedClaims));

    console.log("Claim submitted:", claimRecord);
    setStep("success");
    setIsLoading(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/admin";
  };

  const calculateDaysRemaining = () => {
    if (!warrantyData) return 0;
    const today = new Date();
    const expiryDate = new Date(warrantyData.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-100 rounded-full opacity-15"></div>
        <div className="absolute top-80 left-1/3 w-20 h-20 bg-yellow-100 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-orange-50 rounded-full opacity-25"></div>
        <div className="absolute bottom-80 left-20 w-16 h-16 bg-red-50 rounded-full opacity-20"></div>
        <div className="absolute top-60 right-1/3 w-12 h-12 bg-pink-100 rounded-full opacity-15"></div>
        <div className="absolute bottom-60 left-1/2 w-18 h-18 bg-yellow-50 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-10 w-14 h-14 bg-orange-200 rounded-full opacity-10"></div>
        <div className="absolute top-32 right-1/4 w-22 h-22 bg-red-200 rounded-full opacity-12"></div>
        <div className="absolute bottom-32 left-1/4 w-26 h-26 bg-pink-50 rounded-full opacity-18"></div>
      </div>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
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
                href="/warranty-setup"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Warranty
              </Link>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-20 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              File a Warranty Claim
            </h1>
            <p className="text-xl text-gray-600">
              Submit a warranty claim for your MAYSON product and get the
              support you need.
            </p>
          </div>

          {step === "search" && (
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Find Your Warranty
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your Order ID to verify your warranty status and proceed
                  with your claim.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="Enter your Order ID (e.g., ORD001)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="text-lg py-3"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleSearch}
                  disabled={!orderId || isLoading}
                  className="w-full py-3 text-lg"
                >
                  {isLoading ? "Checking warranty..." : "Check Warranty Status"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>
                    Don't have your Order ID?{" "}
                    <Link
                      href="/warranty-setup"
                      className="text-blue-600 hover:underline"
                    >
                      Set up your warranty first
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {step === "claim" && warrantyData && (
            <div className="space-y-6">
              {/* Warranty Status Card */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Warranty Verified
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">
                        Customer:
                      </span>
                      <p className="text-gray-900">
                        {warrantyData.customerName}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Order ID:
                      </span>
                      <p className="text-gray-900">{warrantyData.orderId}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Product:
                      </span>
                      <p className="text-gray-900">
                        {warrantyData.productName}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Warranty Status:
                      </span>
                      <p className="text-green-600 font-medium">Active</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-800">
                          Warranty Period
                        </span>
                      </div>
                      <div className="flex items-center text-blue-700">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {calculateDaysRemaining()} days remaining
                        </span>
                      </div>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Activated:{" "}
                      {new Date(
                        warrantyData.activationDate
                      ).toLocaleDateString()}{" "}
                      | Expires:{" "}
                      {new Date(warrantyData.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Form */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Submit Your Claim</CardTitle>
                  <CardDescription>
                    Please provide details about the issue you're experiencing
                    with your product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="problem">Problem Description *</Label>
                    <Textarea
                      id="problem"
                      placeholder="Please describe the issue you're experiencing with your product in detail..."
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      className="min-h-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="files">
                      Upload Supporting Files (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload photos, videos, or documents
                      </p>
                      <Input
                        id="files"
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("files")?.click()
                        }
                      >
                        Choose Files
                      </Button>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Selected files:</p>
                        <ul className="list-disc list-inside">
                          {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep("search")}
                      className="flex-1 bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitClaim}
                      disabled={!problemDescription.trim() || isLoading}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      {isLoading ? "Submitting claim..." : "Submit Claim"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === "success" && (
            <Card className="shadow-xl border-0 bg-green-50 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-800">
                  Claim Submitted Successfully!
                </CardTitle>
                <CardDescription className="text-green-700">
                  Your warranty claim has been received and is now under review.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Claim Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">
                        Claim ID:
                      </span>
                      <p className="text-gray-900">CLM{Date.now()}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Order ID:
                      </span>
                      <p className="text-gray-900">{warrantyData?.orderId}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Product:
                      </span>
                      <p className="text-gray-900">
                        {warrantyData?.productName}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Submission Date:
                      </span>
                      <p className="text-gray-900">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-gray-700">
                        Status:
                      </span>
                      <p className="text-orange-600 font-medium">
                        Under Review
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    We'll review your claim and contact you within 2-3 business
                    days with an update.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep("search");
                        setOrderId("");
                        setWarrantyData(null);
                        setProblemDescription("");
                        setUploadedFiles([]);
                        setError("");
                      }}
                      className="flex-1 bg-transparent"
                    >
                      Submit Another Claim
                    </Button>
                    <Link href="/" className="flex-1">
                      <Button className="w-full">Return to Home</Button>
                    </Link>
                  </div>
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
                Premium home appliances with reliable warranty support and
                exceptional customer service.
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
  );
}
