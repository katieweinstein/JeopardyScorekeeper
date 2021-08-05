import * as SQLite from 'expo-sqlite';

export let currentGameId = -1;

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
          currentGameId = resultSet.insertId;
          console.log('Game added to table: ', resultSet.insertId);
        }
      );
    },
    (err) => console.log('Oops, something went wrong adding a game: ', err),
    () => console.log('Game successfully added to table.')
  );
}

export function getCurrentGameInfo(setGameInfo) {
  const db = SQLite.openDatabase('jeopardy-scorekeeper.db', '1.0', '', 1);
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM Game WHERE id = ?',
        [currentGameId],
        (tx, resultSet) => {
          console.log('Game info: ', resultSet.rows._array);
          const data = resultSet.rows._array;
          let playerArray = [];
          for (let prop in data) {
            if (prop.includes('player') && data[prop] !== null) {
              playerArray.push(data[prop].parseInt());
            }
          }
          setGameInfo({ gameId: data.id, players: playerArray });
          console.log('Player Array: ', playerArray);
        }
      );
    },
    (err) =>
      console.log(
        'Oops, something went wrong getting the current game info: ',
        err
      ),
    () => console.log('Game info obtained.')
  );
}
