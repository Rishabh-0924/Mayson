// Mock warranty database - simulates Excel sheet data
// In real implementation, this would be stored in a database or Excel file

interface WarrantyRecord {
  orderId: string
  customerName: string
  productName: string
  purchaseDate: string
  setupDate: string
  warrantyExpiry: string
  status: "Active" | "Expired"
}

// This simulates warranties that have been set up
// In real app, this would be populated when users complete warranty setup
export const mockWarrantyDatabase: Record<string, WarrantyRecord> = {
  // These are examples of warranties that have been set up
  ORD123456: {
    orderId: "ORD123456",
    customerName: "John Smith",
    productName: "Mayson Pro Headphones",
    purchaseDate: "2024-12-15",
    setupDate: "2024-12-20", // Setup 5 days after purchase
    warrantyExpiry: new Date(new Date("2024-12-20").getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Active",
  },
  ORD789012: {
    orderId: "ORD789012",
    customerName: "Sarah Johnson",
    productName: "Mayson Smart Watch",
    purchaseDate: "2024-12-10",
    setupDate: "2024-12-11", // Setup 1 day after purchase
    warrantyExpiry: new Date(new Date("2024-12-11").getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Active",
  },
  "+1-555-0123": {
    orderId: "ORD123456",
    customerName: "John Smith",
    productName: "Mayson Pro Headphones",
    purchaseDate: "2024-12-15",
    setupDate: "2024-12-20",
    warrantyExpiry: new Date(new Date("2024-12-20").getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Active",
  },
  "+1-555-0456": {
    orderId: "ORD789012",
    customerName: "Sarah Johnson",
    productName: "Mayson Smart Watch",
    purchaseDate: "2024-12-10",
    setupDate: "2024-12-11",
    warrantyExpiry: new Date(new Date("2024-12-11").getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Active",
  },
}

// Function to add new warranty record (simulates saving to Excel)
export function addWarrantyRecord(orderId: string, customerData: any): WarrantyRecord {
  const setupDate = new Date().toISOString().split("T")[0]
  const warrantyExpiry = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  const warrantyRecord: WarrantyRecord = {
    orderId: orderId.toUpperCase(),
    customerName: customerData.customerName,
    productName: customerData.productName,
    purchaseDate: customerData.purchaseDate,
    setupDate,
    warrantyExpiry,
    status: "Active",
  }

  // Add to mock database (in real app, this would save to Excel/database)
  mockWarrantyDatabase[orderId.toUpperCase()] = warrantyRecord
  if (customerData.phone) {
    mockWarrantyDatabase[customerData.phone] = warrantyRecord
  }

  return warrantyRecord
}
