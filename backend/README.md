# MultiMart — PHP & MySQL REST API Backend Engine

This directory contains the production-ready **PHP & MySQL Database Backend API** for the **MultiMart E-Commerce Platform**.

---

## 🛠️ Tech Stack & Database Architecture
- **Language:** PHP 7.4+ / PHP 8.x (Vanilla PDO REST API)
- **Database Engine:** MySQL 5.7+ / MySQL 8.0 / MariaDB
- **Database Name:** `multimart_db`
- **Data Format:** JSON (`application/json`) with CORS headers

---

## 📁 Backend Directory Structure

```
backend/
├── schema.sql             # Complete MySQL DDL (Users, Products, Orders, Order_Items) & Seed Data
├── config/
│   └── database.php       # MySQL PDO Database Connection Class with Fallback
└── api/
    ├── products.php       # GET /api/products.php (Catalog, Filters, Search, Product Details)
    ├── auth.php           # POST /api/auth.php (User Login & Registration with Password Hashing)
    └── checkout.php       # POST /api/checkout.php (Multi-Item Order Creation & MySQL Transactions)
```

---

## 🚀 Quick Setup Instructions

1. **Database Import**:
   - Create a database named `multimart_db` in phpMyAdmin / MySQL Workbench.
   - Run `schema.sql` to create tables and insert initial product seed data.

2. **PHP Local Server**:
   - Serve the `backend` folder via XAMPP / WAMP / LocalWP or PHP CLI:
     ```bash
     php -S localhost:5000 -t backend
     ```
3. **React Frontend Connection**:
   - The React frontend automatically connects to `http://localhost:5000/api/products.php` and `checkout.php`.