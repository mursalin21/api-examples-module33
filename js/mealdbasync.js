const searchFood = async () => {
    const searchText = document.getElementById('search-field').value;
    //clear data
    document.getElementById('search-field').value = '';

    //load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    //using await
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);
    }
    catch (error) {
        console.log(error);
    }

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySearchResult(data.meals));
}


const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');

    //clear previous results
    searchResult.textContent = '';

    if (meals == null) {
        const div = document.createElement('div');
        div.classList.add('mx-auto');
        div.innerHTML = `
            <h1 class="text-center mt-3">No Such Food Found</h1>
        `;
        searchResult.appendChild(div);
        console.log('No Meals Found');
        return;
    }


    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onClick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}...</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}

const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    //using async
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    //using fetch
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'w-50', 'mx-auto', 'mb-5');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top w-100 p-1" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}...</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Watch Video</a>
    </div>
    `;
    mealDetails.appendChild(div);
}