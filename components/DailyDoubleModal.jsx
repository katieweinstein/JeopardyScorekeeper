import React from 'react';
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { styles, buttons, text } from './styles';
import { addMoveToDB } from '../api/moves';

export default function DailyDoubleModal({
  dailyDoubleScore,
  moveInfo,
  setMoveInfo,
  gameInfo,
  modalVisible,
  setModalVisible,
}) {
  const [input, setInput] = React.useState(0);

  function handlePress(multiplier) {
    if (input < dailyDoubleScore) {
      addMoveToDB(moveInfo.player.id, gameInfo.gameId, input * multiplier);
      setModalVisible(!modalVisible);
      setInput('');
    }
  }

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
            <Text style={text.score}>
              Max wager: ${dailyDoubleScore > 2000 ? dailyDoubleScore : 2000}
            </Text>
          </View>
          {input > 0 ? (
            <View style={[styles.buttonRowContainer, { marginTop: 20 }]}>
              <Pressable
                style={[buttons.wager, { backgroundColor: 'red' }]}
                onPress={() => handlePress(-1)}
              >
                <Text style={text.smallCentered}>${input * -1}</Text>
              </Pressable>
              <Pressable
                style={[buttons.wager, { backgroundColor: 'green' }]}
                onPress={() => handlePress(1)}
              >
                <Text style={text.smallCentered}>${input}</Text>
              </Pressable>
            </View>
          ) : (
            <View />
          )}
          <View style={styles.scoreboardButtonContainer}>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setInput('');
                setMoveInfo({ ...moveInfo, score: 0 });
              }}
            >
              <Text style={text.smallCentered}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
