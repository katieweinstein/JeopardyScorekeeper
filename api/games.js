import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');

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

export async function addGameToDB(players, episode, nickname) {
  const arr = createPlayerArray(players);
  return new Promise((resolve, reject) => {
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
            const gameId = resultSet.insertId;
            resolve({ gameId });
          }
        );
      },
      (err) => console.log('Oops, something went wrong adding a game: ', err),
      () => {
        console.log('Game added to table.');
      }
    );
  });
}

// export function getCurrentGameInfo(setGameInfo, gameInfo) {
//   console.log('Current game id: ', currentGameId);
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         'SELECT * FROM Game WHERE id = ?',
//         [currentGameId],
//         (tx, resultSet) => {
//           const data = resultSet.rows._array;
//           console.log('Id: ', data);
//           setGameInfo({ ...gameInfo, gameId: data.id });
//         }
//       );
//     },
//     (err) =>
//       console.log(
//         'Oops, something went wrong getting the current game info: ',
//         err
//       ),
//     () => console.log('Game info obtained.')
//   );
// }
