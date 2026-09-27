# Tank Clean Services

A full-stack web application for booking and managing professional tank-cleaning services. The project includes a customer-facing website, an admin dashboard, and a Node.js/Express backend connected to MongoDB.

## ✨ Features

### Customer Application
- User registration and login
- Cookie-based authentication using JWT
- Browse tank-cleaning services
- Submit tank-cleaning requests
- Select:
  - Tank type
  - Tank size
  - Preferred service date
  - Service address
  - Contact number
  - Additional notes
- Optional tank-image upload
- Automatic service-price estimation
- Razorpay booking-fee payment
- View profile information
- View previously submitted cleaning requests and their status

### Admin Dashboard
- Secure admin login
- Protected admin routes
- Admin dashboard
- View all customer service requests
- View customer and booking details
- Update request status:
  - Pending
  - Confirmed
  - Completed
  - Cancelled

### Backend
- REST API built with Express.js
- MongoDB database using Mongoose
- JWT authentication
- Password hashing with bcrypt
- Role-based authorization for admins
- Image uploads using Multer and Cloudinary
- Razorpay payment integration
- Service-layer and repository-layer architecture
- CORS and cookie-based authentication support

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Vite
- React Icons

### Admin Panel
- React
- React Router
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- Razorpay
- CORS
- Cookie Parser
- Nodemon

---

## 📁 Project Structure

```text
Tank_Clean_Services/
│
├── frontend/                 # Customer-facing React application
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Pages/
│       ├── assets/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── admin/                    # Admin React dashboard
│   ├── public/
│   └── src/
│       ├── Pages/
│       ├── components/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
└── backend/                  # Express.js REST API
    └── src/
        ├── config/
        ├── controller/
        ├── middlewares/
        ├── repository/
        ├── routes/
        ├── schema/
        ├── service/
        └── index.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB or a MongoDB Atlas database
- Cloudinary account
- Razorpay account

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Tank_Clean_Services.git
cd Tank_Clean_Services
```

Replace `YOUR_USERNAME/Tank_Clean_Services` with your actual GitHub repository path.

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

---

## 3. Install Admin Dependencies

Open another terminal:

```bash
cd admin
npm install
```

Start the admin application:

```bash
npm run dev
```

The admin Vite server normally runs at:

```text
http://localhost:5174
```

---

## 4. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

The current backend source imports `cookie-parser`. If it is not installed by the existing dependency tree, run:

```bash
npm install cookie-parser
```

Start the backend:

```bash
npm start
```

The backend uses the `PORT` value from your environment file.

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` directory:

```text
backend/
├── .env
├── package.json
└── src/
```

Add the following variables:

```env
PORT=3000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRY=2d

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

RAZORPAY_API_KEY=your_razorpay_key_id
RAZORPAY_API_SECRET=your_razorpay_key_secret
```

### Environment variable description

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the Express server |
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT authentication tokens |
| `JWT_EXPIRY` | JWT token expiration duration |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `RAZORPAY_API_KEY` | Razorpay key ID |
| `RAZORPAY_API_SECRET` | Razorpay secret |

> **Important:** Never commit `.env` files or API secrets to GitHub.

---

# 🔑 Authentication

The application uses JWT authentication stored in an HTTP-only cookie named:

```text
authToken
```

Customer authentication endpoints:

```text
POST /users/register
POST /users/login
POST /users/logout
GET  /users/profile
```

The backend uses role-based authorization. Users have either:

```text
User
Admin
```

A newly registered account receives the `User` role by default.

## Creating an Admin

There is no public API endpoint for assigning the `Admin` role. For development, create a normal user account and change its `role` field to:

```text
Admin
```

directly in your MongoDB database.

Example:

```json
{
  "role": "Admin"
}
```

Do not expose an admin-role assignment endpoint without appropriate authorization.

---

# 📡 API Endpoints

## User Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Login |
| POST | `/users/logout` | Logout |
| GET | `/users/profile` | Get logged-in user's profile |

## Request Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/requests/add` | Create a cleaning request | User |
| GET | `/requests/my` | Get logged-in user's requests | User |
| GET | `/requests` | Get all requests | Admin |
| PUT | `/requests/:id/status` | Update request status | Admin |
| GET | `/requests/:id` | Get a specific request | Authenticated user |

## Payment Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/payments/verify-booking` | Verify Razorpay booking payment |
| GET | `/payments/requests/:requestId` | Get payment information for a request |

---

# 💰 Pricing

The application contains predefined service prices based on tank type and tank size.

| Tank Type | Small | Medium | Large | Extra Large |
|---|---:|---:|---:|---:|
| Water Tank | ₹500 | ₹1,000 | ₹1,500 | ₹2,000 |
| Overhead Tank | ₹600 | ₹1,200 | ₹1,800 | ₹2,400 |
| Underground Tank | ₹700 | ₹1,400 | ₹2,100 | ₹2,800 |
| Septic Tank | ₹800 | ₹1,600 | ₹2,400 | ₹3,200 |
| Other | ₹500 | ₹1,000 | ₹1,500 | ₹2,000 |

The current booking fee is:

```text
₹200
```

The service estimate and booking fee are handled separately.

---

# 💳 Payment Flow

The booking/payment flow works approximately as follows:

```text
Customer
   │
   ▼
Submit Cleaning Request
   │
   ▼
Backend calculates estimated service price
   │
   ▼
Request is saved in MongoDB
   │
   ▼
Payment record is created
   │
   ▼
Razorpay order is created
   │
   ▼
Customer completes booking payment
   │
   ▼
Payment signature is verified
   │
   ▼
Payment marked as Paid
   │
   ▼
Request status becomes Confirmed
```

For testing, use Razorpay's test/sandbox credentials rather than production credentials.

---

# 🖼️ Image Upload

Customers can optionally upload a tank image while creating a service request.

The backend uses:

```text
Multer → Cloudinary → MongoDB
```

The uploaded image URL is stored with the service request.

---

# 🧩 Application Routes

## Customer Frontend

The main customer routes include:

```text
/
 /about
 /services
 /contact
 /login
 /register
 /request
 /dashboard
```

## Admin Frontend

The admin panel includes:

```text
/login
/
 /requests
```

Protected admin routes require a logged-in account with the `Admin` role.

---

# 🧪 Development

Run all three applications during development:

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

### Terminal 2 — Customer Frontend

```bash
cd frontend
npm install
npm run dev
```

### Terminal 3 — Admin Panel

```bash
cd admin
npm install
npm run dev
```

Expected local setup:

```text
Customer App → http://localhost:5173
Admin App    → http://localhost:5174
Backend API  → http://localhost:3000
```

The frontend and admin applications currently communicate with the backend at:

```text
http://localhost:3000
```

---

# 🏗️ Architecture

The backend is organized into multiple layers:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
MongoDB Schemas
  ↓
MongoDB
```

### Config
Stores database, server, Cloudinary, pricing, and payment configuration.

### Routes
Defines API endpoints.

### Controllers
Handles HTTP requests and responses.

### Services
Contains application/business logic.

### Repositories
Handles database operations.

### Schemas
Defines MongoDB/Mongoose models.

### Middlewares
Handles authentication, authorization, and file uploads.

---

# 🔒 Security Notes

- Passwords are hashed with bcrypt.
- Authentication tokens are stored in HTTP-only cookies.
- Admin routes require the `Admin` role.
- Razorpay payment signatures are verified on the backend.
- API credentials should be stored in environment variables.
- Do not commit `.env` files, database credentials, Cloudinary credentials, or Razorpay secrets.

For production deployment, also configure secure cookies, HTTPS, production CORS origins, and proper secret management.

---

# 📦 Production Build

Create production builds for the React applications with:

### Frontend

```bash
cd frontend
npm run build
```

### Admin

```bash
cd admin
npm run build
```

The generated production files will be placed in each application's `dist` directory.

---

# 🛠️ Useful Commands

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Admin

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm start
```

---

# 📝 Future Improvements

Possible improvements for future versions:

- Online service-provider/cleaner assignment
- Email/SMS notifications
- Appointment rescheduling
- Customer cancellation flow
- Advanced admin analytics
- Search and filtering for admin requests
- Better payment history
- Service-area/location management
- Production-ready environment-based API URLs
- Automated tests
- Deployment configuration
- Improved error handling and validation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push the branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

# 📄 License

This project currently uses the license configuration present in the backend package (`ISC`).

If this project is intended for public/open-source distribution, consider adding a dedicated `LICENSE` file to the repository.

---

## 👨‍💻 Project

**Tank Clean Services**

A full-stack tank-cleaning service booking and management platform built with React, Node.js, Express, MongoDB, Cloudinary, and Razorpay.
