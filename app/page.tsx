"use client";

import { useEffect, useState } from "react";
import type React from "react";
import Link from "next/link";
import { Shield, ArrowRight, FileText, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Remove admin panel access - logo click does nothing now
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-green-100 rounded-full opacity-15 animate-bounce"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-80 left-1/3 w-20 h-20 bg-purple-100 rounded-full opacity-10 animate-ping"
          style={{
            transform: `translateY(${scrollY * 0.08}px)`,
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute bottom-40 right-10 w-28 h-28 bg-blue-50 rounded-full opacity-25 animate-pulse"
          style={{
            transform: `translateY(${scrollY * -0.12}px)`,
            animationDelay: "0.5s",
          }}
        />
        <div
          className="absolute bottom-80 left-20 w-16 h-16 bg-green-50 rounded-full opacity-20 animate-bounce"
          style={{
            transform: `translateY(${scrollY * -0.1}px)`,
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-60 right-1/3 w-12 h-12 bg-yellow-100 rounded-full opacity-15"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute bottom-60 left-1/2 w-18 h-18 bg-pink-100 rounded-full opacity-20"
          style={{
            transform: `translateY(${scrollY * -0.08}px)`,
            animationDelay: "2.5s",
          }}
        />
        <div
          className="absolute top-1/2 left-10 w-14 h-14 bg-indigo-100 rounded-full opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.12}px)`,
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Header - Fixed and Black */}
      <header className="bg-black shadow-sm fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-2 select-none"
              onClick={handleLogoClick}
            >
              <Shield className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">MASON</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="/products"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Products
              </a>
              <a
                href="#warranty"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Warranty
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20" />
          {/* Animated background shapes */}
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-100/10 rounded-full animate-pulse" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-100/10 rounded-full animate-pulse" />
          <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-green-100/10 rounded-full animate-pulse" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Claim Your Warranty
              <span className="block text-blue-600">With Ease</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Protect your product with our comprehensive warranty system. Set
              up your warranty on day one and claim it when you need support.
            </p>
          </div>
        </section>

        {/* Main Options */}
        <section id="warranty" className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Warranty Services
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Protect your investment with our comprehensive warranty coverage
                and easy claim process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Setup Warranty Card */}
              <Card className="relative overflow-hidden border-2 hover:border-blue-500 transition-all duration-500 group bg-white backdrop-blur-sm hover:shadow-2xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Setup Warranty
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Register your product warranty on day 1 of purchase. Get 6
                    months of comprehensive coverage.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse" />
                      Enter your Order ID or Phone Number
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse" />
                      View your purchase details
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse" />
                      Activate 6-month warranty coverage
                    </li>
                  </ul>
                  <Link href="/warranty-setup">
                    <Button className="w-full group/btn hover:shadow-lg transition-all duration-300">
                      Setup Warranty Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Claim Warranty Card */}
              <Card className="relative overflow-hidden border-2 hover:border-green-500 transition-all duration-500 group bg-white backdrop-blur-sm hover:shadow-2xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Claim Warranty
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Having issues with your product? Submit a warranty claim
                    with your order details and problem description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3 animate-pulse" />
                      Enter Order ID or Phone Number
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3 animate-pulse" />
                      Describe the problem you're facing
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3 animate-pulse" />
                      Upload current product images
                    </li>
                  </ul>
                  <Link href="/warranty-claim">
                    <Button
                      variant="outline"
                      className="w-full group/btn border-green-500 text-green-600 hover:bg-green-50 bg-transparent hover:shadow-lg transition-all duration-300"
                    >
                      Claim Warranty
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose MAYSON?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing premium quality products with
                exceptional warranty coverage and customer service.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-200 transition-colors duration-300">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Premium Quality
                </h4>
                <p className="text-gray-600">
                  High-quality materials and advanced technology in every
                  product.
                </p>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-200 transition-colors duration-300">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  6 Month Warranty
                </h4>
                <p className="text-gray-600">
                  Comprehensive warranty coverage for 6 months from your
                  purchase date.
                </p>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-200 transition-colors duration-300">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Easy Claims
                </h4>
                <p className="text-gray-600">
                  Simple and straightforward warranty claim process with quick
                  resolution.
                </p>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange-200 transition-colors duration-300">
                  <ArrowRight className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Support
                </h4>
                <p className="text-gray-600">
                  Quick customer support and warranty processing to get you back
                  up and running.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/95 backdrop-blur-sm text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {/* Footer Background Circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gray-100 rounded-full opacity-5"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full opacity-8"></div>
            <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-gray-200 rounded-full opacity-6"></div>
            <div className="absolute bottom-40 right-10 w-28 h-28 bg-gray-50 rounded-full opacity-10"></div>
            <div className="absolute top-60 right-1/3 w-16 h-16 bg-white rounded-full opacity-4"></div>
            <div className="absolute bottom-60 left-1/2 w-18 h-18 bg-gray-100 rounded-full opacity-7"></div>
            <div className="absolute top-1/2 left-20 w-14 h-14 bg-gray-300 rounded-full opacity-5"></div>
            <div className="absolute bottom-80 right-1/4 w-22 h-22 bg-white rounded-full opacity-9"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-6 w-6 animate-pulse" />
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
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Vacuum Sealer
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Lint Remover
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Coffee Maker
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Support</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Warranty Setup
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Warranty Claims
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Legal</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
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
    </div>
  );
}
