import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);

export function addMoveToDB(player_id, game_id, score) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO Move (player_id, game_id, score) VALUES (?, ?, ?)',
        [player_id, game_id, score],
        (tx, resultSet) => {
          const row = resultSet.rows._array;
          console.log('Move added: ', row);
        }
      );
    },
    (err) =>
      console.log(
        'Oops, something went wrong adding a move to the Move table: ',
        err
      ),
    () => console.log('Move successfully added to Move table.')
  );
}

// Get each move with score, player id, player name, and game id for a particular game.
export function getMovesForGame(setState, game_id) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM Move WHERE game_id = ? ',
        [game_id],
        (tx, resultSet) => {
          const rows = resultSet.rows._array;
          console.log('Database response: ', rows);
          setState(rows);
        }
      );
    },
    (err) =>
      console.log(
        'Oops, something went wrong getting the list of moves: ',
        err
      ),
    () => console.log('Moves for this player successfully loaded.')
  );
}

// Get each move with score, player id, player name, and game id for a particular game.
export async function getScoreForPlayer(game_id, player_id) {
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
