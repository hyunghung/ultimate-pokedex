// Retrieve the Pokémon name from the URL query parameter
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const pokemonName = params.name;

// Fetch Pokémon details using the name and display them
fetchPokemonDetails(pokemonName);

async function fetchPokemonDetails(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    displayPokemonStats(data);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}

function displayPokemonStats(pokemon) {
  const pokemonImage = document.getElementById('pokemon-image');
  const pokemonName = document.getElementById('pokemon-name');
  const pokemonStats = document.getElementById('pokemon-stats');

  pokemonImage.src = pokemon.sprites.front_default;
  pokemonName.textContent = pokemon.name;

}
