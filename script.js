const baseUrl = "https://mongotest2026.vercel.app/api/foods";
// const foodIdUrl = "https://mongotest2026.vercel.app/api/foods/";
// const foodCategoryUrl = "https://mongotest2026.vercel.app/api/foods/category/";
// const foodRegionUrl = "https://mongotest2026.vercel.app/api/foods/region/east";
// const vegUrl = "https://mongotest2026.vercel.app/api/foods/filter/vegetarian";
// const spicyUrl = "https://mongotest2026.vercel.app/api/foods/filter/spicy";

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
                </d>
        `;
    }
};

const display = async () => {
    const result = await fetch(baseUrl);
    const foods = await result.json();
    // console.log(foods);
    const allFoods = foods.data;
    renderFoods(allFoods);
};

const searchFoods = async (e) => {
    const result = await fetch(baseUrl);
    const foods = await result.json();
    const allFoods = foods.data;

    const searchInput = e.target.value;
    // console.log(e.target.value);
    let userSearch = allFoods.filter((food) =>
        food.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    renderFoods(userSearch);
};

display();

// const showFoodDetails = (val) => {
//     document.getElementById(`food-${val}`).style.display = "block";
//     // console.log(val);
// };

function clearFilters() {
    display();
    mealCategory.value = 0;
    spicy.value === 0 
    vegetarian.value === 0 
    mealRegion.value = 0;

    displayFoods.innerHTML = "";
}
display();

const mealCategory = document.getElementById("mealCategory");
const filterByCategory = async () => {
    if (mealCategory.value === 0) {
        display();
    } else {
        let selectedCategory = mealCategory.value.toLowerCase();
        let meal = `${baseUrl}/category/${encodeURIComponent(selectedCategory)}`;

        const result = await fetch(meal);
        const foods = await result.json();
        renderFoods(foods.data);
    }
};

filterByCategory();

const mealRegion = document.getElementById("mealRegion");
const filterByRegion = async () => {
    if (mealRegion.value === 0) {
        display();
    } else {
        let selectedCategory = mealRegion.value.toLowerCase();
        let meal = `${baseUrl}/region/${encodeURIComponent(selectedCategory)}`;

        const result = await fetch(meal);
        const foods = await result.json();
        renderFoods(foods.data);
    }
};

filterByRegion();

const vegetarian = document.getElementById("vegetarian");
vegetarian.addEventListener("change", async () => {
    if (vegetarian.checked) {
        let selectedCategory = vegetarian.value.toLowerCase();
        let meal = `${baseUrl}/filter/${encodeURIComponent(selectedCategory)}`;
        
        const result = await fetch(meal);
        const foods = await result.json();
        renderFoods(foods.data);
    } else {
        vegetarian.value === 0
        display();
    }
});

const spicy = document.getElementById("spicy");
spicy.addEventListener("change", async () => {
    if (spicy.checked) {
        let selectedCategory = spicy.value.toLowerCase();
        let meal = `${baseUrl}/filter/${encodeURIComponent(selectedCategory)}`;

        const result = await fetch(meal);
        const foods = await result.json();
        renderFoods(foods.data);
    } else {
        spicy.value === 0
        display();
    }
});
