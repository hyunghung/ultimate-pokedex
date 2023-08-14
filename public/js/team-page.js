document.addEventListener("DOMContentLoaded", function() {
    const boxList = document.querySelectorAll(".box");
    const cardSection = document.querySelector(".card");

    boxList.forEach(function(box, index) {
        box.addEventListener("click", function() {
            const teamName = box.textContent;
            const teamContent = generateTeamContent(teamName);

            cardSection.innerHTML = teamContent;
        });
    });

    function generateTeamContent(teamName) {
        // You can customize this function to generate the content for each team
        return `<h1 class="team-name">${teamName}</h1>
                <p class="team-description">This is the description for ${teamName}.</p>`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const boxList = document.querySelector(".box-list");

    fetch("/views/teams.json")
        .then(response => response.json())
        .then(teams => {
            teams.forEach((team, index) => {
                const box = document.createElement("div");
                box.className = "box";
                box.setAttribute("data-index", index);
                box.textContent = team.name;

                box.addEventListener("click", function() {
                    const teamContent = generateTeamContent(team);
                    updateCardSection(teamContent);
                });

                boxList.appendChild(box);
            });
        })
        .catch(error => console.error("Error loading teams data:", error));

    function generateTeamContent(team) {
        return `<h1 class="team-name">${team.name}</h1>
                <p class="team-description">${team.description}</p>`;
    }

    function updateCardSection(content) {
        const cardSection = document.querySelector(".card");
        cardSection.innerHTML = content;
    }
});