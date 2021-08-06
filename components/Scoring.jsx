import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';

export default function Scoring() {
  const [scores, setScores] = React.useState([200, 400, 600, 800, 1000]);
  const [double, setDouble] = React.useState(false);

  return (
    <View style={styles.scoreboardButtonContainer}>
      {scores.length ? (
        scores.map((item, index) => (
          <Pressable style={buttons.scoreButton} key={index}>
            <Text style={text.mainText}>{item}</Text>
          </Pressable>
        ))
      ) : (
        <Text style={text.smallCentered}>Loading...</Text>
      )}
    </View>
  );
}
