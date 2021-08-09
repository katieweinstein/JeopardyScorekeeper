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
