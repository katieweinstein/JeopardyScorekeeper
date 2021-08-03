import * as SQLite from 'expo-sqlite';

function createPlayerArray(players) {
  let playerArray = [];
  for (let i = 0; i < 6; i++) {
    if (players[i]) {
      playerArray.push(players[i].id);
    } else {
      playerArray.push(null);
    }
  }
  return playerArray;
}

export function addGameToDB(players, episode, nickname) {
  const arr = createPlayerArray(players);
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO Game (player_1, player_2, player_3, player_4, player_5, player_6, date_played, episode, nickname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          arr[0],
          arr[1],
          arr[2],
          arr[3],
          arr[4],
          arr[5],
          new Date(),
          episode,
          nickname,
        ],
        (tx, resultSet) => {
          console.log('Game added to table: ', resultSet);
        }
      );
    },
    (err) => console.log('Oops, something went wrong adding a game: ', err),
    () => console.log('Game successfully added to table.')
  );
}
