# Admin Panel - Complete Documentation

## 🎯 Quick Access

### Admin Login
- **URL**: `http://localhost:5175/admin/login`
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 📊 Admin Dashboard Features

### 1. Projects Tab
- **View**: All projects in responsive grid (3 columns)
- **Add Project**: 
  - Title (text)
  - Description (textarea)
  - Image (file upload)
- **Delete**: Remove any project with confirmation
- **Image Storage**: `/backend/uploads/` folder
- **Display**: Full-width images with title and description

### 2. Clients Tab
- **View**: All client testimonials as cards (3 columns)
- **Add Client**:
  - Client Name (text)
  - Designation (job title)
  - Description/Testimonial (textarea)
  - Client Image (file upload)
- **Delete**: Remove client with confirmation
- **Image Display**: Circular profile images (w-24 h-24, rounded-full)
- **Image Upload**: Stored in `/backend/uploads/`

### 3. Contact Forms Tab
- **View**: Table format with all contact submissions
- **Columns**: Name, Email, Phone, City, Submitted Date, Action
- **Search**: By name or email (case-insensitive)
- **Delete**: Individual contact removal with confirmation
- **Sorting**: Newest submissions first
- **Count**: Total number of submissions displayed

### 4. Newsletter Tab
- **View**: Table format with all email subscribers
- **Columns**: Email Address, Subscribed Date, Action
- **Search**: By email address (case-insensitive)
- **Delete**: Remove individual subscriber with confirmation
- **Export**: Download all emails as `.txt` file
- **Count**: Total subscriber count with badge
- **Sorting**: Newest subscriptions first

---

## 🔐 Authentication & Security

### Login Flow
1. Visit `/admin/login`
2. Enter email and password
3. JWT token generated and stored in localStorage as `adminToken`
4. Redirected to `/admin/dashboard`
5. Token checked on protected routes
6. Logout removes token and redirects to login

### Token Storage
- **Location**: `localStorage.getItem("adminToken")`
- **Type**: JWT (JSON Web Token)
- **Usage**: Bearer token in Authorization header for API requests

---

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/login
Body: { email, password }
Response: { token }
```

### Projects
```
GET /api/projects
- Returns all projects

POST /api/projects
- Form Data: { title, description, image }
- Auth: Bearer token required
- Returns: Created project

DELETE /api/projects/:id
- Auth: Bearer token required
```

### Clients
```
GET /api/clients
- Returns all clients

POST /api/clients
- Form Data: { name, designation, description, image }
- Auth: Bearer token required
- Returns: Created client

DELETE /api/clients/:id
- Auth: Bearer token required
```

### Contacts
```
GET /api/contacts
- Auth: Bearer token required
- Returns: All contact submissions (sorted by newest first)

POST /api/contacts
- Body: { name, email, phone, city }
- Validation: All fields required

DELETE /api/contacts/:id
- Auth: Bearer token required
```

### Newsletter
```
GET /api/newsletter
- Auth: Bearer token required
- Returns: All subscribers (sorted by newest first)

POST /api/newsletter/subscribe
- Body: { email }
- Validation: Valid email format, unique email

DELETE /api/newsletter/:id
- Auth: Bearer token required
```

---

## 📁 File Upload Details

### Backend Setup
- **Directory**: `/backend/uploads/`
- **Static Route**: `/uploads/`
- **Max File Size**: Default (configurable in multer)
- **Supported**: Any image format

### Image URL Generation
- **Stored as**: `/uploads/timestamp-filename.ext`
- **Full URL**: `http://localhost:5000/uploads/timestamp-filename.ext`
- **Frontend Handling**: Automatically prepends base URL if needed

### Upload Flow
1. Select image file from admin form
2. Create FormData with file
3. POST to backend with `multipart/form-data`
4. Multer saves file to `/backend/uploads/`
5. Server returns image path (`/uploads/...`)
6. Frontend stores path in database
7. Display uses full URL: `http://localhost:5000/uploads/...`

---

## 🎨 UI Components Structure

### AdminDashboard (Main Container)
```
├── Header (Blue background, Logout button)
├── Tab Navigation (Projects, Clients, Contacts, Newsletter)
└── Content Area (Tab-specific component)
```

### ProjectManagement Component
```
├── Header with Add/Cancel button
├── Error message display
├── Add Project form (if showForm)
└── Projects grid display
```

### ClientManagement Component
```
├── Header with Add/Cancel button
├── Error message display
├── Add Client form (if showForm)
└── Clients card grid display
```

### ContactFormViewer Component
```
├── Header with total count
├── Search bar
├── Contacts table
└── Empty state message
```

### NewsletterViewer Component
```
├── Header with total count and Export button
├── Search bar
├── Newsletter table
└── Empty state message
```

---

## 🔄 User Workflows

### Adding a Project
1. Go to Admin Dashboard → Projects tab
2. Click "Add Project" button
3. Fill title, description
4. Select image file
5. Click "Add Project"
6. New project appears in grid immediately
7. Image served from `/uploads/` folder

### Managing Contact Submissions
1. Go to Admin Dashboard → Contact Forms tab
2. View all submissions in table
3. Search by name or email
4. Click "Delete" to remove submission
5. Confirm deletion

### Exporting Newsletter Emails
1. Go to Admin Dashboard → Newsletter tab
2. Click "Export Emails" button
3. Browser downloads `newsletter_emails.txt`
4. Contains one email per line

---

## 💾 Database Models

### Admin Schema
```javascript
{
  email: String,
  password: String (hashed with bcrypt)
}
```

### Client Schema
```javascript
{
  name: String,
  designation: String,
  description: String,
  image: String (path)
}
```

### Project Schema
```javascript
{
  title: String,
  description: String,
  image: String (path),
  timestamps: true
}
```

### Contact Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  city: String (required),
  timestamps: true
}
```

### Newsletter Schema
```javascript
{
  email: String (unique, lowercase, required),
  timestamps: true
}
```

---

## 🛠️ Troubleshooting

### Issue: Admin Login Fails
**Solution**: 
- Run `node seedAdmin.js` to recreate admin user
- Check MongoDB connection in `.env`
- Clear browser localStorage and try again

### Issue: Images Not Uploading
**Solution**:
- Verify `/backend/uploads/` directory exists
- Check file size and format
- Verify `multipart/form-data` header sent
- Check backend console for multer errors

### Issue: Images Not Displaying
**Solution**:
- Verify backend is running and serving `/uploads/` static folder
- Check image URLs in browser network tab
- Ensure path includes full URL: `http://localhost:5000/uploads/...`
- Clear browser cache

### Issue: Can't Access Admin Dashboard
**Solution**:
- Check token in localStorage
- Verify you're logged in (token should exist)
- Check browser console for 401 errors
- Login again and copy token value

---

## 📋 Validation Rules

### Contact Form (Public)
- Name: Required, text
- Email: Required, valid email format
- Phone: Required, minimum 10 digits
- City: Required, text

### Newsletter (Public)
- Email: Required, valid format, unique (no duplicates)

### Admin Forms
- Project: Title & description required
- Client: All fields required

---

## 🚀 Performance Tips

1. **Image Optimization**: Compress images before upload
2. **Database Indexing**: Email field in Newsletter is indexed
3. **Search Performance**: Search is client-side (fast for small datasets)
4. **Pagination**: Can be added later for large datasets

---

## 📝 Notes

- All timestamps use MongoDB native timestamps (`createdAt`, `updatedAt`)
- Dates displayed in browser locale format
- JWT secret configured in `.env`
- CORS enabled for frontend-backend communication
- Passwords hashed with bcrypt (10 salt rounds)

---

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5175`
- [ ] MongoDB connection successful
- [ ] Admin user created (`node seedAdmin.js`)
- [ ] Can login with `admin@example.com / admin123`
- [ ] Can view empty projects, clients, contacts, newsletter
- [ ] Can add new project with image
- [ ] Can add new client with image
- [ ] Can see contact form submissions
- [ ] Can export newsletter emails
- [ ] Can delete items with confirmation

---

## 🎓 For Future Development

### Recommended Enhancements
- [ ] Edit/Update functionality for projects and clients
- [ ] Pagination for large datasets
- [ ] Dashboard statistics (charts, counts)
- [ ] Email notifications
- [ ] Bulk operations (select multiple, delete all)
- [ ] File size limits and validation
- [ ] Image cropping/resizing
- [ ] Activity logging
- [ ] User roles and permissions
- [ ] Advanced search filters
- [ ] Data export (CSV, JSON)
- [ ] Admin password change feature

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready ✅
