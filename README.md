# Recippy App

A beautiful, responsive recipe management application built with React, TypeScript, and Tailwind CSS.

## Features

### Recipe Discovery
- **Recipe Library**: Browse through a collection of recipes from breakfast to dessert
- **Category Filtering**: Find recipes by meal type (Breakfast, Lunch, Dinner, Dessert, Snack)
- **Search Functionality**: Quickly find recipes by title or ingredients
- **Detailed Recipe Cards**: View cook time, servings, difficulty level, and creation date

### Recipe Management
- **Add New Recipes**: Create your own recipes with detailed ingredients and instructions
- **Update Recipe**: Update any details of the recipe
- **Delete Recipe**: Delete recipe from collection
- **Recipe Form Validation**: Ensure all recipe data is properly formatted and complete
- **Dynamic Recipe View**: See detailed recipe instructions, ingredients, and metadata

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations while fetching recipes
- **Pagination**: Navigate through large recipe collections effortlessly

### Recipe Organization
- **Tags System**: Organize recipes with descriptive tags
- **Difficulty Levels**: Filter by Easy, Medium, or Hard difficulty
- **Time-based Information**: See cook time, and serving information at a glance

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/diffident016/recippy-web.git
cd recippy-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS