import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { getPlayers } from '../api/players';
import DeletePlayerModal from './DeletePlayerModal';

export default function PlayerList({
  playersList,
  setPlayersList,
  playersInGame,
  setPlayersInGame,
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [playerToDelete, setPlayerToDelete] = React.useState('');

  React.useEffect(() => {
    getPlayers(setPlayersList);
    playersList.forEach((player) => (player.selected = false));
  }, []);

  // Add players to the list for the current game
  function selectPlayers(item) {
    if (item.selected) {
      item.selected = !item.selected;
      setPlayersInGame(playersInGame.filter((player) => player !== item));
    } else {
      if (playersInGame.length < 6) {
        item.selected = !item.selected;
        setPlayersInGame([...playersInGame, item]);
      } else {
        console.log('Too many players!');
      }
    }
  }

  // Item to be created for each element in the flat list - includes delete button
  const nameItem = (item) => (
    <View
      style={
        (styles.nameContainer,
        { backgroundColor: item.selected ? '#6961ad' : 'transparent' })
      }
    >
      <Pressable
        onPress={() => selectPlayers(item)}
        style={styles.nameContainer}
      >
        <Text style={styles.text}>{item.name}</Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            setPlayerToDelete(item);
          }}
          style={styles.deleteButton}
        >
          <Text style={{ color: 'white' }}>-</Text>
        </Pressable>
      </Pressable>
    </View>
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <DeletePlayerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        playerToDelete={playerToDelete}
        setPlayersList={setPlayersList}
      />
      <FlatList
        style={styles.flatList}
        data={playersList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => nameItem(item)}
      />
      <Text style={styles.tooManyPlayers}>Max 6 players per game.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 36,
    paddingLeft: 5,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 20,
  },
  flatList: {
    backgroundColor: '#231d5b',
    marginTop: 50,
    marginBottom: 10,
    padding: 5,
    // paddingTop: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
    paddingBottom: 20,
    flexGrow: 0,
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#edc8a2',
    borderRadius: 10,
  },
  tooManyPlayers: {
    display: 'flex',
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#9e99de',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    margin: 10,
    padding: 20,
    maxHeight: 75,
  },
});
