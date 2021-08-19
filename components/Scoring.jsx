import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import DailyDoubleModal from './DailyDoubleModal';
import ScoringDetails from './ScoringDetails';

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
      <ScoringDetails
        moveInfo={moveInfo}
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
