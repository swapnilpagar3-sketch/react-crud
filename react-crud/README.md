# React CRUD App

A Product CRUD application built with **React 18** and **Vite**. Data is stored in the browser's `localStorage`, so no backend or database is needed.

## Requirements
- Node.js 18 or newer  https://nodejs.org

## Run
```
cd react-crud
npm install
npm run dev
```
Open http://localhost:3000

## Build for production
```
npm run build
npm run preview
```

## Features
- Create, Read, Update, Delete products
- Search by name or category
- Form validation
- Data persists after page refresh

## Structure
```
index.html
vite.config.js
package.json
public/favicon.svg
src/
  main.jsx                  entry point
  App.jsx                   main component
  index.css                 styles
  hooks/useProducts.js      CRUD logic + localStorage
  components/ProductForm.jsx
  components/ProductTable.jsx
```

## Connecting to a real API
Replace the functions in `src/hooks/useProducts.js` with `fetch`/`axios` calls
(GET / POST / PUT / DELETE) to your backend.
