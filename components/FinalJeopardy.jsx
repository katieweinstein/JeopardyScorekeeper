import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles, buttons, text } from './styles';
import { addMoveToDB, getMovesForGame } from '../api/moves';

export default function FinalJeopardy({ route }) {
  const gameId = route.params.gameId;
  const players = route.params.players;
  const reducer = (currentScore, move) => currentScore + move.score;

  const [input, setInput] = React.useState({
    player1: { id: 0, wager: '' },
    player2: { id: 0, wager: '' },
    player3: { id: 0, wager: '' },
    player4: { id: 0, wager: '' },
    player5: { id: 0, wager: '' },
    player6: { id: 0, wager: '' },
  });

  const [scores, setScores] = React.useState([]);

  function handleChange(stateLabel, value) {
    setInput({
      ...input,
      [stateLabel]: { ...input[stateLabel], wager: value },
    });
  }

  React.useEffect(() => {
    players.map((item, index) => {
      const stateLabel = 'player' + (index + 1);
      setInput({
        ...input,
        [stateLabel]: { ...input[stateLabel], id: item.id },
      });
    });
    getMovesForGame(setScores, gameId);
  }, []);

  const wagerInput = (item, index) => {
    const stateLabel = 'player' + (index + 1);
    const currentScore = scores.length
      ? scores
          .filter((player) => player.player_id === item.id)
          .reduce(reducer, 0)
      : 0;
    return (
      <View style={{ marginBottom: 30 }} key={index}>
        <Text style={[text.scoreHistory, { textAlign: 'center' }]}>
          {item.name}
        </Text>
        <Text style={text.score}>Score: {currentScore}</Text>
        <View style={styles.buttonRowContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange(stateLabel, value)}
            value={input[stateLabel].wager}
            maxLength={6}
            keyboardType="number-pad"
            placeholder="Add wager..."
          />
        </View>
        <View style={styles.buttonRowContainer}>
          <Pressable
            style={[
              buttons.wager,
              input[stateLabel].wager < currentScore
                ? { backgroundColor: 'red' }
                : { backgroundColor: 'grey' },
            ]}
          >
            <Text style={text.smallCentered}>Incorrect</Text>
          </Pressable>
          <Pressable
            style={[
              buttons.wager,
              input[stateLabel].wager < currentScore
                ? { backgroundColor: 'green' }
                : { backgroundColor: 'grey' },
            ]}
          >
            <Text style={text.smallCentered}>Correct</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#425896' }}>
      <KeyboardAwareScrollView style={{ backgroundColor: '#425896' }}>
        <Text style={text.finalJeopardyTitle}>Final Jeopardy</Text>
        {players.map((item, index) => wagerInput(item, index))}
      </KeyboardAwareScrollView>
    </View>
  );
}
