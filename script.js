const baseUrl = "https://mongotest2026.vercel.app/api/foods";
const foodIdUrl = "https://mongotest2026.vercel.app/api/foods/";
const foodCategoryUrl = "https://mongotest2026.vercel.app/api/foods/category/";
const foodRegionUrl = "https://mongotest2026.vercel.app/api/foods/region/";
const vegUrl = "https://mongotest2026.vercel.app/api/foods/filter/vegetarian/";
const spicyUrl = "https://mongotest2026.vercel.app/api/foods/filter/spicy/";

const spinner = document.getElementById("spinnerContainer");
const displayFoods = document.getElementById("displayFoods");

const showSpinner = () => {
    document.getElementById("spinnerOverlay").style.display = "flex";
};

const hideSpinner = () => {
    document.getElementById("spinnerOverlay").style.display = "none";
};

let favoriteFoods = localStorage["favoriteFoods"]
    ? JSON.parse(localStorage.getItem("favoriteFoods"))
    : [];

// Function that renders all food
const renderFoods = (foodArray) => {
    displayFoods.innerHTML = "";

    for (let i = 0; i < foodArray.length; i++) {
        // ingredients = "";
        const element = foodArray[i];
        let isFavorited = favoriteFoods.some(
            (favorite) => favorite.id === element.id,
        );
        let imagePath =
            "food-image/" +
            element.name.toLowerCase().replaceAll(" ", "-") +
            ".jpg";

        let ingredients = "";
        for (let j = 0; j < element.ingredients.length; j++) {
            ingredients += `<li>${element.ingredients[j]}</li>`;
            length = element.ingredients.length;
        }

        displayFoods.innerHTML += `
            <div title='Click to see more information' class=" card border-none rounded-3 shadow-lg"
                style="width: 320px; border: none; background-color: rgba(241, 206, 206, 0.17);">
                <img src="${imagePath}" alt="${element.name}-img" class="card-img " style="position: sticky; top: 0; width: 320px; height: 300px;">
                <div class="card-body">
                    <div class='d-flex justify-content-between align-items-start fs-5'>
                        <h5 class="card-title fw-bold">${element.name}</h5>
                        <i onclick="addToFavorite(this, ${element.id})" class= "bi ${isFavorited ? "bi-heart-fill text-danger" : "bi-heart text-danger"}"></i> 
                    </div>
                    <div class="d-flex flex-wrap align-items-center gap-2 fw-semibold">
                        <p class="m-0">${element.category}</p>
                        <p class="m-0">.</p>
                        <p class="m-0">${element.region}</p>
                    </div>

                    <div
                        class="d-flex flex-wrap border-top border-bottom border-2 fw-semibold py-2 my-3 d-flex align-items-center gap-2">
                        ${
                            element.isSpicy === true
                                ? `<p class="m-0 bg-danger py-1 px-3 text-white rounded-5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36">
	<path fill="#ff0022" d="M4.042 27.916c4.89.551 9.458-1.625 13.471-5.946c4.812-5.182 5-13 5-14s11.31-3.056 11 5c-.43 11.196-7.43 20.946-19.917 21.916c-5.982.465-9.679-.928-11.387-2.345c-2.69-2.231-.751-4.916 1.833-4.625" />
	<path fill="#77b255" d="M30.545 6.246c.204-1.644.079-3.754-.747-4.853c-1.111-1.479-4.431-.765-3.569.113c.96.979 2.455 2.254 2.401 4.151l-.13-.032c-3.856-.869-6.721 1.405-7.167 2.958c-.782 2.722 4.065.568 4.68 1.762c1.82 3.53 3.903.155 4.403 1.28s4.097 4.303 4.097.636c0-3.01-1.192-4.903-3.968-6.015" />
</svg> Spicy</p>`
                                : ""
                        }
                        ${element.isVegetarian === true ? ` <p class="m-0 bg-success py-1 px-3 text-white rounded-5"><i class="bi bi-leaf me-1 t"></i>  Vegetarian</p>` : ""}
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5"><i class="bi bi-clock"></i>
                            ${element.preparationTime}</p>
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">${element.calories}
                            kcal</p>
                    </div>
                    <p class="my-2 fw-semibold">${element.description}</p>
                    <p id='viewDetails' onclick="showFoodDetails(${element.id})" class='mb-0 mt-3' >View details <i class="bi bi-arrow-right"></i></p>
                </div>
            </div>
        `;
    }
    // console.log("Rendering foods:", foodArray.length);
};

// Displays all foods on load of the page
const display = async () => {
    showSpinner();
    displayFoods.style.display = "none";

    try {
        document.getElementById("sectionHeader").textContent = `Popular Dishes`;

        const result = await fetch(baseUrl);
        const foods = await result.json();
        const allFoods = foods.data;

        renderFoods(allFoods);
    } catch (error) {
        console.log(error);
        displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load popular dishes, 
                <a href='' onclick='display()' class=' text-danger'>retry</a></p>
            `;
    } finally {
        hideSpinner();
        displayFoods.style.display = "flex";
    }
};
display();

// Display details about a food in modal form
const showFoodDetails = async (val) => {
    showSpinner();
    // displayFoods.innerHTML = "";
    try {
        let meal = `${foodIdUrl}${encodeURIComponent(val)}`;
        const result = await fetch(meal);
        const foods = await result.json();
        const food = foods.data;

        let imagePath =
            "food-image/" +
            food.name.toLowerCase().replaceAll(" ", "-") +
            ".jpg";

        let ingredients = "";
        for (let j = 0; j < food.ingredients.length; j++) {
            ingredients += `<li>${food.ingredients[j]}</li>`;
        }

        // Determine button text before inserting into DOM
        const favButtonText = favoriteFoods.some((f) => f.id === food.id)
            ? "Remove from Favourites"
            : "Add to Favourites";

        document.getElementById("modalBody").innerHTML = `
        <div class="bg-white mx-auto border-none rounded-3 shadow-lg p-3"
             style="overflow: auto; max-height: 100vh; border: none; background-color: rgba(241, 206, 206, 0.17);">
            <div class="modal-top d-flex gap-3">
                <img src="${imagePath}" alt="${food.name}" class="card-img-modal rounded-3"
                     style="width: 350px; height: 330px;">
                <div class=''>
                    <h5 class="card-title fw-bold">${food.name}</h5>
                    <div class="d-flex flex-wrap align-items-center gap-2 fw-semibold">
                        <p class="m-0">${food.category}</p>
                        <p class="m-0">.</p>
                        <p class="m-0">${food.region}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr;"
                         class="d-flex flex-wrap border-top border-bottom border-2 fw-semibold py-2 my-3 align-items-center gap-3">
                        ${
                            food.isSpicy
                                ? `<p class="m-0 bg-danger py-1 px-3 text-white rounded-5 spicy">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36">
                                          <path fill="#ff0022" d="M4.042 27.916c4.89.551 9.458-1.625 13.471-5.946c4.812-5.182 5-13 5-14s11.31-3.056 11 5c-.43 11.196-7.43 20.946-19.917 21.916c-5.982.465-9.679-.928-11.387-2.345c-2.69-2.231-.751-4.916 1.833-4.625"/>
                                          <path fill="#77b255" d="M30.545 6.246c.204-1.644.079-3.754-.747-4.853c-1.111-1.479-4.431-.765-3.569.113c.96.979 2.455 2.254 2.401 4.151l-.13-.032c-3.856-.869-6.721 1.405-7.167 2.958c-.782 2.722 4.065.568 4.68 1.762c1.82 3.53 3.903.155 4.403 1.28s4.097 4.303 4.097.636c0-3.01-1.192-4.903-3.968-6.015"/>
                                      </svg> Spicy</p>`
                                : ""
                        }
                        ${
                            food.isVegetarian
                                ? `<p class="m-0 bg-success py-1 px-3 text-white rounded-5 vegetarian">
                                       <i class="bi bi-leaf me-1 t"></i> Vegetarian
                                   </p>`
                                : ""
                        }
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5 prepTime">
                            <i class="bi bi-clock me-1"></i> ${food.preparationTime}
                        </p>
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5 calories">
                            ${food.calories} kcal
                        </p>
                    </div>
                    <h6 style="font-size: 1.08;" class="">Description:</h6>
                    <p class="my-2 fw-semibold description">${food.description}!</p>
                </div>
            </div>

            <div class="modal-body">
                <div class="mt-4">
                    <div class="d-flex flex-wrap gap-3">
                        <div class='w-auto'>
                            <h6 style="font-size: 1.05;" class="">Difficulty</h6>
                            <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                               class="fw-semibold rounded-3 py-2 px-2 m-0 difficulty">${food.difficulty}</p>
                        </div>

                        <div class='w-auto'>
                            <h6 style="font-size: 1.05;" class="">Price</h6>
                            <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                               class="fw-semibold rounded-3 py-2 px-2 m-0 price">₦${food.price}</p>
                        </div>

                        <div class='w-auto'>
                            <h6 style="font-size: 1.05;" class="">Serving Size</h6>
                            <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                               class="fw-semibold rounded-3 py-2 px-2 m-0 servingSize">${food.servingSize}</p>
                        </div>

                        <div class='w-auto'>
                            <h6 style="font-size: 1.05;" class="">Category</h6>
                            <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                               class="fw-semibold rounded-3 py-2 px-2 m-0 category">${food.category}</p>
                        </div>
                    </div>

                    <div class="ingredients mt-3 border rounded-3 py-2 px-3">
                        <h5 style="font-size: 1.15em;">Ingredients (${food.ingredients.length})</h5>
                        <ul id='ingredients' class="d-grid gap-2 justify-content-between ps-3">
                            ${ingredients}
                        </ul>
                    </div>

                    <button style='cursor:pointer;' id="favouriteBtn" class="w-100 py-2 rounded-3 mt-4">
                        ${favButtonText}
                    </button>
                </div>
            </div>
        </div>
    `;

        // Show the modal
        const modal = new bootstrap.Modal(
            document.getElementById("foodDisplay"),
        );
        modal.show();

        // Add click listener for favorite button
        const favBtn = document.getElementById("favouriteBtn");
        if (favBtn) {
            favBtn.addEventListener("click", () => {
                addToFavorite(favBtn, food.id);
                // Update button text immediately
                favBtn.textContent = favoriteFoods.some((f) => f.id === food.id)
                    ? "Remove from Favourites"
                    : "Add to Favourites";
            });
        }
    } catch (error) {
        displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load meal details, 
                <a href='' onclick='showFoodDetails(${val})' class=' text-danger'>retry</a></p>
            `;
    } finally {
        hideSpinner();
        displayFoods.style.display = "flex";
    }
};

// Function to open modal
const foodId = document.getElementById("foodId");
function openModal() {
    foodId.style.display = "block";
}

// Search food function
const searchFoods = async (e) => {
    showSpinner();
    displayFoods.style.display = "none";

    try {
        const result = await fetch(baseUrl);
        const foods = await result.json();
        const allFoods = foods.data;

        const searchInput = e.target.value;
        // console.log(e.target.value);
        let userSearch = allFoods.filter((food) =>
            food.name.toLowerCase().includes(searchInput.toLowerCase()),
        );
        renderFoods(userSearch);
    } catch (error) {
        console.log(error);
        displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods, 
                <a href='' onclick='searchFoods()' class=' text-danger'>retry</a></p>
            `;
    } finally {
        hideSpinner();
        displayFoods.style.display = "flex";
    }
};

// Clear all filters function
function clearFilters() {
    display();
    mealCategory.value = 0;
    spicy.value === 0;
    vegetarian.value === 0;
    mealRegion.value = 0;

    displayFoods.innerHTML = "";
}

// Filter foods by their Category
const mealCategory = document.getElementById("mealCategory");
const filterByCategory = async () => {
    showSpinner();
    displayFoods.style.display = "none";
    if (mealCategory.value === 0) {
        display();
    } else {
        try {
            document.getElementById("sectionHeader").textContent =
                `Category (${mealCategory.value})`;
            let selectedCategory = mealCategory.value.toLowerCase();
            let meal = `${foodCategoryUrl}${encodeURIComponent(selectedCategory)}`;
            const result = await fetch(meal);
            const foods = await result.json();
            renderFoods(foods.data);
        } catch (error) {
            displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load ${mealCategory} foods, 
                <a href='' onclick='filterByCategory()' class=' text-danger'>retry</a></p>
            `;
        } finally {
            hideSpinner();
            displayFoods.style.display = "flex";
        }
    }
};

// Filter foods by their Region
const mealRegion = document.getElementById("mealRegion");
const filterByRegion = async () => {
    showSpinner();
    displayFoods.style.display = "none";
    if (mealRegion.value === 0) {
        display();
    } else {
        try {
            document.getElementById("sectionHeader").textContent =
                `Region (${mealRegion.value})`;
            let selectedCategory = mealRegion.value.toLowerCase();
            let meal = `${foodRegionUrl}${encodeURIComponent(selectedCategory)}`;
            const result = await fetch(meal);
            const foods = await result.json();
            renderFoods(foods.data);
        } catch (error) {
            displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load ${mealRegion.value} foods, 
                <a href='' onclick='filterByRegion()' class=' text-danger'>retry</a></p>
            `;
        } finally {
            hideSpinner();
            displayFoods.style.display = "flex";
        }
    }
};

// Display vegetarian foos
const vegetarian = document.getElementById("vegetarian");
vegetarian.addEventListener("change", async () => {
    showSpinner();
    displayFoods.style.display = "none";
    if (vegetarian.checked) {
        try {
            document.getElementById("sectionHeader").textContent =
                `Vegetarian Meals`;
            let meal = `${vegUrl}`;

            const result = await fetch(meal);
            const foods = await result.json();
            const allFoods = foods.data;
            renderFoods(allFoods);
        } catch (error) {
            console.log(error);
            displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load Vegetarian foods, 
                <a href='' onclick='display()' class=' text-danger'>cancel</a></p>
            `;
        } finally {
            hideSpinner();
            displayFoods.style.display = "flex";
        }
    } else {
        vegetarian.value === 0;
        display();
    }
});

// Display spicy foods
const spicy = document.getElementById("spicy");
spicy.addEventListener("change", async () => {
    showSpinner();
    displayFoods.style.display = "none";
    if (spicy.checked) {
        try {
            document.getElementById("sectionHeader").textContent =
                `Spicy Meals`;
            let meal = `${spicyUrl}`;

            const result = await fetch(meal);
            const foods = await result.json();
            const allFoods = foods.data;
            renderFoods(allFoods);
        } catch (error) {
            console.log(error);
            displayFoods.innerHTML = `
                <p class=' text-danger fs-5 w-50 text-center'>Failed to load spicy foods, 
                <a href='' onclick='display()' class=' text-danger'>cancel</a></p>
            `;
        } finally {
            hideSpinner();
            displayFoods.style.display = "flex";
        }
    } else {
        spicy.value === 0;
        display();
    }
});

// Function that pop ups message when an action is performed (e.g add to favorite or delete)
function showToast(message) {
    const toastMessage = document.getElementById("toastMessage");
    const toastElement = document.getElementById("favoriteToast");

    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(toastElement, {
        delay: 2000,
    });

    toast.show();
}

// Function to add favorite foods to an array
const addToFavorite = async (icon, val) => {
    const isFavorited = icon.classList.contains("bi-heart-fill");

    try {
        if (!isFavorited) {
            let meal = `${foodIdUrl}${encodeURIComponent(val)}`;
            const result = await fetch(meal);

            if (result.ok === false) {
                showToast("⚠️ Network error");
                return;
            }

            const foods = await result.json();
            const food = foods.data;

            if (!favoriteFoods.some((item) => item.id === val)) {
                favoriteFoods.push(food);
            }

            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");

            showToast(`${food.name} added to favorites ❤️`);
        } else {
            favoriteFoods = favoriteFoods.filter((food) => food.id !== val);

            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");

            showToast("Removed from favorites 🤍");
            JSON.parse(localStorage.getItem("favoriteFoods"));
        }
    } catch (error) {
        console.error(error);
        showToast("⚠️ Network error. Please try again.");
    }

    console.log(favoriteFoods);
    localStorage.setItem("favoriteFoods", JSON.stringify(favoriteFoods));
};

// Function to display favorite foods
const showFavoriteFoods = document.getElementById("showFavoriteFoods");
showFavoriteFoods.addEventListener("click", () => {
    if (showFavoriteFoods.textContent == "See Favorites") {
        displayFoods.style.display = "none";
        showSpinner();

        try {
            document.getElementById("sectionHeader").textContent =
                `Favorite Meals`;
            if (favoriteFoods.length === 0) {
                displayFoods.innerHTML = `
                    <div class="d-flex flex-column border border-2 rounded-3 align-items-center justify-content-center w-100 py-5">
                        <i class="bi bi-heart text-danger fs-1 mb-3"></i>
                        <p class="fs-5 text-center text-muted">
                            You have no favorite foods yet.<br>Click the heart icon on a dish to add it!
                        </p>
                        <button class="btn btn-danger mt-3" onclick="display()">Browse Foods</button>
                    </div>
    `;
            } else {
                renderFoods(favoriteFoods);
            }
        } catch (error) {
            displayFoods.innerHTML = `
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load favorite foods, <a href='' onclick='showFavoriteFoods()' class=' text-danger'>retry</a></p>`;
        } finally {
            displayFoods.style.display = "flex";
            hideSpinner();
        }
        showFavoriteFoods.textContent = "Close Favorites";
    } else {
        display();
        showFavoriteFoods.textContent = "See Favorites";
    }
});
