import * as SQLite from 'expo-sqlite';

export function addPlayerToDB(name) {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
        []
      );
      tx.executeSql(
        'INSERT INTO Player (name) VALUES (?)',
        [name],
        (tx, resultSet) => {
          console.log('Player added to table: ', resultSet);
        }
      );
    },
    (err) => console.log('Oops, something went wrong adding a player: ', err),
    () => console.log('Player successfully added to table.')
  );
}

export function deletePlayer(id) {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql('DELETE FROM Player WHERE id = ?', [id], () => {
        console.log('Player removed from table.');
      });
    },
    (err) =>
      console.log('Oops, something went wrong deleting this player: ', err),
    () => console.log('Player deleted and transaction complete.')
  );
}

export function getPlayers(setPlayersList) {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql('SELECT * FROM Player', [], (tx, resultSet) => {
        const rows = resultSet.rows._array;
        setPlayersList(rows);
      });
    },
    (err) =>
      console.log(
        'Oops, something went wrong getting the list of players: ',
        err
      ),
    () => console.log('Players successfully loaded.')
  );
}
