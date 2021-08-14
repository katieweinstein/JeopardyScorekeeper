import React from 'react';
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { styles, buttons, text } from './styles';
import { addMoveToDB } from '../api/moves';

export default function DailyDoubleModal({
  moveInfo,
  gameInfo,
  modalVisible,
  setModalVisible,
}) {
  const [input, setInput] = React.useState('');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.inputView}>
            <Text style={text.modalText}>{moveInfo.player.name}'s wager:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInput}
              value={input}
              maxLength={6}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.scoreboardButtonContainer}>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setInput('');
              }}
            >
              <Text style={text.smallCentered}>Cancel</Text>
            </Pressable>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                addMoveToDB(moveInfo.player.id, gameInfo.gameId, input * -1);
                setModalVisible(!modalVisible);
                setInput('');
              }}
            >
              <Text style={text.smallCentered}>{input * -1}</Text>
            </Pressable>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                addMoveToDB(moveInfo.player.id, gameInfo.gameId, input);
                setModalVisible(!modalVisible);
                setInput('');
              }}
            >
              <Text style={text.smallCentered}>{input}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
