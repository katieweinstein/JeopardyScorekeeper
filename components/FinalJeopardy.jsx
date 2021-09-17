import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles, buttons, text } from './styles';
import { addMoveToDB, getMovesForGame } from '../api/moves';

export default function FinalJeopardy({ route, navigation }) {
  const gameId = route.params.gameId;
  const players = route.params.players;
  const reducer = (currentScore, move) => currentScore + move.score;

  const [input, setInput] = React.useState(players);
  const [scores, setScores] = React.useState([]);
  const [submissionCount, setSubmissionCount] = React.useState(0);

  function handleChange(index, value) {
    setInput([...input, (input[index].wager = value)]);
  }

  function handleSubmit(index, playerId, multiplier) {
    addMoveToDB(playerId, gameId, input[index].wager * multiplier);
    setInput([...input, (input[index].submitted = true)]);
    setSubmissionCount(submissionCount + 1);
  }

  React.useEffect(() => {
    getMovesForGame(setScores, gameId);
  }, []);

  React.useEffect(() => {
    submissionCount === players.length
      ? navigation.navigate('FinalScores', {
          players: players,
          gameId: gameId,
          reducer: reducer,
        })
      : null;
  }, [submissionCount]);

  const wagerInput = (player, index) => {
    const currentScore = scores.length
      ? scores
          .filter((score) => score.player_id === player.id)
          .reduce(reducer, 0)
      : 0;
    return (
      <View style={{ marginBottom: 30 }} key={index}>
        <Text style={[text.scoreHistory, { textAlign: 'center' }]}>
          {player.name}
        </Text>
        <Text style={text.score}>Score: {currentScore}</Text>
        <View style={styles.buttonRowContainer}>
          <TextInput
            style={[
              styles.marginedInput,
              { display: input[index].submitted ? 'none' : 'flex' },
            ]}
            onChangeText={(value) => handleChange(index, value)}
            value={input[index].wager}
            maxLength={6}
            keyboardType="number-pad"
            placeholder="Add wager..."
          />
        </View>
        <View
          style={[
            styles.buttonRowContainer,
            { display: input[index].submitted ? 'none' : 'flex' },
          ]}
        >
          <Pressable
            style={[
              buttons.wager,
              input[index].wager <= currentScore && input[index].wager !== ''
                ? { backgroundColor: 'red' }
                : { backgroundColor: 'grey' },
            ]}
            onPress={() => handleSubmit(index, player.id, -1)}
          >
            <Text style={text.smallCentered}>Incorrect</Text>
          </Pressable>
          <Pressable
            style={[
              buttons.wager,
              input[index].wager <= currentScore && input[index].wager !== ''
                ? { backgroundColor: 'green' }
                : { backgroundColor: 'grey' },
            ]}
            onPress={() => handleSubmit(index, player.id, 1)}
          >
            <Text style={text.smallCentered}>Correct</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.buttonRowContainer,
            { display: input[index].submitted ? 'flex' : 'none' },
          ]}
        >
          <Text style={text.mainText}>Submitted!</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#425896' }}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text style={text.finalJeopardyTitle}>Final Jeopardy</Text>
      {players.map((player, index) => wagerInput(player, index))}
    </KeyboardAwareScrollView>
  );
}
