# 🕵️ Witness Frontend (React)

This is the frontend for **Witness**, a full-stack web application built with **React + Vite**.

---

## 🎯 Description

Witness helps users **submit and document crime/incident reports** with media evidence, while admins **review and moderate** submitted reports.

The system supports two types of users:

### 👤 Regular Users
- Submit a crime report (with up to 3 images)
- View approved crimes in Home/Explore
- View crime details (including media)
- Track their own reports and statuses (My Reports / Dashboard)
- Delete their own reports

### 🛡️ Admins
- View pending crime reports
- Review full crime details + media
- Approve (توثيق) or Reject reports
- Manage users (activate / deactivate accounts)

Data is persisted in the backend using **PostgreSQL** and media is served from the backend uploads folder.

---

## 🧑‍💻 User Requirements

### ✅ Authentication
- Login and Sign Up using email and password
- Role-based flow (**user / admin**)
- The app remembers login sessions using **localStorage**

### ✅ Regular User Features
- Create a crime report with:
  - Title, city, date (required)
  - Type, description, short description, country (optional)
- Upload up to **3 images**
- View all **approved** crimes
- View crime details page
- View personal reports + status:
  - pending / approved / rejected
- Delete a report

### ✅ Admin Features
- View all pending crimes in Admin Dashboard
- Review each report (details + media)
- Approve or Reject a report (status update)
- View all users
- Activate / Deactivate user accounts

---

## 🛠️ Technologies
- React 19
- Vite
- React Router DOM
- Fetch API
- LocalStorage (for session persistence)
- Bootstrap Icons (UI icons)

---

## NEWS API KEY:
```
https://newsapi.org/v2/everything?q=Gaza&language=ar&apiKey=af7fcad65adb4774bd67ad77d15dda8f
```

## 🚀 Getting Started

### 1) Install dependencies
```bash
cd Witness
npm install
npm run dev
