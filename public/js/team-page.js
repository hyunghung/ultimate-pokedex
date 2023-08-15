// document.addEventListener("DOMContentLoaded", function() {
//     const boxList = document.querySelectorAll(".box");
//     const cardSection = document.querySelector(".card");

//     boxList.forEach(function(box, index) {
//         box.addEventListener("click", function() {
//             const teamName = box.textContent;
//             const teamContent = generateTeamContent(teamName);

//             cardSection.innerHTML = teamContent;
//         });
//     });

//     function generateTeamContent(teamName) {
//         // You can customize this function to generate the content for each team
//         return `<h1 class="team-name">${teamName}</h1>
//                 <p class="team-description">This is the description for ${teamName}.</p>`;
//     }
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const boxList = document.querySelector(".box-list");

//     fetch("/views/teams.json")
//         .then(response => response.json())
//         .then(teams => {
//             teams.forEach((team, index) => {
//                 const box = document.createElement("div");
//                 box.className = "box";
//                 box.setAttribute("data-index", index);
//                 box.textContent = team.name;

//                 box.addEventListener("click", function() {
//                     const teamContent = generateTeamContent(team);
//                     updateCardSection(teamContent);
//                 });

//                 boxList.appendChild(box);
//             });
//         })
//         .catch(error => console.error("Error loading teams data:", error));

//     function generateTeamContent(team) {
//         return `<h1 class="team-name">${team.name}</h1>
//                 <p class="team-description">${team.description}</p>`;
//     }

//     function updateCardSection(content) {
//         const cardSection = document.querySelector(".card");
//         cardSection.innerHTML = content;
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    // Assuming teamsData is injected by the server
    const teamsData = window.teamsData || [];
  
    const boxList = document.querySelector('.box-list');
  
    teamsData.forEach((team, index) => {
      const box = document.createElement('div');
      box.classList.add('box');
      box.dataset.index = index;
      box.textContent = `Team ${index + 1}`;
      boxList.appendChild(box);
    });
  
    // Function to populate team members
    function populateTeamMembers(teamIndex) {
      const team = teamsData[teamIndex];
      const iconGroup = document.querySelector('.icon-group');
      const iconGroup2 = document.querySelector('.icon-group2');
  
      // Clear existing icons
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
  
    // Attach click event listeners to team boxes
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        const teamIndex = parseInt(box.dataset.index, 10);
        populateTeamMembers(teamIndex);
      });
    });
  });
