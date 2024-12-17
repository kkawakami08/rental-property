# Property Rental Application

A **full-stack property rental platform** built using **Next.js**, **React**, **Tailwind CSS**, **MongoDB**, and **Mongoose**. This application allows users to list properties for rent, search listings, bookmark properties, message property owners, and share listings seamlessly.
This project is based on **Traversy Media's course "Next.js From Scratch"**.
[Link to Live Site](https://rental-property-pi.vercel.app/)

---

## 🚀 Features

- **List Properties for Rent**: Users can add detailed property listings with images and descriptions.
- **Bookmark Properties**: Save favorite properties for later viewing.
- **Message Property Owners**: Send inquiries directly to property owners.
- **Search Properties**: Search for rental properties based on various filters.
- **Google Authentication**: Sign up or log in using a Google account.
- **Share Listings**: Share property listings via:
  - Facebook
  - Twitter
  - Email
  - WhatsApp

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js with Next.js server actions
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: Google OAuth using NextAuth.js

---

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/property-rental-app.git
   cd property-rental-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```bash
   MONGODB_URI=your-mongodb-connection-string
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_URL_INTERNAL=http://localhost:3000
   NEXTAUTH_SECRET="openssl rand -base64 32" in terminal
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=
   NEXT_PUBLIC_MAPBOX_TOKEN=

   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚧 Future Improvements

- Add more advanced filters for property search.
- Implement property reviews and ratings.
- Enhance messaging with real-time chat functionality.

---

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:
- **Email**: k.kawakami08@gmail.com
- **LinkedIn**: [Kaori Kawakami](https://www.linkedin.com/in/k-kawakami/
)

---

**Happy Coding! 🚀**
