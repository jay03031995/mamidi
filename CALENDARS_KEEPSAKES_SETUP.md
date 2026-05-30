# Calendars & Keepsakes - Backend Implementation Guide

## 🎯 Overview
This guide explains how to make "Calendars" and "Keepsakes" visible and working from the backend.

## ✅ What Has Been Done

### 1. **Database Seeding Script Created**
   - **File**: `Mamidi_backend/scripts/seedDatabase.js`
   - Creates categories: Calendars, Keepsakes, Custom Products, Embroidery, Pouches, Bags
   - Adds sample products for each category
   - Properly sets the `Type` field for each product

### 2. **Backend Enhancements**
   - **Updated**: `Mamidi_backend/routes/products.js`
   - Added category/type filtering support
   - Added new endpoint: `/api/products/by-type/:type`
   - Supports case-insensitive filtering

### 3. **NPM Scripts Updated**
   - **Updated**: `Mamidi_backend/package.json`
   - Added `npm run seed` command

---

## 🚀 Implementation Steps

### Step 1: Install Dependencies (if not already done)
```bash
cd Mamidi_backend
npm install
```

### Step 2: Run the Seed Script
```bash
npm run seed
```

**Expected Output**:
```
✅ Connected to MongoDB
📂 Creating categories...
  ✅ Created category: Calendars
  ✅ Created category: Keepsakes
  ✅ Created category: Custom Products
  ...
📅 Creating sample Calendar products...
  ✅ Created: Illustrated 2026 Calendar - Nature
  ✅ Created: Illustrated 2026 Calendar - Stories
  ...
🎁 Creating sample Keepsakes products...
  ✅ Created: Personalized Memory Book
  ...
✨ Database seeding completed!
```

### Step 3: Start the Backend Server
```bash
npm run dev
```

---

## 🧪 Testing the API

### Get All Products
```bash
GET http://localhost:5000/api/products
```

### Get Products by Category (New Filtering)
```bash
GET http://localhost:5000/api/products?category=Calendars
GET http://localhost:5000/api/products?category=Keepsakes
GET http://localhost:5000/api/products?type=Custom%20Products
```

### Get Products by Type (New Endpoint)
```bash
GET http://localhost:5000/api/products/by-type/Calendars
GET http://localhost:5000/api/products/by-type/Keepsakes
GET http://localhost:5000/api/products/by-type/Custom%20Products
```

---

## 📱 Frontend Integration

The frontend Shop.jsx should automatically display these categories. To verify:

1. **Check the Shop page**: The categories should now show products
2. **Products are grouped by Type field** (Calendars, Keepsakes, etc.)
3. **Image URLs** are properly handled through Cloudinary

### Frontend API Calls
The Shop component fetches from:
- `GET /api/categories` - Gets all categories
- `GET /api/products` - Gets all products
- Products are filtered by `Type` field to match categories

---

## 📦 API Response Format

### Success Response
```json
{
  "data": [
    {
      "_id": "...",
      "title": "Illustrated 2026 Calendar - Nature",
      "Type": "Calendars",
      "category": "Calendars",
      "price": "299",
      "description": "Beautiful illustrated calendar...",
      "main": [],
      "sideimg1": [],
      "sideimg2": [],
      "sideimg3": [],
      "sideimg4": []
    }
  ],
  "total": 3,
  "page": 1,
  "limit": 20
}
```

---

## 🔄 Adding More Products

### Via API (Using Postman or cURL)
```bash
POST http://localhost:5000/api/products
Content-Type: multipart/form-data

Form Data:
- title: "Your Calendar Title"
- Type: "Calendars"
- category: "Calendars"
- price: "299"
- description: "Your description"
- Occasion: "New Year Gift"
- Material: "Premium Paper"
- Colour: "Multicolor"
- Dimensions: "8x10"
- Pages: "12"
- Print: "Full Color"
- main: [image file]
```

### Via Dashboard (Frontend)
- Add products through the admin dashboard
- Set Category/Type to "Calendars", "Keepsakes", or "Custom Products"
- Upload images

---

## 🎨 Product Categories Reference

| Category | Type | Description |
|----------|------|-------------|
| **Calendars** | Calendars | Illustrated 2026 calendars and wall calendars |
| **Keepsakes** | Keepsakes | Personalized memory books, story boxes, journals |
| **Custom Products** | Custom Products | Custom illustrations, personalized gifts |
| **Embroidery** | Embroidery | Embroidered items |
| **Pouches** | Pouches | Small pouches and accessories |
| **Bags** | Bags | Bags and totes |

---

## 🐛 Troubleshooting

### Issue: "Calendar products not visible"
- ✅ Run `npm run seed` to create sample products
- ✅ Check MongoDB connection
- ✅ Verify products have `Type: "Calendars"`

### Issue: "API returns empty array"
- ✅ Check if categories were created: `GET /api/categories`
- ✅ Check if products were created: `GET /api/products`
- ✅ Verify `Type` field matches category name exactly (case-sensitive in database)

### Issue: "Filter not working"
- ✅ Use case-insensitive query: `/api/products?category=calendars`
- ✅ Or use type endpoint: `/api/products/by-type/Calendars`

---

## 📋 What Products Include

Each product has:
- ✅ Title, Description, Price
- ✅ Type/Category (for filtering)
- ✅ Occasion, Material, Colour
- ✅ Dimensions, Pages, Print type
- ✅ Multiple image fields (main, sideimg1-4)
- ✅ Cloudinary image support

---

## 🎯 Next Steps

1. **Run seed script**: `npm run seed`
2. **Test API**: Try filtering endpoints
3. **Check frontend**: Visit `/shop` page
4. **Add more products**: Via API or dashboard
5. **Upload real images**: Update products with Cloudinary URLs

---

## 📖 File Changes Summary

| File | Changes |
|------|---------|
| `scripts/seedDatabase.js` | ✨ NEW - Database seeding script |
| `routes/products.js` | 🔄 UPDATED - Added category filtering |
| `package.json` | 🔄 UPDATED - Added seed script |

---

**Status**: ✅ Backend Implementation Complete
**Next**: Run `npm run seed` to populate the database
