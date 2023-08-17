document.addEventListener('DOMContentLoaded', async () => {
  const boxList = document.querySelector('.box-list');
  const createNewTeamBtn = document.querySelector('#create-new-team-btn');
  const teamsData = [];

  function renderTeamBoxes() {
    boxList.innerHTML = '';
    teamsData.forEach((team, index) => {
      const box = document.createElement('div');
      box.classList.add('box');
      box.dataset.index = index;
      box.textContent = team.name;
      boxList.appendChild(box);
    });

    attachBoxEventListeners();
  }

  function attachBoxEventListeners() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        const teamIndex = parseInt(box.dataset.index, 10);
        currentTeamIndex = teamIndex;
        populateTeamMembers(teamIndex);
      });
    });
  }

  async function createNewTeam(name) {
    try {
      const response = await fetch('/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const newTeam = await response.json();
      teamsData.push(newTeam);
      renderTeamBoxes();
    } catch (error) {
      console.error('Error creating new team:', error);
    }
  }

  createNewTeamBtn.addEventListener('click', () => {
    const teamName = prompt('Enter a name for your new team:');
    if (teamName) {
      createNewTeam(teamName);
    }
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
      currentTeamIndex = teamIndex;
      populateTeamMembers(teamIndex);
    });
  });

  let currentTeamIndex = -1;

  const addPokemonBtn = document.querySelector('#add-pokemon-btn');
  addPokemonBtn.addEventListener('click', async () => {
    const selectedPokemonName = document.querySelector('#pokemon-select').value;
    try {
      const currentTeam = teamsData[currentTeamIndex];
      if (!currentTeam) {
        console.log('Invalid team index.');
        return;
      }

      const response = await fetch(`/teams/${currentTeam.id}/pokemon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pokemonName: selectedPokemonName }),
      });

      if (response.ok) {
        console.log('Pokémon added to the team successfully.');
        populateTeamMembers(currentTeamIndex);
      } else {
        console.error('Error adding Pokémon:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
});
