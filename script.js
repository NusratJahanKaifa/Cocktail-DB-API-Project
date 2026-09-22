
const drinkContainer = document.getElementById("drinkContainer");
const loadDrinks = async () => {
    const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
    );
    const data = await response.json();
    const drinks = data.drinks.slice(0, 10);
    showDrinks(drinks);
};
const showDrinks = async (drinks) => {
    drinkContainer.innerHTML = "";
    if (!drinks) {
        drinkContainer.innerHTML = `
            <p class="no-result">No drinks found!</p>
        `;
        return;
    }
    for (const drink of drinks) {
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
        );
        const data = await response.json();
        const fullDrink = data.drinks[0];
        const card = document.createElement("div");
        card.classList.add("drink-card");
        card.innerHTML = `
            <img src="${fullDrink.strDrinkThumb}" alt="${fullDrink.strDrink}">
            <h3>${fullDrink.strDrink}</h3>
            <p>
                <strong>Category:</strong>
                ${fullDrink.strCategory}
            </p>
            <p>
                <strong>Instructions:</strong>
                ${fullDrink.strInstructions.slice(0, 15)}...
            </p>
            <div class="button-group">
                <button onclick="addToGroup('${fullDrink.strDrink}')">
                    Add to Group
                </button>
                <button onclick="showDetails('${fullDrink.idDrink}')">
                    Details
                </button>
            </div>
        `;
        drinkContainer.appendChild(card);
    }
};
const searchDrink = async () => {
    const searchText = document.getElementById("searchInput").value;
    if (searchText === "") {
        alert("Please enter a drink name");
        return;
    }
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    );
    const data = await response.json();
    showDrinks(data.drinks);
};
let groupDrinks = [];
const addToGroup = (drinkName) => {
    if (groupDrinks.length >= 7) {
        alert("You can not add more than 7 drinks!");
        return;
    }
    groupDrinks.push(drinkName);
    document.getElementById("groupCount").innerText =
        groupDrinks.length;
    showGroupDrinks();
};
const showGroupDrinks = () => {
    const groupContainer =
        document.getElementById("groupContainer");
    groupContainer.innerHTML = "";
    groupDrinks.forEach((drink, index) => {
        const item = document.createElement("p");
        item.innerText =
            `${index + 1}. ${drink}`;
        groupContainer.appendChild(item);
    });
};
const showDetails = async (drinkId) => {
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    );
    const data = await response.json();
    const drink = data.drinks[0];
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <img src="${drink.strDrinkThumb}"alt="${drink.strDrink}">
        <h2>${drink.strDrink}</h2>
        <p>
            <strong>Category:</strong>
            ${drink.strCategory}
        </p>
        <p>
            <strong>Alcoholic:</strong>
            ${drink.strAlcoholic}
        </p>
        <p>
            <strong>Glass:</strong>
            ${drink.strGlass}
        </p>
        <p>
            <strong>Instructions:</strong>
            ${drink.strInstructions}
        </p>
        <p>
            <strong>Drink ID:</strong>
            ${drink.idDrink}
        </p>
    `;
    document.getElementById("detailsModal").style.display =
        "flex";
};
const closeModal = () => {
    document.getElementById("detailsModal").style.display =
        "none";
};
loadDrinks();
