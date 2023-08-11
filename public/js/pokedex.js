const pokedex = document.querySelector('.pokedex');

async function fetchPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=890');
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
  
    const displayName = pokemon.name.replace(/-/g, ' '); // Replace hyphens with spaces for the URL
    const nameForUrl = displayName.toLowerCase().replace(/ /g, '_'); // Replace spaces with underscores for the URL
  
    // Create an <a> element with an <img> child for the Pokémon image
    const pokemonLink = document.createElement('a');
    pokemonLink.href = `https://projectpokemon.org/images/normal-sprite/${nameForUrl}.gif`;
    pokemonLink.target = '_blank'; // Open link in a new tab
    const pokemonImage = document.createElement('img');
  
    // Set the image source
    pokemonImage.src = `https://projectpokemon.org/images/normal-sprite/${nameForUrl}.gif`;
  
    // Append the image to the link
    pokemonLink.appendChild(pokemonImage);
  
    // Append the link to the Pokémon container
    pokemonDiv.appendChild(pokemonLink);
  
    // Create a <p> element for the Pokémon name at the bottom
    const pokemonName = document.createElement('p');
    pokemonName.textContent = pokemon.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());; // Replace hyphens with spaces AND captailize first letter for the Names
    pokemonDiv.appendChild(pokemonName);
  
    pokedex.appendChild(pokemonDiv);
  }
  
  fetchPokemon();
  
