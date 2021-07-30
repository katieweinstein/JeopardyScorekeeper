import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { getPlayers, deletePlayer } from '../api/players';

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
        />
      </Pressable>
    </View>
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you would like to delete {playerToDelete.name}? This
              will permanently and irreversibly remove this player and their
              game history.
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalText}>No</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  deletePlayer(playerToDelete.id);
                  getPlayers(setPlayersList);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.modalText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

function tooManyPlayers(display) {
  return;
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
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 5,
    marginRight: 10,
  },
  modalText: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 24,
    textAlign: 'center',
  },
  flatList: {
    backgroundColor: '#231d5b',
    marginTop: 50,
    marginBottom: 10,
    paddingLeft: 10,
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
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#9e99de',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    width: 120,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  buttonContainer: {
    flex: 0.75,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#8180c2',
    borderRadius: 20,
    padding: 35,
    height: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
