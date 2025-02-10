# Image Gallery App

## 🚀 Overview
This is a React-based image gallery application built with **Vite**. It fetches images from the **Unsplash API**, supports **infinite scrolling**, and provides a responsive UI.

## 📋 Features
- **Infinite Scroll**: Loads images as the user scrolls.
- **Search Functionality**: Fetch images based on a search query.
- **Lazy Loading**: Uses React's `lazy` & `Suspense` for optimized performance.
- **Lazy Loading**: Skeleton UI during image loads.

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/shubhamchauhan4488/infinite-scroll-react.git
cd infinite-scroll-react
```

### 2️⃣ Install Dependencies
```sh
npm install --legacy-peer-deps
```
⚠️ **Note:** --legacy-peer-deps flag is used because 'react-loader-spinner' is not React@19 compatible

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the key:
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
```

⚠️ **Note:** You need to create an Unsplash API key from [Unsplash Developers](https://unsplash.com/developers) and place it as `VITE_UNSPLASH_ACCESS_KEY=your_key_value` in your `.env` file.

### 4️⃣ Build for Production
```sh
npm run build
```
### 5️⃣  Run the Development Server
```sh
npm run dev
```



## 🌍 Live Demo
You can access the deployed version of the app here:
🔗 **[Infinite Scroll React App](https://infinite-scroll-react-ten.vercel.app/)**

## 🏗️ Project Structure
```
📦 src
 ┣ 📂 components
 ┃ ┣ Layout.jsx
 ┃ ┣ ImageGrid.jsx
 ┃ ┣ ImageCard.jsx
 ┃ ┗ SearchBar.jsx
 ┣ 📂 context
 ┃ ┗ AppContext.jsx
 ┣ 📂 hooks
 ┃ ┗ useInfiniteScroll.jsx
 ┣ 📂 services
 ┃ ┗ unsplashService.js
 ┣ App.jsx
 ┣ main.jsx
 ┗ index.html
```
