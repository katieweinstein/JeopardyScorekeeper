import * as SQLite from 'expo-sqlite';

export async function addMoveToDB(player_id, game_id, score) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    await db.runAsync(
      'INSERT INTO Move (player_id, game_id, score) VALUES (?, ?, ?)',
      player_id, game_id, score)
    console.log('Move successfully added to Move table.')
  } catch (err) {
    console.log(
      'Oops, something went wrong adding a move to the Move table: ',
      err
    )
  }
}

// Get each move with score, player id, player name, and game id for a particular game.
export async function getMovesForGame(setState, game_id) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    const rows = db.getFirstAsync(
      'SELECT * FROM Move WHERE game_id = ? ',
      game_id)
    console.log('Database response: ', rows);
    // setState(rows);
    console.log('Moves for this player successfully loaded.')
  } catch (err) {
    console.log(
      'Oops, something went wrong getting the list of moves: ',
      err
    )
  }
}

// Get score for an individual player.
export async function getScoreForPlayer(game_id, player_id) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT score FROM Move WHERE player_id = ? AND game_id = ?',
          [player_id, game_id],
          (tx, resultSet) => {
            if (!resultSet.rows._array.length) {
              const none = 0;
              resolve({ none });
            } else {
              const scores = resultSet.rows._array.map((item) => item.score);
              const total = scores.reduce((total, current) => total + current);
              resolve({ total });
            }
          }
        );
      },
      (err) =>
        console.log(
          'Oops, something went wrong getting score for a player: ',
          err
        )
    );
  });
}
