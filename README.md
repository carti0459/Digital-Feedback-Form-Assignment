# Digital-Feedback-Form-Assignment
# Feedback/Testimonial App

A simple web application using Node.js, Express, MongoDB, Vite + React, and Tailwind CSS. Users can submit feedback/testimonials and view them on a public page.

## Features
- Submit feedback/testimonials
- View all feedback
- Basic form validation
- Modern UI with React and Tailwind CSS

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)

## Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
3. Start the backend server:
   ```bash
   npx nodemon server.js
   # or
   node server.js
   ```

## Frontend Setup
1. Go to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Submit feedback via the "Submit Feedback" page.
- View all feedback via the "View Feedback" page.

## Notes
- The frontend expects the backend to run on `http://localhost:5000` by default. Adjust API URLs in `App.jsx` if needed.
- For production, consider deploying the backend and frontend separately and updating CORS settings.
