import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';

export default function ScoringDetails({
  moveInfo,
  modalVisible,
  setModalVisible,
  scores,
  setScores,
  double,
  setDouble,
}) {
  return (
    <View style={styles.scoreboardButtonContainer}>
      <Pressable
        style={[
          buttons.dailyDouble,
          typeof moveInfo.player === 'string'
            ? { backgroundColor: 'grey' }
            : { backgroundColor: '#DC7C51' },
        ]}
        onPress={() => setModalVisible(!modalVisible)}
        disabled={typeof moveInfo.player === 'string'}
      >
        <Text style={text.smallCentered}>Daily Double</Text>
      </Pressable>
      <Pressable
        style={buttons.negativeScore}
        onPress={() => {
          setScores(scores.map((item) => item * -1));
        }}
      >
        <Text style={text.smallCentered}>—</Text>
      </Pressable>
      <Pressable
        style={buttons.doubleJeopardy}
        onPress={() => {
          setDouble(!double);
          double
            ? setScores([200, 400, 600, 800, 1000])
            : setScores([400, 800, 1200, 1600, 2000]);
        }}
      >
        <Text style={text.smallCentered}>
          {double ? 'Single Jeopardy' : 'Double Jeopardy'}
        </Text>
      </Pressable>
    </View>
  );
}
