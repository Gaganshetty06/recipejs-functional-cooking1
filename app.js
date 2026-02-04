(() => {

const recipes = [
  {
    id: "1",
    title: "Paneer Butter Masala",
    type: "veg",
    ingredients: ["paneer", "butter", "tomato"],
  },
  {
    id: "2",
    title: "Chicken Curry",
    type: "nonveg",
    ingredients: ["chicken", "onion", "spices"],
  },
  {
    id: "3",
    title: "Veg Biryani",
    type: "veg",
    ingredients: ["rice", "vegetables", "spices"],
  }
];

let currentFilter = "all";
let searchQuery = "";
let favorites =
  JSON.parse(localStorage.getItem("recipeFavorites")) || [];

const container = document.querySelector("#recipe-container");
const searchInput = document.querySelector("#search-input");
const clearBtn = document.querySelector("#clear-search");
const counter = document.querySelector("#recipe-counter");

/* ---------------- RENDER ---------------- */

const createCard = recipe => {
  const isFav = favorites.includes(recipe.id);

  return `
  <div class="card">
    <h3>${recipe.title}</h3>
    <p>${recipe.ingredients.join(", ")}</p>

    <button 
      class="favorite-btn ${isFav ? "active" : ""}"
      data-id="${recipe.id}">
      ❤️
    </button>
  </div>
  `;
};

const renderRecipes = list => {
  container.innerHTML =
    list.map(createCard).join("");
};

/* ---------------- FILTER ---------------- */

const filterRecipes = list => {
  if (currentFilter === "favorites")
    return list.filter(r =>
      favorites.includes(r.id)
    );

  if (currentFilter === "all")
    return list;

  return list.filter(r =>
    r.type === currentFilter
  );
};

/* ---------------- SEARCH ---------------- */

const searchRecipes = list => {
  if (!searchQuery) return list;

  return list.filter(r =>
    r.title.toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    r.ingredients.some(i =>
      i.toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );
};

/* ---------------- COUNTER ---------------- */

const updateCounter = shown => {
  counter.textContent =
   `Showing ${shown} of ${recipes.length} recipes`;
};

/* ---------------- UPDATE DISPLAY ---------------- */

const updateDisplay = () => {
  let result = [...recipes];

  result = searchRecipes(result);
  result = filterRecipes(result);

  updateCounter(result.length);
  renderRecipes(result);
};

/* ---------------- FAVORITES ---------------- */

const toggleFavorite = id => {

  if (favorites.includes(id))
    favorites = favorites.filter(f => f !== id);
  else
    favorites.push(id);

  localStorage.setItem(
    "recipeFavorites",
    JSON.stringify(favorites)
  );

  updateDisplay();
};

/* ---------------- EVENTS ---------------- */

let timer;

searchInput.addEventListener("input", e => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    searchQuery = e.target.value;
    clearBtn.classList.toggle("hidden", !searchQuery);
    updateDisplay();
  }, 300);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  clearBtn.classList.add("hidden");
  updateDisplay();
});

document.addEventListener("click", e => {
  if (e.target.dataset.filter) {
    currentFilter = e.target.dataset.filter;
    updateDisplay();
  }

  if (e.target.classList.contains("favorite-btn")) {
    toggleFavorite(e.target.dataset.id);
  }
});

/* ---------------- INIT ---------------- */

updateDisplay();

})();

const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Function to render recipes
const renderRecipes = (recipesToRender) => {
    const recipeCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');

    recipeContainer.innerHTML = recipeCardsHTML;
};

// Initialize App
renderRecipes(recipes);

