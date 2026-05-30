# Quick API Reference - Calendars & Keepsakes

## 🚀 Quick Start

```bash
# From Mamidi_backend directory
npm run seed              # ✅ Populate database with categories & products
npm run dev              # Start development server
```

---

## 📡 API Endpoints

### Get All Products
```
GET /api/products
Response: { data: [products], total: 0, page: 1, limit: 20 }
```

### Filter by Category/Type
```
GET /api/products?category=Calendars
GET /api/products?type=Keepsakes
GET /api/products?type=Custom%20Products
```

### Get Products by Type (Direct Endpoint)
```
GET /api/products/by-type/Calendars
GET /api/products/by-type/Keepsakes
GET /api/products/by-type/Custom%20Products
```

### Search Products
```
GET /api/products?search=calendar
```

### Pagination
```
GET /api/products?page=1&limit=10
```

### Get Single Product
```
GET /api/products/:id
```

### Create Product (with images)
```
POST /api/products
Content-Type: multipart/form-data

Required Fields:
- title: string
- Type: string ("Calendars", "Keepsakes", etc)
- price: string
- description: string
- Occasion: string
- Material: string
- Colour: string
- Dimensions: string
- Pages: string
- Print: string
- main: file[]
- sideimg1: file[] (optional)
- sideimg2: file[] (optional)
- sideimg3: file[] (optional)
- sideimg4: file[] (optional)
```

### Update Product
```
PUT /api/products/:id
Content-Type: multipart/form-data
(Same fields as POST)
```

### Delete Product
```
DELETE /api/products/:id
```

---

## 📂 Get Categories
```
GET /api/categories
Response: { data: [categories] }
```

---

## ✨ Sample Requests (cURL)

### Get Calendars
```bash
curl "http://localhost:5000/api/products/by-type/Calendars"
```

### Get Keepsakes
```bash
curl "http://localhost:5000/api/products/by-type/Keepsakes"
```

### Search for "story"
```bash
curl "http://localhost:5000/api/products?search=story"
```

---

## 🗂️ Product Types Available After Seeding

- **Calendars** - Illustrated 2026 calendars
- **Keepsakes** - Personalized memory items
- **Custom Products** - Custom-made items
- **Embroidery** - Embroidered products
- **Pouches** - Small pouches
- **Bags** - Bags and totes

---

## 💡 Frontend Integration

The Shop page automatically:
1. Fetches categories from `/api/categories`
2. Fetches all products from `/api/products`
3. Groups products by `Type` field
4. Displays each category section

Products automatically appear in frontend when they have proper `Type` field set.

---

## 🔗 Used By Frontend

File: `src/pages/Shop.jsx`

```javascript
// Fetches categories
const catRes = await fetch("https://mamidi-backend-qyso.onrender.com/api/categories");

// Fetches products
const prodRes = await fetch("https://mamidi-backend-qyso.onrender.com/api/products");

// Filters by Type field
const filteredProducts = products.filter(p => 
  normalize(p.Type) === normalize(categoryName)
);
```

---

## 📊 Expected Database Structure

```
Collections:
├── Products
│   ├── title: "Illustrated 2026 Calendar - Nature"
│   ├── Type: "Calendars"
│   ├── category: "Calendars"
│   ├── price: "299"
│   ├── description: "..."
│   └── main: [{ type: "file", value: "url" }]
│
└── Categories
    ├── name: "Calendars"
    ├── slug: "calendars"
    ├── name: "Keepsakes"
    └── slug: "keepsakes"
```

---

## ✅ Verification Checklist

- [ ] Run `npm run seed` successfully
- [ ] No MongoDB connection errors
- [ ] Products created in database
- [ ] Categories created
- [ ] API returns products with proper `Type` field
- [ ] Frontend Shop page displays Calendars section
- [ ] Frontend Shop page displays Keepsakes section
- [ ] Images display correctly (if URLs provided)

