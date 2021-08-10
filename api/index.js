import * as SQLite from 'expo-sqlite';

/* ONLY USE IN DEV ENVIRONMENT TO REMOVE DATABASE AND START FROM SCRATCH */
// (function clearTable() {
//   const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
//   db.transaction(
//     (tx) => tx.executeSql('DROP TABLE Move', []),
//     (err) =>
//       console.log('Oops, something went wrong removing the Game table: ', err),
//     () => console.log('Game table successfully deleted.')
//   );
// })();

export function createPlayerTable() {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)',
        []
      );
    },
    (err) =>
      console.log(
        'Oops, something went wrong creating the Player table: ',
        err
      ),
    () => console.log('Player table successfully created.')
  );
}

export function createGameTable() {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Game(id INTEGER PRIMARY KEY NOT NULL, player_1 TEXT NOT NULL, player_2 TEXT, player_3 TEXT, player_4 TEXT, player_5 TEXT, player_6 TEXT, date_played DATETIME NOT NULL, episode INTEGER, nickname TEXT, FOREIGN KEY(player_1) REFERENCES Player(id), FOREIGN KEY(player_2) REFERENCES Player(id), FOREIGN KEY(player_3) REFERENCES Player(id), FOREIGN KEY(player_4) REFERENCES Player(id), FOREIGN KEY(player_5) REFERENCES Player(id), FOREIGN KEY(player_6) REFERENCES Player(id))',
        []
      );
    },
    (err) =>
      console.log('Oops, something went wrong creating the Game table: ', err),
    () => console.log('Game table successfully created.')
  );
}

export function createMoveTable() {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Move(id INTEGER PRIMARY KEY NOT NULL, player_id INTEGER NOT NULL, game_id INTEGER NOT NULL, score INTEGER NOT NULL, FOREIGN KEY(player_id) REFERENCES Player(id), FOREIGN KEY(game_id) REFERENCES Game(id))',
        []
      );
    },
    (err) =>
      console.log('Oops, something went wrong creating the Move table: ', err),
    () => console.log('Move table successfully created.')
  );
}
