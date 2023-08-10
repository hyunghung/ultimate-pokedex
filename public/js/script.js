const pokedex = document.querySelector('.pokedex');

async function fetchPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=802');
    const data = await response.json();
    const pokemonList = data.results;

    const pokemonDetails = await Promise.all(pokemonList.map(fetchPokemonDetails));
    pokemonDetails.forEach(displayPokemon);

  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
}

async function fetchPokemonDetails(pokemon) {
  try {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}

function displayPokemon(pokemon) {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemon');

  const formattedName = pokemon.name.replace(/-/g, '');

  const pokemonLink = document.createElement('a');
  pokemonLink.href = `https://projectpokemon.org/images/normal-sprite/${formattedName.toLowerCase()}.gif`;
  pokemonLink.target = '_blank'; 
  const pokemonImage = document.createElement('img');
  pokemonImage.src = `https://projectpokemon.org/images/normal-sprite/${formattedName.toLowerCase()}.gif`;
  pokemonImage.alt = pokemon.name;
  pokemonLink.appendChild(pokemonImage);
  pokemonDiv.appendChild(pokemonLink);

  const pokemonName = document.createElement('p');
  pokemonName.textContent = pokemon.name;
  pokemonDiv.appendChild(pokemonName);

  pokedex.appendChild(pokemonDiv);
}

fetchPokemon();
