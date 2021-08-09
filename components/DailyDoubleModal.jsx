import React from 'react';
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { styles, buttons, text } from './styles';
import { addMoveToDB } from '../api/move';

export default function DailyDoubleModal({
  moveInfo,
  setMoveInfo,
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
                setMoveInfo({ ...moveInfo, score: input * -1 });
                addMoveToDB(
                  moveInfo.player.id,
                  gameInfo.gameId,
                  moveInfo.score
                );
                setModalVisible(!modalVisible);
                setInput('');
              }}
            >
              <Text style={text.smallCentered}>Incorrect</Text>
            </Pressable>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                setMoveInfo({ ...moveInfo, score: input });
                addMoveToDB(
                  moveInfo.player.id,
                  gameInfo.gameId,
                  moveInfo.score
                );
                setModalVisible(!modalVisible);
                setInput('');
              }}
            >
              <Text style={text.smallCentered}>Correct</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
