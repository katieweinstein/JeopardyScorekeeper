import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import { currentGameId } from '../api/games';
import { getMovesForGame } from '../api/moves';

export default function CurrentGameHistory({ players }) {
  const [state, setState] = React.useState();

  React.useEffect(() => {
    getMovesForGame(setState, currentGameId);
    console.log(state);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={text.mainText}>This is the scoreboard.</Text>
    </View>
  );
}
