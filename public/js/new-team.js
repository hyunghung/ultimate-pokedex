let searchBarVisible = false;

function showSearchBar() {
    const searchBar = document.getElementById("searchBar");
    searchBar.style.display = "block";
    searchBarVisible = true;
}

function addPokemonToCard() {
    if (searchBarVisible) {
        const inputElement = document.getElementById("pokemonInput");
        const pokemonName = inputElement.value.trim();

        if (pokemonName !== "") {
            const pokemonNamesContainer = document.getElementById("pokemonNames");
            const pokemonDiv = document.createElement("div");
            pokemonDiv.className = "pokemon";
            pokemonDiv.textContent = pokemonName;
            pokemonNamesContainer.appendChild(pokemonDiv);

            inputElement.value = ""; // Clear the input field
        }
    }
}