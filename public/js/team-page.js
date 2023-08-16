import Pokemon from '../models/Pokemon';

document.addEventListener('DOMContentLoaded', async () => {
  const teamsData = window.teamsData || [];

  const boxList = document.querySelector('.box-list');

  teamsData.forEach((team, index) => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.index = index;
    box.textContent = `Team ${index + 1}`;
    boxList.appendChild(box);
  });

  async function fetchPokemonList() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=890');
      const data = await response.json();
      return data.results.map(pokemon => pokemon.name);
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      return [];
    }
  }

  async function populatePokemonList() {
    try {
      const pokemonList = await fetchPokemonList();
      const pokemonSelect = document.querySelector('#pokemon-select');

      pokemonList.forEach(pokemonName => {
        const option = document.createElement('option');
        option.value = pokemonName;
        option.textContent = pokemonName;
        pokemonSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching and rendering Pokémon:', error);
    }
  }

  await populatePokemonList();

  function populateTeamMembers(teamIndex) {
    const team = teamsData[teamIndex];
    const iconGroup = document.querySelector('.icon-group');
    const iconGroup2 = document.querySelector('.icon-group2');

    iconGroup.innerHTML = '';
    iconGroup2.innerHTML = '';

    team.Pokemons.forEach(pokemon => {
      const img = document.createElement('img');
      img.classList.add(`icon${pokemon.slot}`);
      img.src = '/public/images/download.png';

      if (pokemon.slot <= 3) {
        iconGroup.appendChild(img);
      } else {
        iconGroup2.appendChild(img);
      }
    });
  }

  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      const teamIndex = parseInt(box.dataset.index, 10);
      populateTeamMembers(teamIndex);
    });
  });

  const addPokemonBtn = document.querySelector('#add-pokemon-btn');
  let currentTeamIndex = 0;

  addPokemonBtn.addEventListener('click', async () => {
    const selectedPokemonName = document.querySelector('#pokemon-select').value;
    
    try {
      const selectedPokemon = await Pokemon.findOne({
        where: {
          pokemon_name: selectedPokemonName,
          team_id: teamsData[currentTeamIndex].id,
        },
      });
      
      if (selectedPokemon) {
        console.log('This Pokémon is already in the team.');
        return;
      }
  
      await Pokemon.create({
        team_id: teamsData[currentTeamIndex].id,
        pokemon_name: selectedPokemonName,
      });
  
      console.log('Pokémon added to the team successfully.');
      populateTeamMembers(currentTeamIndex);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
});
