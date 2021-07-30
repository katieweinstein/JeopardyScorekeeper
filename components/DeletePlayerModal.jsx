import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { getPlayers, deletePlayer } from '../api/players';

export default function DeletePlayerModal({
  modalVisible,
  setModalVisible,
  playerToDelete,
  setPlayersList,
}) {
  return (
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
            will permanently and irreversibly remove this player and their game
            history.
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
  );
}

const styles = StyleSheet.create({
  modalText: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 24,
    textAlign: 'center',
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
