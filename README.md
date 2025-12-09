# Full Stack Application - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ installed
- MongoDB Atlas account (connection string provided in `.env`)
- Two terminal windows

### Step 1: Start Backend Server
```bash
cd backend
node server.js
```
✅ Server will run on `http://localhost:5000`

### Step 2: Create Default Admin User (First Time Only)
In a separate terminal:
```bash
cd backend
node seedAdmin.js
```
✅ Creates admin user: `admin@example.com` / `admin123`

### Step 3: Start Frontend Dev Server
```bash
cd frontend
npm run dev
```
✅ Frontend will run on `http://localhost:5175`

---

## 📱 Application Features

### Public Pages
- **Home** (`/`) - Hero section, client testimonials, contact form
- **Projects** (`/projects`) - Project showcase gallery
- **Navbar** - Navigation with integrated newsletter subscription

### Admin Panel
- **Admin Login** (`/admin/login`) - JWT authentication
- **Admin Dashboard** (`/admin/dashboard`) - Complete management system

---

## 🔐 Admin Panel Features

### 1. **Admin Login**
- Navigate to: `http://localhost:5175/admin/login`
- Default Credentials:
  - Email: `admin@example.com`
  - Password: `admin123`
- JWT token stored in localStorage as `adminToken`

### 2. **Project Management**
- ✅ View all projects
- ✅ Add new project with image upload
- ✅ Delete project
- **Form Fields:**
  - Project Title
  - Description
  - Project Image (file upload)

### 3. **Client Management**
- ✅ View all client testimonials
- ✅ Add new client with profile image
- ✅ Delete client
- **Form Fields:**
  - Client Name
  - Designation (Job Title)
  - Description/Testimonial
  - Client Image (file upload)

### 4. **Contact Form Viewer**
- ✅ View all contact submissions
- ✅ Search by name or email
- ✅ Delete contact submissions
- **Displayed Fields:**
  - Name
  - Email
  - Phone
  - City
  - Submission Date

### 5. **Newsletter Viewer**
- ✅ View all newsletter subscribers
- ✅ Search by email
- ✅ Delete subscription
- ✅ Export all emails as `.txt` file
- **Displayed Fields:**
  - Email Address
  - Subscription Date

---

## 🗂️ Project Structure

```
backend/
├── server.js                 # Main Express server
├── seedAdmin.js              # Create default admin user
├── seedClients.js            # Seed sample client data
├── uploads/                  # Folder for uploaded images
└── src/
    ├── models/
    │   ├── Admin.js         # Admin authentication schema
    │   ├── Client.js        # Client testimonial schema
    │   ├── Contact.js       # Contact form schema
    │   ├── Newsletter.js     # Newsletter subscriber schema
    │   └── Project.js       # Project schema
    └── routes/
        ├── authRoutes.js    # Admin login endpoint
        ├── clientRoutes.js  # Client CRUD endpoints
        ├── contactRoutes.js # Contact form endpoints
        ├── newsletterRoutes.js # Newsletter endpoints
        └── projectRoutes.js # Project CRUD endpoints

frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx         # Homepage with hero, clients, contact form
│   │   ├── ProjectsPage.jsx # Projects showcase
│   │   ├── AdminLogin.jsx   # Admin authentication
│   │   └── AdminDashboard.jsx # Main admin panel
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation + newsletter signup
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ClientsSection.jsx
│   │   ├── ContactForm.jsx  # Public contact form
│   │   ├── ProjectCard.jsx
│   │   └── admin/
│   │       ├── ProjectManagement.jsx
│   │       ├── ClientManagement.jsx
│   │       ├── ContactFormViewer.jsx
│   │       └── NewsletterViewer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-admin` - Create new admin user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add project (with file upload)
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Add client (with file upload)
- `DELETE /api/clients/:id` - Delete client

### Contact Form
- `GET /api/contacts` - Get all contact submissions
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:id` - Delete submission

### Newsletter
- `GET /api/newsletter` - Get all subscribers
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `DELETE /api/newsletter/:id` - Delete subscriber

---

## 🎨 Tech Stack

### Frontend
- React 19.2.0
- React Router 6.30.2
- Vite 7.2.5
- Tailwind CSS 3.4.18
- Axios 1.13.2

### Backend
- Express 5.2.1
- MongoDB + Mongoose 7.0.0
- bcrypt (password hashing)
- JWT (authentication)
- Multer (file uploads)
- Node.js v20.19.2

---

## 📧 Email Validation

- **Contact Form:** Email format validation required
- **Newsletter:** Email must be unique (duplicate prevention at database level)

---

## 🖼️ Image Upload & Storage

- Images stored in `/backend/uploads/` directory
- Served as static files via `/uploads/` route
- Supports: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Admin components handle both uploaded and external URLs

---

## 🔒 Security Notes

- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens with secret key for authentication
- Admin routes protected with Bearer token verification
- CORS enabled for frontend-backend communication

---

## 🧪 Testing the Admin Panel

### 1. Login
1. Go to `http://localhost:5175/admin/login`
2. Enter: `admin@example.com` / `admin123`
3. Get redirected to dashboard

### 2. Add Project
1. Click "Add Project" button
2. Fill in: Title, Description, Image
3. Project appears in grid immediately
4. Images served from `/uploads/` folder

### 3. Add Client
1. Click "Add Client" button
2. Fill in: Name, Designation, Description, Image
3. Client appears as circular card
4. Try deleting and verify removal

### 4. View Contacts
1. Switch to "Contact Forms" tab
2. See all public contact submissions
3. Search by name/email
4. Delete individual submissions

### 5. View Newsletter
1. Switch to "Newsletter" tab
2. See all email subscribers
3. Click "Export Emails" to download `.txt` file
4. Delete individual subscriptions

---

## ⚠️ Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Verify port 5000 is not in use
- Ensure Node.js v20+ is installed

### Images not uploading
- Verify `/backend/uploads/` directory exists
- Check file upload size limits
- Confirm `Content-Type: multipart/form-data` header

### Admin login fails
- Run `node seedAdmin.js` to recreate admin user
- Check MongoDB connection
- Clear localStorage and try again

### Frontend can't reach backend
- Verify backend is running on `http://localhost:5000`
- Check API URLs in components (should be `http://localhost:5000`)
- Ensure CORS is enabled on backend

---

## 📝 Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://admin:admin%40123@cluster0.ohhrolu.mongodb.net/placement_practice?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

---

## ✅ Complete Feature Checklist

- ✅ Public homepage with hero, testimonials, contact form
- ✅ Project showcase page
- ✅ Newsletter subscription (navbar integrated)
- ✅ Contact form with validation
- ✅ Admin login with JWT authentication
- ✅ Project management (CRUD with image upload)
- ✅ Client management (CRUD with image upload)
- ✅ Contact submissions viewer with search & delete
- ✅ Newsletter subscribers viewer with export
- ✅ Image upload to server with URL generation
- ✅ Responsive design with Tailwind CSS
- ✅ Error handling and validation
- ✅ Loading states and user feedback

---

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add edit/update functionality for projects and clients
- [ ] Implement dashboard analytics (counts, charts)
- [ ] Add email notifications for admin
- [ ] Implement user roles (super admin, moderator)
- [ ] Add pagination for large datasets
- [ ] Implement image optimization and compression
- [ ] Add bulk operations (delete multiple)
- [ ] Implement admin activity logging
- [ ] Add password change functionality
- [ ] Implement email verification for newsletter

---

**Created:** January 2025  
**Version:** 1.0.0  
**Last Updated:** January 2025
