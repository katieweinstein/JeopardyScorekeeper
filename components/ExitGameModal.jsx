import React from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { styles, buttons, text } from './styles/styles';

export default function ExitGameModal({
  modalVisible,
  setModalVisible,
  navigation
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
          <Text style={text.modalText}>
            Are you sure you would like to exit the current game? You will not be able to return to this game.
          </Text>
          <View style={styles.buttonRowContainer}>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={text.modalText}>Stay</Text>
            </Pressable>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('AddPlayers', { name: 'AddPlayers' })
              }
              }
            >
              <Text style={text.modalText}>Exit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
