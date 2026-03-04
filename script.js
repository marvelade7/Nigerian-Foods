const baseUrl = "https://mongotest2026.vercel.app/api/foods";
const foodIdUrl = "https://mongotest2026.vercel.app/api/foods/";
const foodCategoryUrl = "https://mongotest2026.vercel.app/api/foods/category/";
const foodRegionUrl = "https://mongotest2026.vercel.app/api/foods/region/";
const vegUrl = "https://mongotest2026.vercel.app/api/foods/filter/vegetarian/";
const spicyUrl = "https://mongotest2026.vercel.app/api/foods/filter/spicy/";

const mealDifficulty = document.getElementById("mealDifficulty");

const renderFoods = (foodArray) => {
    displayFoods.innerHTML = "";

    for (let i = 0; i < foodArray.length; i++) {
        // ingredients = "";
        const element = foodArray[i];
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
            <div title='Click to see more information' onclick="showFoodDetails(${element.id})" class=" card border-none rounded-3 shadow-lg"
                style="width: 320px; border: none; background-color: rgba(241, 206, 206, 0.17);">
                <img src="${imagePath}" alt="${element.name}" class="card-img-top " style="position: sticky; top: 0; width: 320px; height: 300px;">
                <div class="card-body">
                    <div class='d-flex justify-content-between align-items-start fs-5'>
                        <h5 class="card-title fw-bold">${element.name}</h5>
                        <i class='bi bi-heart text-danger'></i>
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
                    
                </div>
            </div>
        `;
    }
    console.log("Rendering foods:", foodArray.length);
};

const spinner = document.getElementById("spinnerContainer");
const displayFoods = document.getElementById("displayFoods");

const display = async () => {
    spinner.style.display = "flex";
    displayFoods.style.display = "none";

    try {
        const result = await fetch(baseUrl);
        const foods = await result.json();
        const allFoods = foods.data;

        renderFoods(allFoods);
    } catch (error) {
        console.log(error);
        displayFoods.innerHTML = `
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods <button onclick='display()' class='btn btn-secondary'>Retry</button></p>
            
        `;
    } finally {
        spinner.style.display = "none";
        displayFoods.style.display = "flex";
    }
};
display();

const showFoodDetails = async (val) => {
    let meal = `${foodIdUrl}${encodeURIComponent(val)}`;

    const result = await fetch(meal);
    const foods = await result.json();
    const food = foods.data;

    let imagePath =
        "food-image/" + food.name.toLowerCase().replaceAll(" ", "-") + ".jpg";

    let ingredients = "";
    for (let j = 0; j < food.ingredients.length; j++) {
        ingredients += `<li>${food.ingredients[j]}</li>`;
        length = food.ingredients.length;
    }

    document.getElementById("modalDialog").innerHTML = `
        <div class="bg-white mx-auto border-none rounded-3 shadow-lg p-3"
                    style="overflow: auto; max-height: 100vh; border: none; background-color: rgba(241, 206, 206, 0.17);">
                    <div class="modal-top d-flex gap-3">
                        <img src="${imagePath}" alt="${food.name}" class="card-img-top rounded-3"
                            style="width: 320px; height: 300px;">
                        <div class=''>
                                <h5 class="card-title fw-bold">${food.name}</h5>
                            <div class="d-flex flex-wrap align-items-center gap-2 fw-semibold">
                                <p class="m-0">${food.category}</p>
                                <p class="m-0">.</p>
                                <p class="m-0">${food.region}</p>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr;"
                                class="d-grid border-top border-bottom border-2 fw-semibold py-2 my-3 align-items-center gap-3">
                                ${
                                    food.isSpicy === true
                                        ? `<p class="m-0 bg-danger py-1 px-3 text-white rounded-5 spicy"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36">
	<path fill="#ff0022" d="M4.042 27.916c4.89.551 9.458-1.625 13.471-5.946c4.812-5.182 5-13 5-14s11.31-3.056 11 5c-.43 11.196-7.43 20.946-19.917 21.916c-5.982.465-9.679-.928-11.387-2.345c-2.69-2.231-.751-4.916 1.833-4.625" />
	<path fill="#77b255" d="M30.545 6.246c.204-1.644.079-3.754-.747-4.853c-1.111-1.479-4.431-.765-3.569.113c.96.979 2.455 2.254 2.401 4.151l-.13-.032c-3.856-.869-6.721 1.405-7.167 2.958c-.782 2.722 4.065.568 4.68 1.762c1.82 3.53 3.903.155 4.403 1.28s4.097 4.303 4.097.636c0-3.01-1.192-4.903-3.968-6.015" />
</svg> Spicy</p>`
                                        : ""
                                }
                                ${food.isVegetarian === true ? `<p class="m-0 bg-success py-1 px-3 text-white rounded-5 vegetarian"><i class="bi bi-leaf me-1 t"></i>  Vegetarian</p>` : ""}
                                    
                                <p style="background-color: rgb(250, 220, 208);"
                                    class="m-0 py-1 px-3 text-black rounded-5 prepTime"><i class="bi bi-clock me-1"></i>
                                    45 mins</p>
                                <p style="background-color: rgb(250, 220, 208);"
                                    class="m-0 py-1 px-3 text-black rounded-5 calories">
                                    950 kcal</p>
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
                                        class="fw-semibold rounded-3 py-2 px-2 m-0 difficulty ">${food.difficulty}</p>
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
                                        class="fw-semibold rounded-3 py-2 px-2 m-0 category ">${food.category}</p>
                                </div>
                            </div>
                            <div class="ingredients mt-3 border rounded-3 py-2 px-3">
                                <h5 style="font-size: 1.15em;">Ingredients (${food.ingredients.length})</h5>
                                <ul id='ingredients' style="grid-template-columns: 1fr 1fr 1fr;"
                                    class="d-grid gap-2 justify-content-between ps-3">
                                    ${ingredients}


                                </ul>
                            </div>
                            <button style='cursor:pointer;' id="favouriteBtn" class=" w-100 py-2 rounded-3 mt-4 "><i class="bi bi-heart "></i>
                                Add
                                to Favourites</button>
                        </div>
                    </div>
                </div>
    `;
    const modal = new bootstrap.Modal(document.getElementById("foodDisplay"));
    modal.show();
};
// showFoodDetails()

const searchFoods = async (e) => {
    spinner.style.display = "flex";
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
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods <button onclick='display()' class='btn btn-secondary'>Retry</button></p>
            
        `;
    } finally {
        spinner.style.display = "none";
        displayFoods.style.display = "flex";
    }
};

function clearFilters() {
    display();
    mealCategory.value = 0;
    spicy.value === 0;
    vegetarian.value === 0;
    mealRegion.value = 0;

    displayFoods.innerHTML = "";
}
// display();

const mealCategory = document.getElementById("mealCategory");
const filterByCategory = async () => {
    spinner.style.display = "flex";
    displayFoods.style.display = "none";
    if (mealCategory.value === 0) {
        display();
    } else {
        try {
            let selectedCategory = mealCategory.value.toLowerCase();
            let meal = `${foodCategoryUrl}${encodeURIComponent(selectedCategory)}`;
            const result = await fetch(meal);
            const foods = await result.json();
            renderFoods(foods.data);
        } catch (error) {
            displayFoods.innerHTML = `
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods 
        <button onclick='display()' class='btn btn-secondary'>Retry</button></p>     `;
        } finally {
            spinner.style.display = "none";
            displayFoods.style.display = "flex";
        }
    }
};
// filterByCategory();

const mealRegion = document.getElementById("mealRegion");
const filterByRegion = async () => {
    spinner.style.display = "flex";
    displayFoods.style.display = "none";
    if (mealRegion.value === 0) {
        display();
    } else {
        try {
            let selectedCategory = mealRegion.value.toLowerCase();
            let meal = `${foodRegionUrl}${encodeURIComponent(selectedCategory)}`;
            const result = await fetch(meal);
            const foods = await result.json();
            renderFoods(foods.data);
        } catch (error) {
            displayFoods.innerHTML = `
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods 
        <button onclick='display()' class='btn btn-secondary'>Retry</button></p>     `;
        } finally {
            spinner.style.display = "none";
            displayFoods.style.display = "flex";
        }
    }
};

// filterByRegion();

const vegetarian = document.getElementById("vegetarian");
vegetarian.addEventListener("change", async () => {
    spinner.style.display = "flex";
    displayFoods.style.display = "none";
    if (vegetarian.checked) {
        try {
            let meal = `${vegUrl}`;

            const result = await fetch(meal);
            const foods = await result.json();
            const allFoods = foods.data
            renderFoods(allFoods);
        } catch (error) {
            console.log(error);
            displayFoods.innerHTML = `
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods <button onclick='display()' class='btn btn-secondary'>Retry</button></p>
            
        `;
        } finally {
            spinner.style.display = "none";
            displayFoods.style.display = "flex";
        }
    } else {
        vegetarian.value === 0;
        display();
    }
});

const spicy = document.getElementById("spicy");
spicy.addEventListener("change", async () => {
    spinner.style.display = "flex";
    displayFoods.style.display = "none";
    if (spicy.checked) {
        try {
            let meal = `${spicyUrl}`;

            const result = await fetch(meal);
            const foods = await result.json();
            const allFoods = foods.data
            renderFoods(allFoods);
        } catch (error) {
            console.log(error);
            displayFoods.innerHTML = `
        <p class=' text-danger fs-5 w-50 text-center'>Failed to load foods <button onclick='display()' class='btn btn-secondary'>Retry</button></p>
            
        `;
        } finally {
            spinner.style.display = "none";
            displayFoods.style.display = "flex";
        }
    } else {
        spicy.value === 0;
        display();
    }
});

const foodId = document.getElementById("foodId");
function openModal() {
    foodId.style.display = "block";
}
