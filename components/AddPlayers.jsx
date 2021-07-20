import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import { addPlayerToDB } from '../api';
import PlayerList from './PlayerList';

export default function AddPlayers() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [input, setInput] = React.useState('');

  return (
    <View style={styles.container}>
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
            <View style={styles.inputView}>
              <Text style={styles.text}>New player's name:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                autoCapitalize="words"
                maxLength={50}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={function () {
                  addPlayerToDB(input);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.text}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <PlayerList />
      <Text style={styles.text}>We will add players here.</Text>
      <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.text}>Add New Player</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425896',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 24,
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
  inputView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#9e99de',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    margin: 10,
    padding: 10,
    maxHeight: 75,
    width: 120,
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
  input: {
    height: 50,
    width: 250,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 24,
  },
});
