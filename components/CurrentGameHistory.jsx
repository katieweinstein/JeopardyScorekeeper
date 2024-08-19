import React from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { styles, text } from './styles';
import { getMovesForGame } from '../api/moves';

export default function CurrentGameHistory({ route }) {
  const [moves, setMoves] = React.useState([]);
  const players = route.params.players;
  const gameId = route.params.gameId;
  const reducer = (currentScore, move) => currentScore + move.score;

  React.useEffect(() => {
    getMovesForGame(setMoves, gameId);
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
          <View key={index} style={styles.individualScoresListContainer}>
            <Text style={[text.smallCentered, { fontSize: 24 }]}>
              {player.name}
            </Text>
            <Text style={text.score}>
              Score:{' '}
              {moves.length
                ? moves
                  .filter((item) => item.player_id === player.id)
                  .reduce(reducer, 0)
                : 0}
            </Text>
            <FlatList
              style={styles.scoresList}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={moves.filter((item) => item.player_id === player.id)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => playerScoreHistory(item)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
