# 📌 ADMIN PANEL CHEAT SHEET

## 🔐 Login Credentials
```
Email:    admin@example.com
Password: admin123
URL:      http://localhost:5175/admin/login
```

## 🌐 Server URLs
```
Backend:  http://localhost:5000
Frontend: http://localhost:5175
MongoDB:  Connected (Atlas)
```

## 🚀 Start Commands

### Terminal 1 - Backend
```bash
cd backend
node server.js
```

### Terminal 2 - Create Admin (First time only)
```bash
cd backend
node seedAdmin.js
```

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```

## 📊 Admin Dashboard Tabs

### 1️⃣ Projects Tab
- **Add**: Click "Add Project" → Title + Description + Image
- **View**: Grid layout with project cards
- **Delete**: Click "Delete" with confirmation
- **Images**: Stored in `/backend/uploads/`

### 2️⃣ Clients Tab
- **Add**: Click "Add Client" → Name + Designation + Description + Image
- **View**: Circular client testimonial cards
- **Delete**: Click "Delete" with confirmation
- **Images**: Circular profile pictures (w-24 h-24)

### 3️⃣ Contact Forms Tab
- **View**: Table with Name, Email, Phone, City, Date
- **Search**: By name or email (case-insensitive)
- **Delete**: Remove individual submissions
- **Count**: Total submissions badge

### 4️⃣ Newsletter Tab
- **View**: Table with Email, Date
- **Search**: By email address
- **Export**: Download all emails as `.txt` file
- **Delete**: Remove individual subscribers
- **Count**: Total subscribers badge

## 📁 Important Folders

```
backend/
├── uploads/          ← Image storage (auto-created)
├── src/models/       ← Database schemas
├── src/routes/       ← API endpoints
└── server.js         ← Main file

frontend/
├── src/pages/        ← Page components (Home, Login, Dashboard)
├── src/components/   ← Reusable components
└── src/components/admin/ ← Admin panel components
```

## 🔌 Key API Endpoints

### Auth
- `POST /api/auth/login` - Admin login

### Projects
- `GET /api/projects` - Fetch all
- `POST /api/projects` - Add with image
- `DELETE /api/projects/:id` - Delete

### Clients
- `GET /api/clients` - Fetch all
- `POST /api/clients` - Add with image
- `DELETE /api/clients/:id` - Delete

### Contacts
- `GET /api/contacts` - Fetch all
- `POST /api/contacts` - Submit form
- `DELETE /api/contacts/:id` - Delete

### Newsletter
- `GET /api/newsletter` - Fetch all
- `POST /api/newsletter/subscribe` - Subscribe
- `DELETE /api/newsletter/:id` - Delete

## 🖼️ Image Upload

**Supported Formats**: .jpg, .png, .gif, .webp
**Storage**: `/backend/uploads/`
**URL Format**: `http://localhost:5000/uploads/timestamp-filename.ext`
**Max Size**: Default (configurable)

## 💾 Database Collections

| Collection | Fields | Purpose |
|-----------|--------|---------|
| Admin | email, password (bcrypt) | Login credentials |
| Client | name, designation, description, image | Testimonials |
| Project | title, description, image, timestamps | Portfolio items |
| Contact | name, email, phone, city, timestamps | Form submissions |
| Newsletter | email (unique), timestamps | Subscribers |

## 🔒 Security Features

✅ Bcrypt password hashing (10 salt rounds)
✅ JWT token authentication
✅ CORS protection
✅ Input validation
✅ Multer file upload validation

## 🎨 UI Components

### AdminDashboard.jsx
Main container with header and tab navigation

### ProjectManagement.jsx
Form to add projects, grid to display

### ClientManagement.jsx
Form to add clients, card layout to display

### ContactFormViewer.jsx
Table view of submissions with search & delete

### NewsletterViewer.jsx
Table view of subscribers with export & delete

## 🛠️ Quick Fixes

### Backend won't start
```bash
# Check .env file
# Verify MongoDB URI
# Check Node.js version (need v20+)
node --version
```

### Create admin user again
```bash
cd backend
node seedAdmin.js
```

### Images not uploading
```bash
# Check uploads folder exists
# Verify multipart/form-data header
# Check file size
```

### Can't login
1. Clear localStorage: `Ctrl+Shift+Delete`
2. Run `node seedAdmin.js` again
3. Try login with same credentials

## 📊 Form Validations

### Contact Form (Public)
- Name: Required
- Email: Required + valid format
- Phone: Required + min 10 digits
- City: Required

### Newsletter (Public)
- Email: Required + valid format + unique

### Admin Forms
- Project: Title + Description + Image required
- Client: All fields required

## 🔄 Typical Workflows

### Add a Project
1. Dashboard → Projects tab
2. Click "Add Project"
3. Fill title, description, upload image
4. Click "Add Project"
5. ✅ Project in grid

### Manage Contacts
1. Dashboard → Contact Forms tab
2. View all submissions in table
3. Search by name/email if needed
4. Click "Delete" to remove

### Export Newsletter
1. Dashboard → Newsletter tab
2. Click "Export Emails"
3. `newsletter_emails.txt` downloads
4. Contains one email per line

## 📱 Responsive Breakpoints

- **Desktop**: 3-column layouts
- **Tablet (768px)**: 2-column layouts
- **Mobile (640px)**: 1-column (stacked)

All using Tailwind CSS responsive classes

## ⚡ Performance Notes

- JWT tokens stored in localStorage
- API calls use Axios with authorization headers
- FormData for multipart uploads
- MongoDB indexes on email fields
- Multer for secure file handling

## 📝 Required Environment Variables

```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key (optional, used by server)
```

## 🎓 Common Tasks Reference

| Task | Location | Steps |
|------|----------|-------|
| Login | `/admin/login` | Email + Password → Login |
| Add Project | Projects tab | "Add Project" → Fill form → Upload image |
| Add Client | Clients tab | "Add Client" → Fill form → Upload image |
| View Contacts | Contact Forms tab | Auto-loads all submissions |
| Search Contacts | Contact Forms tab | Type in search box |
| Delete Contact | Contact Forms tab | Click "Delete" → Confirm |
| View Newsletter | Newsletter tab | Auto-loads all subscribers |
| Export Emails | Newsletter tab | Click "Export Emails" button |
| Delete Subscriber | Newsletter tab | Click "Delete" → Confirm |
| Logout | Top right | Click "Logout" button |

## 🔗 File Navigation

```
.
├── backend/
│   ├── server.js ← Start here
│   ├── seedAdmin.js ← Run this first
│   ├── .env ← Config
│   └── src/
│       ├── models/ ← Database schemas
│       └── routes/ ← API endpoints
│
└── frontend/
    ├── vite.config.js ← Build config
    ├── tailwind.config.js ← Tailwind config
    └── src/
        ├── App.jsx ← Main routing
        ├── pages/ ← Page views
        └── components/ ← UI components
```

## 💡 Tips & Tricks

1. **Hot Reload**: Changes auto-refresh in browser (frontend)
2. **Search**: Case-insensitive search in Contact & Newsletter tabs
3. **Export**: Newsletter emails export includes all, one per line
4. **Images**: Both local uploads and external URLs supported
5. **Timestamps**: All dates shown in browser's local timezone

## 🚀 Production Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET in .env
- [ ] Set up MongoDB backups
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up environment-specific .env files
- [ ] Add logging/monitoring
- [ ] Test all features with real data

---

**Print this sheet for quick reference!** 📌

*Last Updated: January 2025*
