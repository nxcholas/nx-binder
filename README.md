# nx-binder
A MERN Pokémon card binder app with image-optimized grids, collection tracking, and set diversity statistics.

---

## 🚀 Overview

**nx-binder** is a full-stack MERN application that lets users:

- Browse Pokémon TCG sets and cards  
- Build and manage a digital card binder  
- Track recently added cards  
- View collection diversity charts  
- Upload, organize, and view high-resolution card images  
- Authenticate and manage user accounts (JWT)

Tech used:
- MongoDB + Mongoose  
- Express + Node  
- React + Vite  
- Tailwind CSS  
- MUI  
- Axios

---

## 👾 Features

### Frontend
- Responsive 3x3 desktop card grid  
- Automatic 2x2 mobile grid  
- Lightweight image skeleton loaders  
- Recently added list  
- Card detail modal  
- Search and filtering UI  
- MUI Components / Charts Integration

### Backend
- RESTful API's
- Endpoints: `/cards`, `/sets`, `/users`, `/auth`  
- JWT-based authentication  
- MongoDB Atlas integration  
- Data seeder for importing sets  

---

## 📦 Tech Stack

| Layer      | Tools |
|-----------|-------|
| Frontend  | React, Vite, Tailwind, MUI, Axios |
| Backend   | Node, Express, Mongoose |
| Database  | MongoDB Atlas | TCGDex SDK |
| Auth      | JWT |
| Deploy    | Render / Netlify (optional) |

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nx-binder.git
cd nx-binder
