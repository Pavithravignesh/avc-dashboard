# ACV Dashboard

A full-stack web application dashboard to visualize and analyze ACV (Annual Contract Value) data. This project showcases modern frontend and backend practices, including data processing, state management, and smooth UI/UX.

---

## 🔧 Tech Stack

### 🖥 Frontend
- **React.js**
- **Redux Toolkit Query** (for API integration)
- **Redux** (for state management)
- **Shimmer UI** (for loading states)
- **Material UI (MUI)** (for component styling)

### 🌐 Backend
- **Node.js**
- **Express.js**
- **MongoDB** (for persistent storage)

---

## 📊 Features

- Interactive **stacked bar** and **donut charts** (via D3.js)
- Dynamic table summaries with **copy-to-clipboard** functionality
- Clean error handling and fallback states
- Responsive design for desktop, tablet, and mobile
- Shimmer-based loading placeholders for a smooth user experience

---

## 📁 Data Pipeline

1. Raw JSON data is parsed into JavaScript objects.
2. Cleaned and structured data is inserted into MongoDB.
3. The backend serves this data via Express API endpoints.
4. The frontend fetches and displays the data using RTK Query.

---

## 🚀 Getting Started

### 🔌 Backend

```bash
cd backend
npm install
npm run dev


## 🖥 Frontend
cd frontend
npm install
npm start
