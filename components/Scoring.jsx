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
          style={[
            buttons.doubleJeopardy,
            double ? { borderColor: 'white' } : { borderColor: '#84495A' },
          ]}
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
      <View style={styles.scoreboardButtonContainer}>
        {scores.length ? (
          scores.map((item, index) => (
            <Pressable
              style={[
                buttons.score,
                {
                  borderColor: moveInfo.score == item ? 'white' : 'transparent',
                },
                {
                  backgroundColor: scores[0] < 0 ? '#C84B58' : '#DFC74F',
                },
              ]}
              key={index}
              onPress={() => {
                setMoveInfo({
                  ...moveInfo,
                  score: item,
                });
              }}
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
