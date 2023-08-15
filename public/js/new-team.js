const express = require('express');
const app = express();

app.get('/dynamic-teams', (req, res) => {
    // Generate the dynamic JSON data based on your requirements
    const dynamicData = [
        // Your dynamically generated JSON objects here
    ];

    res.json(dynamicData);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

document.addEventListener("DOMContentLoaded", function() {
    const boxList = document.querySelector(".box-list");

    fetch("/dynamic-teams")
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

    // Rest of the code...
});