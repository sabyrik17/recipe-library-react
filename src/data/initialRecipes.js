const initialRecipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    category: "Dinner",
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    description: "A quick pasta for evenings when you want something warm and filling.",
    ingredients: [
      "200 g pasta",
      "3 garlic cloves",
      "200 ml cream",
      "50 g parmesan",
      "Salt and black pepper",
    ],
    steps: [
      "Boil the pasta until al dente.",
      "Cook garlic in a pan for 1 minute.",
      "Add cream, parmesan, salt, and pepper.",
      "Mix in the pasta and serve hot.",
    ],
  },
  {
    id: 2,
    title: "Chicken Rice Bowl",
    category: "Lunch",
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    description: "Balanced bowl with chicken, rice, and vegetables for a fast lunch.",
    ingredients: [
      "1 cup cooked rice",
      "150 g chicken fillet",
      "1 carrot",
      "1 cucumber",
      "2 tbsp soy sauce",
    ],
    steps: [
      "Cook the chicken until golden.",
      "Slice the vegetables.",
      "Place rice in a bowl and add chicken and vegetables.",
      "Finish with soy sauce.",
    ],
  },
  {
    id: 3,
    title: "Berry Yogurt Parfait",
    category: "Breakfast",
    time: "10 min",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80",
    description: "Light breakfast with berries, yogurt, and crunchy granola.",
    ingredients: [
      "200 g yogurt",
      "1 cup mixed berries",
      "3 tbsp granola",
      "1 tsp honey",
    ],
    steps: [
      "Add yogurt to a glass.",
      "Layer berries and granola.",
      "Repeat the layers.",
      "Top with honey before serving.",
    ],
  },
  {
    id: 4,
    title: "Chocolate Mug Cake",
    category: "Dessert",
    time: "8 min",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80",
    description: "Small chocolate dessert when you need something sweet right away.",
    ingredients: [
      "4 tbsp flour",
      "2 tbsp cocoa powder",
      "2 tbsp sugar",
      "3 tbsp milk",
      "2 tbsp oil",
    ],
    steps: [
      "Mix all ingredients in a mug.",
      "Microwave for 60 to 90 seconds.",
      "Let it rest for 1 minute.",
      "Serve warm.",
    ],
  },
];

export default initialRecipes;
