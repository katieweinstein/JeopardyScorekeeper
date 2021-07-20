import * as SQLite from 'expo-sqlite';

export function addPlayerToDB(name) {
  const db = SQLite.openDatabase('eopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(function (action) {
    action.executeSql(
      'CREATE TABLE IF NOT EXISTS Player(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
      []
    );
    action.executeSql(
      'INSERT INTO Player (name) VALUES (?)',
      [name],
      function (tx, resultSet) {
        console.log('Player added to table.');
      },
      function (tx, err) {
        console.log(
          'Oops, something went wrong adding a player to the Player table: ',
          err
        );
      }
    );
  });
}
