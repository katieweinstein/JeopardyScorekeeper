import * as SQLite from 'expo-sqlite';

export function addMoveToDB(player_id, game_id, score) {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO Move (player_id, game_id, score) VALUES (?, ?, ?)',
        [player_id, game_id, score]
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
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM Move WHERE Move.game_id = ? ',
        [game_id],
        (tx, resultSet) => {
          const rows = resultSet.rows._array;
          console.log(rows);
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
