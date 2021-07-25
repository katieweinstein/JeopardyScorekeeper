import * as SQLite from 'expo-sqlite';

export let players = [];

(function createPlayerTable() {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(function (action) {
    action.executeSql(
      'CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
      [],
      function (tx, result) {
        console.log('Player table successfully created.');
      },
      function (tx, err) {
        console.log(
          'Oops, something went wrong creating the Player table: ',
          err
        );
      }
    );
  });
})();

export function addPlayerToDB(name) {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(function (action) {
    action.executeSql(
      'CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
      []
    );
    action.executeSql(
      'INSERT INTO Player (name) VALUES (?)',
      [name],
      function (tx, resultSet) {
        console.log('Player added to table.', resultSet);
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

export function getPlayers() {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(function (action) {
    action.executeSql(
      'SELECT * FROM Player',
      [],
      function (tx, resultSet) {
        const rows = resultSet.rows._array;
        players = [];
        for (let i = 0; i < rows.length; i++) {
          players.push(rows[i].name);
        }
        console.log('Players in function: ', players);
      },
      (tx, err) =>
        console.log(
          'Oops, something went wrong getting the list of players: ',
          err
        )
    );
  });
}
