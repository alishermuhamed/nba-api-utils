import express from 'express';
import dayjs from 'dayjs';

import getRecentInterestingGames from './get-recent-interesting-games.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/recent-interesting-games', async (req, res) => {
  const scoringMargin = parseInt(req.query['scoring-margin']);

  let games;

  try {
    games = await getRecentInterestingGames(scoringMargin);
  } catch (e) {
    console.error(e);
    res.status(500).json({ errorMessage: 'Unexpected error' });
    return;
  }

  const response = games.map(game => {
    const visitorTeam = game.visitor_team.full_name;
    const homeTeam = game.home_team.full_name;
    const date = dayjs(game.date).format('DD.MM.YYYY');

    return `${visitorTeam} — ${homeTeam}, ${date}`;
  })

  res.json(response);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
