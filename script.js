const endpoint = "https://mongotest2026.vercel.app/api/foods";

const display = async () => {
    const result = await fetch(endpoint);
    // console.log(result);
    const foods = await result.json();
    // console.log(foods);
    const allFoods = foods.data;
    // console.log(allFoods);

    let ingredients = "";

    for (let i = 0; i < allFoods.length; i++) {
        ingredients = "";
        const element = allFoods[i];
        let imagePath =
            "food-image/" +
            element.name.toLowerCase().replaceAll(" ", "-") +
            ".jpg";

        for (let j = 0; j < element.ingredients.length; j++) {
            ingredients += `<li>${element.ingredients[j]}</li>`;
            let length = element.ingredients.length;
        }

        displayFoods.innerHTML += `
            <div title='Click to see more information' onclick="showFoodDetails(${i})" class=" card border-none rounded-3 shadow-lg"
                style="width: 320px; border: none; background-color: rgba(241, 206, 206, 0.17);">
                <img src="${imagePath}" alt="${element.name}" class="card-img-top " style="position: sticky; top: 0; width: 320px; height: 300px;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${element.name}</h5>
                    <div class="d-flex flex-wrap align-items-center gap-2 fw-semibold">
                        <p class="m-0">${element.category}</p>
                        <p class="m-0">.</p>
                        <p class="m-0">${element.region}</p>
                    </div>

                    <div
                        class="d-flex flex-wrap border-top border-bottom border-2 fw-semibold py-2 my-3 d-flex align-items-center gap-2">
                        ${element.isSpicy === true ? `<p class="m-0 bg-danger py-1 px-3 text-white rounded-5">Spicy</p>` : ""}
                        ${element.isVegetarian === true ? `<p class="m-0 bg-success py-1 px-3 text-white rounded-5">Vegetarian</p>` : ""}
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">
                            ${element.preparationTime}</p>
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">${element.calories}
                            kcal</p>
                    </div>
                    <p class="my-2 fw-semibold">${element.description}</p>

                    <div style='display:none;' id='food-${i}' class="mt-4">
                        <div style="grid-template-columns: 1fr 1fr;" class="d-grid gap-3">
                            <div>
                                <h6 style="font-size: 1.05;" class="">Difficulty</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.difficulty}</p>
                            </div>
                            
                            <div>
                                <h6 style="font-size: 1.05;" class="">Price</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.price}</p>
                            </div>

                            <div>
                                <h6 style="font-size: 1.05;" class="">Serving Size</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.servingSize}</p>
                            </div>

                            <div>
                                <h6 style="font-size: 1.05;" class="">Category</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.category}</p>
                            </div>
                        </div>
                        <div class="ingredients mt-3 border rounded-3 py-2 px-3">
                            <h5 style="font-size: 1.15em;">Ingredients (${element.ingredients.length})</h5>
                            <ul id='ingredients' style="grid-template-columns: 1fr 1fr;" class="d-grid gap-2 justify-content-between ps-3">
                                ${ingredients}
                                    
                                
                            </ul>
                        </div>
                        <button id="favouriteBtn" class=" w-100 py-2 rounded-3 mt-4 "><i class="bi bi-heart "></i> Add
                            to Favourites</button>
                    </div>
                </div>
        `;
    }
};

display();

const showFoodDetails = (val) => {
    document.getElementById(`food-${val}`).style.display = "block";
    // console.log(val);
};

const mealCategory = document.getElementById("mealCategory");
const mealRegion = document.getElementById("mealRegion");
const mealDifficulty = document.getElementById("mealDifficulty");

let found = {};
let ingredients = "";

const filterMeals = async (val) => {
    const result = await fetch(endpoint);
    const foods = await result.json();
    const allFoods = foods.data;

    displayFoods.innerHTML = ``;

    if (val === 1) {
        if (mealCategory.value === 0) {
            display();
        } else {
            found = allFoods.filter((food) =>
                food.category
                    .toLowerCase()
                    .includes(mealCategory.value.toLowerCase()),
            );
        }
    } else if (val === 2) {
        if (mealRegion.value === 0) {
            display();
        } else {
            found = allFoods.filter((food) =>
                food.region
                    .toLowerCase()
                    .includes(mealRegion.value.toLowerCase()),
            );
            // console.log(found);
        }
    } else {
        if (mealDifficulty.value === 0) {
            display();
        } else {
            found = allFoods.filter((food) =>
                food.difficulty
                    .toLowerCase()
                    .includes(mealDifficulty.value.toLowerCase()),
            );
        }
    }

    for (let i = 0; i < found.length; i++) {
        const element = found[i];

        let imagePath =
            "food-image/" +
            element.name.toLowerCase().replaceAll(" ", "-") +
            ".jpg";

        ingredients = "";
        for (let j = 0; j < element.ingredients.length; j++) {
            ingredients += `<li>${element.ingredients[j]}</li>`;
        }

        displayFoods.innerHTML += `
        <div title='Click to see more information' onclick="showFoodDetails(${i})" class=" card border-none rounded-3 shadow-lg"
                style="width: 320px; border: none; background-color: rgba(241, 206, 206, 0.17);">
                <img src="${imagePath}" alt="${element.name}" class="card-img-top " style="position: sticky; top: 0; width: 320px; height: 300px;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${element.name}</h5>
                    <div class="d-flex flex-wrap align-items-center gap-2 fw-semibold">
                        <p class="m-0">${element.category}</p>
                        <p class="m-0">.</p>
                        <p class="m-0">${element.region}</p>
                    </div>

                    <div
                        class="d-flex flex-wrap border-top border-bottom border-2 fw-semibold py-2 my-3 d-flex align-items-center gap-2">
                        ${element.isSpicy === true ? `<p class="m-0 bg-danger py-1 px-3 text-white rounded-5">Spicy</p>` : ""}
                        ${element.isVegetarian === true ? `<p class="m-0 bg-success py-1 px-3 text-white rounded-5">Vegetarian</p>` : ""}
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">
                            ${element.preparationTime}</p>
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">${element.calories}
                            kcal</p>
                    </div>
                    <p class="my-2 fw-semibold">${element.description}</p>

                    <div style='display:none;' id='food-${i}' class="mt-4">
                        <div style="grid-template-columns: 1fr 1fr;" class="d-grid gap-3">
                            <div>
                                <h6 style="font-size: 1.05;" class="">Difficulty</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.difficulty}</p>
                            </div>
                            
                            <div>
                                <h6 style="font-size: 1.05;" class="">Price</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.price}</p>
                            </div>

                            <div>
                                <h6 style="font-size: 1.05;" class="">Serving Size</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.servingSize}</p>
                            </div>

                            <div>
                                <h6 style="font-size: 1.05;" class="">Category</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.category}</p>
                            </div>
                        </div>
                        <div class="ingredients mt-3 border rounded-3 py-2 px-3">
                            <h5 style="font-size: 1.15em;">Ingredients (${element.ingredients.length})</h5>
                            <ul id='ingredients' style="grid-template-columns: 1fr 1fr;" class="d-grid gap-2 justify-content-between ps-3">
                                ${ingredients}
                                    
                                
                            </ul>
                        </div>
                        <button id="favouriteBtn" class=" w-100 py-2 rounded-3 mt-4 "><i class="bi bi-heart "></i> Add
                            to Favourites</button>
                    </div>
                </div>
        `;
    }
};

filterMeals();

function clearFilters() {
    mealCategory.value = 0;
    mealDifficulty.value = 0;
    mealRegion.value = 0;
    displayFoods.innerHTML = "";
    display();
}
// display();

const searchFoods = async (e) => {
    const result = await fetch(endpoint);
    const foods = await result.json();
    const allFoods = foods.data;

    const searchInput = e.target.value;
    // console.log(e.target.value);
    let userSearch = allFoods.filter((food) =>
        food.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    // console.log(userSearch);
    displayFoods.innerHTML = ''

    for (let i = 0; i < userSearch.length; i++) {
        const element = userSearch[i];

        let imagePath =
            "food-image/" +
            element.name.toLowerCase().replaceAll(" ", "-") +
            ".jpg";

        ingredients = "";
        for (let j = 0; j < element.ingredients.length; j++) {
            ingredients += `<li>${element.ingredients[j]}</li>`;
        }

        displayFoods.innerHTML += `
        <div title='Click to see more information' onclick="showFoodDetails(${i})" class=" card border-none rounded-3 shadow-lg"
                style="width: 320px; border: none; background-color: rgba(241, 206, 206, 0.17);">
                <img src="${imagePath}" alt="${element.name}" class="card-img-top " style="position: sticky; top: 0; width: 320px; height: 300px;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${element.name}</h5>
                    <div class="d-flex flex-wrap align-items-center gap-2 fw-semibold">
                        <p class="m-0">${element.category}</p>
                        <p class="m-0">.</p>
                        <p class="m-0">${element.region}</p>
                    </div>

                    <div
                        class="d-flex flex-wrap border-top border-bottom border-2 fw-semibold py-2 my-3 d-flex align-items-center gap-2">
                        ${element.isSpicy === true ? `<p class="m-0 bg-danger py-1 px-3 text-white rounded-5">Spicy</p>` : ""}
                        ${element.isVegetarian === true ? `<p class="m-0 bg-success py-1 px-3 text-white rounded-5">Vegetarian</p>` : ""}
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">
                            ${element.preparationTime}</p>
                        <p style="background-color: rgb(250, 220, 208);" class="m-0 py-1 px-3 text-black rounded-5">${element.calories}
                            kcal</p>
                    </div>
                    <p class="my-2 fw-semibold">${element.description}</p>

                    <div style='display:none;' id='food-${i}' class="mt-4">
                        <div style="grid-template-columns: 1fr 1fr;" class="d-grid gap-3">
                            <div>
                                <h6 style="font-size: 1.05;" class="">Difficulty</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.difficulty}</p>
                            </div>
                            
                            <div>
                                <h6 style="font-size: 1.05;" class="">Price</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.price}</p>
                            </div>

                            <div>
                                <h6 style="font-size: 1.05;" class="">Serving Size</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.servingSize}</p>
                            </div>

                            <div>
                                <h6 style="font-size: 1.05;" class="">Category</h6>
                                <p style="color: brown; background-color: rgba(165, 42, 42, 0.07);"
                                    class="fw-semibold rounded-3 py-2 px-2 m-0 ">${element.category}</p>
                            </div>
                        </div>
                        <div class="ingredients mt-3 border rounded-3 py-2 px-3">
                            <h5 style="font-size: 1.15em;">Ingredients (${element.ingredients.length})</h5>
                            <ul id='ingredients' style="grid-template-columns: 1fr 1fr;" class="d-grid gap-2 justify-content-between ps-3">
                                ${ingredients}
                                    
                                
                            </ul>
                        </div>
                        <button id="favouriteBtn" class=" w-100 py-2 rounded-3 mt-4 "><i class="bi bi-heart "></i> Add
                            to Favourites</button>
                    </div>
                </div>
        `;
    }
};
