import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import { getMovesForGame } from '../api/moves';

export default function FinalScores({ route, navigation }) {
  const gameId = route.params.gameId;
  const players = route.params.players;
  const reducer = route.params.reducer;

  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    getMovesForGame(setScores, gameId);
  }, []);

  return (
    <View style={styles.container}>
      {players.map((player) => {
        const currentScore = scores.length
          ? scores
              .filter((score) => score.player_id === player.id)
              .reduce(reducer, 0)
          : 0;
        return (
          <Text style={text.mainText} key={player.id}>
            {player.name}
          </Text>
        );
      })}
      <Text></Text>
    </View>
  );
}
