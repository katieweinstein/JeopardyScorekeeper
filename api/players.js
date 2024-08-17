import * as SQLite from 'expo-sqlite';

export async function addPlayerToDB(playerName) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)')
    await db.runAsync(`INSERT INTO Player (name) VALUES (?)`, playerName);
    console.log('Player successfully added to table.')
  } catch (err) {
    console.log('Oops, something went wrong adding a player: ', err)
  }
}

export async function deletePlayer(id) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    db.runAsync('DELETE FROM Player WHERE id = ?', id)
    console.log('Player removed from table.');
  } catch (err) {
    console.log('Oops, something went wrong deleting this player: ', err)
  }
}

export async function getPlayers(setPlayersList) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    const players = await db.getAllAsync('SELECT * FROM Player')
    setPlayersList(players);
    console.log('Players successfully loaded.')
  } catch (err) {
    console.log(
      'Oops, something went wrong getting the list of players: ',
      err
    )
  }
}
