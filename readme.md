<div align="center">

# <b>GATEWAY</b>

_Empowering seamless connections for unforgettable experiences._

<br>

<!-- Status Badges -->
<img src="https://img.shields.io/github/last-commit/subramani03/gateway" />
<img src="https://img.shields.io/badge/month-may-blue" />
<img src="https://img.shields.io/badge/javascript-99.3%25-yellow" />
<img src="https://img.shields.io/badge/languages-3-lightgrey" />

<br><br>

### 🔧 Built With

<!-- Tech Stack Badges -->
<img src="https://img.shields.io/badge/Express-black?logo=express" />
<img src="https://img.shields.io/badge/JSON-black" />
<img src="https://img.shields.io/badge/npm-red?logo=npm" />
<img src="https://img.shields.io/badge/Mongoose-orange?logo=mongoose" />
<img src="https://img.shields.io/badge/PostCSS-ec4a3f?logo=postcss" />
<img src="https://img.shields.io/badge/.env-yellow" />

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/DaisyUI-teal" />
<img src="https://img.shields.io/badge/TailwindCSS-blue?logo=tailwindcss" />
<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Cloudinary-blue?logo=cloudinary" />
<img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint" />
<img src="https://img.shields.io/badge/Axios-purple?logo=axios" />

</div>

---

## 🔗 Live Working Link  
[Click here to try Gateway Event System](https://gateway-main.onrender.com)

## 📚 Table of Contents

- [Overview](#📌-overview)
- [Getting Started](#🧰-getting-started)
  - [Prerequisites](#📋-prerequisites)
  - [Installation](🛠️-#installation)
  - [Setup](#setup)
    - [Backend](#📦-backend-setup)
    - [Frontend](#💻-frontend-setup)
- [Note](#📌-note)

---

## 📌 Overview

**Gateway** is a powerful developer tool designed to simplify the creation and management of event-driven applications.

### 🚀 Why Gateway?

This project streamlines the development process while enhancing user engagement and administrative efficiency.

**Key Features:**

- 🎨 **Streamlined Development Setup**: Essential libraries and tools for a modern development experience.
- 🔒 **User Authentication**: Secured access to protected routes improves security and UX.
- 📊 **Dynamic Event Management**: Admin interface for managing events and registrations.
- 💻 **Responsive UI Components**: Built using Tailwind CSS and DaisyUI for visual appeal.
- 🔗 **Seamless API Integration**: Ensures smooth communication between frontend and backend.

---

## 🧰 Getting Started

### 📋 Prerequisites

Ensure the following are installed:

- **Languages**: JavaScript, Node.js
- **Database**: MongoDB
- **Package Manager**: npm

---

## 🛠️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/subramani03/gateway.git

2. **Navigate to the project directory:**

   ```bash
   cd gateway
   ```

## Setup

### 📦 Backend Setup

1. **Navigate to the backend folder**

   ```bash
   cd backend
   ```

2. **Install backend dependencies**  
   Using [npm](https://www.npmjs.com/):

   ```
   npm install
   ```

3. **Configure Environment Variables**  
    Create a `.env` file in the `backend` directory and add your environment variables. Example:

   ```
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    ADMIN_USERNAME = admin 
    ADMIN_PASSWORD = your_admin_password
    TOKEN = give_any_string
    NODE_ENV = development
    CLOUDINARY_CLOUD_NAME = your_cloundinary_cloud_name
    CLOUDINARY_API_KEY = your_cloundinary_api_key
    CLOUDINARY_API_SECRET = your_cloundinary_api_secret
    ```

4. **Start the backend server**

   ```
   npm run dev
   ```

   The backend server will run on: `http://localhost:3000`

---

### 💻 Frontend Setup

1. **Navigate to the frontend folder**

   ```
   cd ../frontend
   ```

2. **Install frontend dependencies**

   ```
   npm install
   ```

3. **Start the frontend development server**

   ```
   npm run dev
   ```

   The frontend will be accessible at: `http://localhost:5173`

---

### 📌 Note

Make sure the backend is running **before** starting the frontend, as API calls depend on it.
