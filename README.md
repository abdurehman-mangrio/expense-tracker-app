# Expense Tracker App

## Description
React app for tracking expenses, budgets.

## Features
- Add expenses
- Category wise
- Charts/graphs
- Monthly summary
- Authentication (Firebase Auth) + user profile in Firestore

## Tech Stack
- React, Vite
- Firebase Auth
- Firestore

## Installation
```bash
npm install
npm run dev
```

## Demo Accounts (Firebase)

This app uses **Firebase Authentication** (email + password) and requires **email verification** to access protected pages (your UI shows “Email Not Verified” until the account is verified).

### Option A (recommended): Create demo users in Firebase Console
1. Open your Firebase project (the one configured in `src/firebase.js`):
   - `projectId`: `expence-tracker-eafeb`
2. Go to **Authentication → Users**
3. Create demo users:
   - set **Email**
   - set a **Password**
4. For each demo user, mark the email as **verified** (or verify via the email flow in your dev environment).
5. Ensure user documents can be read/written in Firestore. The app stores user data at:
   - `users/{uid}` (see `src/context/AuthContext.jsx`)

### Example demo accounts (you must create these in Firebase)
Add at least one user like:
- `demo1@example.com` (password: whatever you set in Firebase)
- `demo2@example.com` (password: whatever you set in Firebase)

### Option B: Google sign-in demo
If your Firebase project has Google sign-in enabled, you can sign in using the app’s “Google sign in” button:
- No password required for the demo user
- If `users/{uid}` does not exist yet, the app will create it automatically on first login

## Deployment note (Vercel)
- The app will still rely on your deployed Firebase project.
- Demo accounts must exist in that Firebase project (and be verified) for dashboards to work.

## License
MIT
