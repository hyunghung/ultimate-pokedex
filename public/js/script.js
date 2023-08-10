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

// ... (previous code)

function displayPokemon(pokemon) {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');
  
    // Create an <a> element with an <img> child for the Pokémon image
    const pokemonLink = document.createElement('a');
    pokemonLink.href = `https://projectpokemon.org/images/normal-sprite/${pokemon.name.toLowerCase()}.gif`;
    pokemonLink.target = '_blank'; // Open link in a new tab
    const pokemonImage = document.createElement('img');
  
    // Set the image source
    pokemonImage.src = `https://projectpokemon.org/images/normal-sprite/${pokemon.name.toLowerCase()}.gif`;
  
    // Append the image to the link
    pokemonLink.appendChild(pokemonImage);
  
    // Append the link to the Pokémon container
    pokemonDiv.appendChild(pokemonLink);
  
    // Create a <p> element for the Pokémon name at the bottom
    const pokemonName = document.createElement('p');
    pokemonName.textContent = pokemon.name;
    pokemonDiv.appendChild(pokemonName);
  
    pokedex.appendChild(pokemonDiv);
  }

fetchPokemon();
