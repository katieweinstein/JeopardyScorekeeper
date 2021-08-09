import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import DailyDoubleModal from './DailyDoubleModal';

export default function Scoring({
  scores,
  setScores,
  double,
  setDouble,
  moveInfo,
  setMoveInfo,
  gameInfo,
}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <DailyDoubleModal
        moveInfo={moveInfo}
        setMoveInfo={setMoveInfo}
        gameInfo={gameInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.scoreboardButtonContainer}>
        <Pressable
          style={buttons.dailyDouble}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={text.smallCentered}>Daily Double</Text>
        </Pressable>
        <Pressable
          style={[
            buttons.negativeScore,
            moveInfo.score < 0
              ? { borderColor: 'white' }
              : { borderColor: '#C84B58' },
          ]}
          onPress={() => {
            setMoveInfo({ ...moveInfo, score: moveInfo.score * -1 });
          }}
        >
          <Text style={text.smallCentered}>—</Text>
        </Pressable>
        <Pressable style={buttons.doubleJeopardy}>
          <Text style={text.smallCentered}>Double Jeopardy</Text>
        </Pressable>
      </View>
      <View style={styles.scoreboardButtonContainer}>
        {scores.length ? (
          scores.map((item, index) => (
            <Pressable
              style={[
                buttons.scoreButton,
                Math.abs(moveInfo.score) === item
                  ? { borderColor: 'white' }
                  : { borderColor: '#DFC74F' },
              ]}
              key={index}
              onPress={() =>
                setMoveInfo({
                  ...moveInfo,
                  score: moveInfo.score < 0 ? item * -1 : item,
                })
              }
            >
              <Text style={text.mainText}>{item}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={text.smallCentered}>Loading...</Text>
        )}
      </View>
    </View>
  );
}
