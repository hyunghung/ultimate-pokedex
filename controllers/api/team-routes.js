const router = require('express').Router();
const { Team, Pokemon } = require('../../models');

router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: Pokemon }],
    });

    res.json(teams);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/teams', async (req, res) => {
  try {
    const { user_id, name } = req.body;

    const newTeam = await Team.create({
      user_id: user_id,
      name: name,
    });

    res.status(201).json(newTeam);
  } catch (err) {
    console.error('Error creating new team:', err);
    res.status(500).json({ error: 'An error occurred while creating the team.' });
  }
});

router.post('/teams/:teamId/pokemon', async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const pokemonName = req.body.pokemonName;

    const team = await Team.findByPk(teamId, {
      include: [Pokemon],
    });

    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    if (team.Pokemons.length >= 6) {
      return res.status(400).json({ message: 'Team already has 6 Pokémon.' });
    }

    const newPokemon = await Pokemon.create({
      team_id: teamId,
      pokemon_name: pokemonName,
    });

    res.status(201).send('Pokémon added to the team successfully.');
  } catch (err) {
    res.status(500).send('An error occurred.');
  }
});

router.delete('/teams/:teamId/pokemon/:pokemonId', async (req, res) => {
  try {
    const { teamId, pokemonId } = req.params;

    await Pokemon.destroy({
      where: { id: pokemonId, team_id: teamId },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/teams/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;

    await Team.destroy({
      where: { id: teamId, user_id: req.session.user_id },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
