const router = require('express').Router();
const { Team, Pokemon } = require('../../models');
const path = require('path');
const fs = require('fs');


// Route to render team-page.html and display teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: Pokemon }],
    });

    const filePath = path.join(__dirname, '../../public/team-page.html');
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    const teamsDataScript = `<script>window.teamsData = ${JSON.stringify(teams)};</script>`;
    const modifiedHtml = htmlContent.replace('</body>', `${teamsDataScript}</body>`);

    res.send(modifiedHtml);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// Create a new team
router.post('/teams', async (req, res) => {
  try {
    const newTeam = await Team.create({
      user_id: req.session.user_id,
    });

    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a Pokemon to a team
router.post('/teams/:teamId/pokemon', async (req, res) => {
  try {
    const teamId = req.params.teamId;

    const newPokemon = await Pokemon.create({
      team_id: teamId,
    });

    res.status(201).json(newPokemon);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a Pokemon from a team
router.delete('/teams/:teamId/pokemon/:pokemonId', async (req, res) => {
  try {
    const { teamId, pokemonId } = req.params;

    await Pokemon.destroy({
      where: { id: pokemonId, team_id: teamId },
    });

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a team
router.delete('/teams/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;

    await Team.destroy({
      where: { id: teamId, user_id: req.session.user_id },
    });

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
