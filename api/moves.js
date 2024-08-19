import * as SQLite from 'expo-sqlite';

export async function addMoveToDB(player_id, game_id, score) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    await db.runAsync(
      'INSERT INTO Move (player_id, game_id, score) VALUES (?, ?, ?)',
      player_id, game_id, score)
    console.log('🚛 Move successfully added to Move table.')
  } catch (err) {
    console.log(
      '❌ Oops, something went wrong adding a move to the Move table: ',
      err
    )
  }
}

// Get each move with score, player id, player name, and game id for a particular game.
export async function getMovesForGame(setState, game_id) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    const rows = await db.getAllAsync(
      'SELECT * FROM Move WHERE game_id = ? ',
      game_id)
    setState(rows);
    console.log('🚛 Moves for all players successfully loaded.')
  } catch (err) {
    console.log(
      '❌ Oops, something went wrong getting the list of moves: ',
      err
    )
  }
}

// Get score for an individual player.
export async function getScoreForPlayer(game_id, player_id) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    const rows = await db.getAllAsync(
      'SELECT score FROM Move WHERE player_id = ? AND game_id = ?',
      player_id, game_id)
    console.log('🚛 Moves for this player successfully loaded.')
    if (!rows.length) {
      return { total: 0 };
    } else {
      const scores = rows.map((item) => item.score);
      const total = scores.reduce((total, current) => total + current);
      return { total: total }
    }
  } catch (err) {
    console.log(
      '❌ Oops, something went wrong getting score for a player: ',
      err
    )
  }
}
