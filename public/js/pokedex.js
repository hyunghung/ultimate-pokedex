//-------------------------------- LIST OF POKEMON ---------------------------------
const pokedex = document.querySelector('.pokedex');

let pokemonDetails = []; // Create an empty array to be used for search function 

async function fetchAndRenderPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=890');
    const data = await response.json();
    pokemonDetails = await Promise.all(data.results.map(fetchPokemonDetails));
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
// If the pokemon name isnt a valid name, display the name that will work with the url
function processPokemonName(pokemonName) {
    // Define replacement patterns and their corresponding replacements
    const replacements = [
      { pattern: "mr_mime", replacement: "mr.mime" },
      { pattern: "mr_rime", replacement: "mr.rime" },
      { pattern: "ho_oh", replacement: "ho-oh" },
      { pattern: "deoxys_normal", replacement: "deoxys" },
      { pattern: "wormadam_plant", replacement: "wormadam" },
      { pattern: "tapu_lele", replacement: "tapulele" },
      { pattern: "tapu_koko", replacement: "tapukoko" },
      { pattern: "tapu_bulu", replacement: "tapubulu" },
      { pattern: "tapu_fini", replacement: "tapufini" },
      { pattern: "keldeo_ordinary", replacement: "keldeo" },
      { pattern: "porygon_z", replacement: "porygon-z" },
      { pattern: "darmanitan_standard", replacement:"darmanitan"},
      { pattern: "giratina_altered", replacement:"giratina"},
      { pattern: "aegislash_shield", replacement:"aegislash"},
      { pattern: "meowstic_male", replacement:"meowstic"},
      { pattern: "tornadus_incarnate", replacement:"tornadus"},//641 index
      { pattern: "zygarde_50", replacement:"zygarde"},
      { pattern: "basculin_red_striped", replacement:"basculin"},
      { pattern: "toxtricity_amped", replacement:"toxtricity"},
      { pattern: "shaymin_land", replacement:"shaymin"},
      { pattern: "thundurus_incarnate", replacement:"thundurus"},
      { pattern: "eiscue_ice", replacement:"eiscue"},
      { pattern: "gourgeist_average", replacement:"gourgeist"},
      { pattern: "morpeko_full_belly", replacement:"morpeko"},
      { pattern: "indeedee_male", replacement:"indeedee"},
      { pattern: "landorus_incarnate", replacement:"landorus"},
      { pattern: "lycanroc_midday", replacement:"lycanroc"},
      { pattern: "oricorio_baile", replacement:"oricorio"},
      { pattern: "sirfetchd", replacement:"sirfetchd"},
      { pattern: "type_null", replacement:"typenull"},
      { pattern: "mimikyu_disguised", replacement:"mimikyu-totem"},
      { pattern: "hakamo_o", replacement:"hakamo-o"},
      { pattern: "minior_red_meteor", replacement:"minior"},
      { pattern: "pumpkaboo_average", replacement:"pumpkaboo"},
      { pattern: "meloetta_aria", replacement:"meloetta"},
      { pattern: "kommo_o", replacement:"kommo-o"},
      { pattern: "wishiwashi_solo", replacement:"wishiwashi"},
      { pattern: "jangmo_o", replacement:"jangmo-o"},
    ];
    // Check if the name matches any pattern, and apply replacement if found
    for (const { pattern, replacement } of replacements) {
      if (pokemonName === pattern) {
        return replacement;
      }
    }
    // If no modifications needed, return the original name
    return pokemonName;
  }

  function displayPokemon(pokemon, index) {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

  const displayName = pokemon.name.replace(/-/g, ' ');
  const nameForUrl = displayName.toLowerCase().replace(/ /g, '_');
  const modName = processPokemonName(nameForUrl);

  let imageUrl;
  if (modName === 'sirfetchd') {
    imageUrl = 'https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/sirfetchd.gif';
  } else {
    imageUrl = `https://projectpokemon.org/images/normal-sprite/${modName}.gif`;
  }

  // Create an <a> element for the Pokémon card
  const pokemonCardLink = document.createElement('a');
  pokemonCardLink.href = `pokemon_stats.html?name=${modName}&index=${index}`; // Connects it to the pokemon_stats.html page
  pokemonCardLink.classList.add('pokemon-card-link');

  // Create a <div> element for the Pokémon card content
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  // Create an gif element for the Pokémon image
  const pokemonImage = document.createElement('img');
  pokemonImage.src = imageUrl;
  pokemonCard.appendChild(pokemonImage);

  // Create a <p> element for the Pokémon name and index
  const pokemonInfo = document.createElement('p');
  const paddedIndex = String(index + 1).padStart(3, '0');
  pokemonInfo.textContent = `#${paddedIndex} ${modName.replace(/\b\w/g, c => c.toUpperCase())}`;
  pokemonCard.appendChild(pokemonInfo);

  // Append the card content to the <a> element
  pokemonCardLink.appendChild(pokemonCard);

  // Append the <a> element to the pokedex
  pokemonDiv.appendChild(pokemonCardLink);
  pokedex.appendChild(pokemonDiv);
}

    
//---------------------------- SEARCH FUNCTION ----------------------------

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const pokemonCardTemplateSource = document.getElementById('pokemon-card-template').innerHTML;
const pokemonCardTemplate = Handlebars.compile(pokemonCardTemplateSource);

// Modify the searchPokemon function to search by partial name
function searchPokemon(searchTerm) {
  // Filter pokemonDetails based on the search term
  const filteredPokemon = pokemonDetails.filter(pokemon => {
    const name = pokemon.name.toLowerCase();
    return name.includes(searchTerm);
  });

  // Clear existing content in the pokedex
  pokedex.innerHTML = '';

  // Render the filtered Pokemon cards
  filteredPokemon.forEach((pokemon, index) => {
    displayPokemon(pokemon, index);
  });
}

// Event listener for search input
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm) {
    searchPokemon(searchTerm);
  } else {
    pokedex.innerHTML = ''; // Clear existing content in the pokedex
    fetchAndRenderPokemon(); // Render the full Pokedex
  }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderPokemon();
});






