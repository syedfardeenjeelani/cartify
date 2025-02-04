# Cartify - Advanced Product Catalog with Dynamic Filtering and Real-Time Updates

## 🚀 Overview
Cartify is an advanced e-commerce product catalog that allows users to browse, filter, and view products dynamically. It features a shopping cart with real-time product availability updates, built with **Next.js**, **RTK Query** for API polling, and **Redux Toolkit** for state management.

## 🎯 Features Implemented
### ✅ Product Catalog
- Fetches and displays a list of products with:
  - **Name**
  - **Description**
  - **Price**
  - **Image**
  - **Stock Status**
- Supports **pagination** for handling large datasets.
- Each product has an **Add to Cart** button.

### ✅ Dynamic Filtering
- Users can filter products by:
  - **Category**
  - **Price Range** 
- **Real-time updates**: Filtering updates the product list instantly without reloading the page.
- Well-designed filter UI for **desktop and mobile views**.

### ✅ Shopping Cart
- Users can **add/remove** products.
- **Cart summary** displays:
  - Number of items
  - Total price
- **Persistent cart state** using Redux, maintaining cart items across pages.

### ✅ Real-Time Product Availability
- Implemented **RTK Query polling** to check if products are in stock.
- Shows "**Product Out of Stock**" if unavailable. 

### ✅ Product Detail Page
- Clicking on a product navigates to a **detailed page** with:
  - Large image
  - Detailed description
  - Price, rating, stock status and description 

### ✅ UI/UX Design (TailwindCSS)
- Fully **responsive design** for mobile, tablet, and desktop.
- Styled using **TailwindCSS** 


### ✅ State Management (Redux + RTK Query)
- **Redux Toolkit** for managing global state (cart items, total price, filters).
- **RTK Query** for efficient API fetching and polling.

## 🎁 Bonus Features Implemented
- **Search Autocomplete**: Provides suggestions as users type in the search bar.
- **Dark/Light Mode Toggle**: Users can switch between dark and light themes using Tailwind's dark mode utilities.

## 🛠️ Tech Stack
- **Next.js** - Frontend framework
- **Redux Toolkit & RTK Query** - State management and API polling
- **TailwindCSS** - Styling and responsiveness
- **DummyJSON API** - Mock API for product data

## 📦 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/syedfardeenjeelani/cartify.git
   cd cartify
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Live Demo
[Cartify Live Demo](https://cartify-six.vercel.app/)  
 