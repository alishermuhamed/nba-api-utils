import dayjs from 'dayjs';

const DEFAULT_SCORING_MARGIN = 10;
const BALLDONTLIE_API_URL = 'https://www.balldontlie.io/api/v1';
const TODAY = dayjs();
const YESTERDAY = TODAY.subtract(1, 'day');

/**
 * Returns a list of recent games with a scoring margin less than given
 * @param {number} scoringMargin Absolute scoring margin
 * @returns {Promise<Array>} An array of games
 */
async function getRecentInterestingGames(scoringMargin) {
  if (!scoringMargin || !Number.isFinite(scoringMargin))
    scoringMargin = DEFAULT_SCORING_MARGIN;

  const todayFormatted = TODAY.format('YYYY-MM-DD');
  const yesterdayFormatted = YESTERDAY.format('YYYY-MM-DD');
  const url = `${BALLDONTLIE_API_URL}/games?start_date=${yesterdayFormatted}&end_date=${todayFormatted}`;

  const response = await fetch(url);
  const json = await response.json();
  const games = json.data;

  if (!games || !Array.isArray(games)) throw new Error('Unexpected response');

  return games.filter(game => {
    const isFinal = game.status === 'Final'
      && Number.isFinite(game.home_team_score)
      && Number.isFinite(game.visitor_team_score);

    if (!isFinal) return false;

    const gameScoringMargin = Math.abs(game.home_team_score - game.visitor_team_score);

    return gameScoringMargin < scoringMargin;
  });
}

export default getRecentInterestingGames;
