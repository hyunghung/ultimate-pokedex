const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let pokemonName = params.name.replace(/_/g, '-'); 

fetchPokemonDetails(pokemonName);

async function fetchPokemonDetails(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    const pokemonId = data.id; 
    displayPokemonStats(data, pokemonId); 
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}
async function displayPokemonStats(pokemon, pokemonId) {
  const pokemonImage = document.getElementById('pokemon-image');
  const pokemonNameElement = document.getElementById('pokemon-name');
  const typesElement = document.getElementById('pokemon-types'); 
  const pokemonStats = document.getElementById('pokemon-stats');
  const pokemonMoves = document.getElementById('pokemon-moves');

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  pokemonImage.src = spriteUrl;
  pokemonNameElement.textContent = pokemon.name;

  typesElement.innerHTML = '';
  pokemonStats.innerHTML = '';
  pokemonMoves.innerHTML = '';

  // Display types
  pokemon.types.forEach(typeInfo => {
    const typeElement = document.createElement('span');
    typeElement.textContent = typeInfo.type.name;
    typeElement.classList.add('type', typeInfo.type.name); 
    typesElement.appendChild(typeElement);
  });

  // Display base stats
  const baseStatsElement = document.createElement('div');
  baseStatsElement.classList.add('base-stats');

  pokemon.stats.forEach(stat => {
    const statElement = document.createElement('p');
    statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    baseStatsElement.appendChild(statElement);
  });

  pokemonStats.appendChild(baseStatsElement);

  const movesElement = document.createElement('div');
  movesElement.classList.add('moves');

  pokemon.moves.slice(0, 10).forEach(moveInfo => {
    const moveElement = document.createElement('p');
    moveElement.textContent = moveInfo.move.name;
    movesElement.appendChild(moveElement);
  });

  pokemonMoves.appendChild(movesElement);
}
