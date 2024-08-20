import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text, colors } from './styles/styles';
import DailyDoubleModal from './DailyDoubleModal';
import ScoringOptions from './ScoringOptions';

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
  const [dailyDoubleScore, setDailyDoubleScore] = React.useState(0);

  return (
    <View>
      <DailyDoubleModal
        dailyDoubleScore={dailyDoubleScore}
        setDailyDoubleScore={setDailyDoubleScore}
        moveInfo={moveInfo}
        setMoveInfo={setMoveInfo}
        gameInfo={gameInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        double={double}
      />
      <ScoringOptions
        setDailyDoubleScore={setDailyDoubleScore}
        moveInfo={moveInfo}
        gameInfo={gameInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        scores={scores}
        setScores={setScores}
        double={double}
        setDouble={setDouble}
      />
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
                  backgroundColor: scores[0] < 0 ? colors.trueRed : colors.trueYellow,
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
              <Text style={text.mainText}>${item}</Text>
            </Pressable>
          ))
        ) : (
            <Text style={text.smallCentered}>Loading...</Text>
          )}
      </View>
    </View>
  );
}
