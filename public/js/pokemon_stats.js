// Retrieve the Pokémon name and index from the URL query parameters
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const pokemonName = params.name;

// Fetch Pokémon details using the name and display them
fetchPokemonDetails(pokemonName);

async function fetchPokemonDetails(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    const pokemonId = data.id; // Extract the Pokémon's ID from the response
    displayPokemonStats(data, pokemonId); // Pass the ID to the display function
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}

async function displayPokemonStats(pokemon, pokemonId) {
  const pokemonImage = document.getElementById('pokemon-image');
  const pokemonName = document.getElementById('pokemon-name');
  const pokemonStats = document.getElementById('pokemon-stats');
  const pokemonMoves = document.getElementById('pokemon-moves');

  // Construct the sprite URL using the retrieved ID from the API response
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  pokemonImage.src = spriteUrl;
  pokemonName.textContent = pokemon.name;

  // Clear the previous elements
  pokemonStats.innerHTML = '';
  pokemonMoves.innerHTML = '';

  // Create a <div> element for types and append colored badges to it
  const typesElement = document.createElement('div');
  typesElement.classList.add('types');

  pokemon.types.forEach(typeInfo => {
    const typeElement = document.createElement('span');
    typeElement.textContent = typeInfo.type.name;
    typeElement.classList.add('type', typeInfo.type.name); // Add classes for styling
    typesElement.appendChild(typeElement);
  });

  pokemonStats.appendChild(typesElement);

  // Display base stats
  const baseStatsElement = document.createElement('div');
  baseStatsElement.classList.add('base-stats');

  pokemon.stats.forEach(stat => {
    const statElement = document.createElement('p');
    statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    baseStatsElement.appendChild(statElement);
  });

  pokemonStats.appendChild(baseStatsElement);

  // Display list of moves
  const movesElement = document.createElement('div');
  movesElement.classList.add('moves');

  pokemon.moves.slice(0, 10).forEach(moveInfo => {
    const moveElement = document.createElement('p');
    moveElement.textContent = moveInfo.move.name;
    movesElement.appendChild(moveElement);
  });

  pokemonMoves.appendChild(movesElement);
  
}

