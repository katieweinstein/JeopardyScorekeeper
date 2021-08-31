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
    player1: { id: -1, wager: '', submitted: false },
    player2: { id: -1, wager: '', submitted: false },
    player3: { id: -1, wager: '', submitted: false },
    player4: { id: -1, wager: '', submitted: false },
    player5: { id: -1, wager: '', submitted: false },
    player6: { id: -1, wager: '', submitted: false },
  });

  const [scores, setScores] = React.useState([]);
  const [completed, setCompleted] = React.useState(false);

  function handleChange(stateLabel, value) {
    setInput({
      ...input,
      [stateLabel]: { ...input[stateLabel], wager: value },
    });
  }

  function handleSubmit(stateLabel, playerId, multiplier) {
    addMoveToDB(playerId, gameId, input[stateLabel].wager * multiplier);
    setInput({ ...input, [stateLabel]: { submitted: true } });
    checkIfCompleted();
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
    checkIfCompleted();
  }, []);

  function checkIfCompleted() {
    for (let player in input) {
      if (input[player].submitted === false && input[player].id > -1) {
        return;
      }
    }
    setCompleted(true);
  }

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
            style={[
              styles.input,
              { display: input[stateLabel].submitted ? 'none' : 'flex' },
            ]}
            onChangeText={(value) => handleChange(stateLabel, value)}
            value={input[stateLabel].wager}
            maxLength={6}
            keyboardType="number-pad"
            placeholder="Add wager..."
          />
        </View>
        <View
          style={[
            styles.buttonRowContainer,
            { display: input[stateLabel].submitted ? 'none' : 'flex' },
          ]}
        >
          <Pressable
            style={[
              buttons.wager,
              input[stateLabel].wager <= currentScore &&
              input[stateLabel].wager !== ''
                ? { backgroundColor: 'red' }
                : { backgroundColor: 'grey' },
            ]}
            onPress={() => handleSubmit(stateLabel, item.id, -1)}
          >
            <Text style={text.smallCentered}>Incorrect</Text>
          </Pressable>
          <Pressable
            style={[
              buttons.wager,
              input[stateLabel].wager <= currentScore &&
              input[stateLabel].wager !== ''
                ? { backgroundColor: 'green' }
                : { backgroundColor: 'grey' },
            ]}
            onPress={() => handleSubmit(stateLabel, item.id, 1)}
          >
            <Text style={text.smallCentered}>Correct</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.buttonRowContainer,
            { display: input[stateLabel].submitted ? 'flex' : 'none' },
          ]}
        >
          <Text style={text.mainText}>Submitted!</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ backgroundColor: '#425896' }}>
        <Text style={text.finalJeopardyTitle}>Final Jeopardy</Text>
        {players.map((item, index) => wagerInput(item, index))}
      </KeyboardAwareScrollView>
      <Pressable
        style={[
          buttons.submitScore,
          { display: completed ? 'flex' : 'none', marginBottom: 30 },
        ]}
      >
        <Text style={text.buttonText}>See Final Scores</Text>
      </Pressable>
    </View>
  );
}
