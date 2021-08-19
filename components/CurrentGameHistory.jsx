import React from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { styles, text } from './styles';
import { getMovesForGame } from '../api/moves';

export default function CurrentGameHistory({ route }) {
  const [state, setState] = React.useState([]);
  const players = route.params.players;
  const reducer = (currentScore, move) => currentScore + move.score;

  React.useEffect(() => {
    getMovesForGame(setState, route.params.gameId);
  }, []);

  // Item to be created for each element in the flat list.
  const playerScoreHistory = (item) => (
    <View style={styles.nameContainer}>
      <Text style={text.scoreHistory}>{item.score}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <View style={styles.scoresListContainer}>
        {players.map((player, index) => (
          <View key={index} style={{ marginTop: 2 }}>
            <Text style={[text.mainText, { textAlign: 'center' }]}>
              {player.name}
            </Text>
            <Text style={text.score}>
              Score:{' '}
              {state.length
                ? state
                    .filter((item) => item.player_id === player.id)
                    .reduce(reducer, 0)
                : 0}
            </Text>
            <FlatList
              style={styles.scoresList}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={state.filter((item) => item.player_id === player.id)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => playerScoreHistory(item)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
