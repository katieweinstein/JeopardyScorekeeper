import React from 'react';
import { Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import { styles, buttons, text } from './styles';
import { addMoveToDB, getScoreForPlayer } from '../api/moves';

export default function FinalJeopardy({ route }) {
  const gameId = route.params.gameId;
  const players = route.params.players;

  console.log('STARTNG OVER');

  const [input, setInput] = React.useState({
    player1: { id: 0, wager: '', score: 0 },
    player2: { id: 0, wager: '', score: 0 },
    player3: { id: 0, wager: '', score: 0 },
    player4: { id: 0, wager: '', score: 0 },
    player5: { id: 0, wager: '', score: 0 },
    player6: { id: 0, wager: '', score: 0 },
  });

  function handleChange(stateLabel, value) {
    setInput({
      ...input,
      [stateLabel]: { ...input[stateLabel], wager: value },
    });
  }

  React.useEffect(() => {
    players.map((item, index) => {
      const stateLabel = 'player' + (index + 1);
      console.log(input);
      setInput({
        ...input,
        [stateLabel]: { ...input[stateLabel], id: item.id },
      });
      getPlayerScore(item.id, stateLabel);
    });
  }, []);

  async function getPlayerScore(playerId, stateLabel) {
    const score = await getScoreForPlayer(gameId, playerId);
    console.log('Score: ', score, 'State label: ', stateLabel);
    if (score.total) {
      setInput({
        ...input,
        [stateLabel]: { ...input[stateLabel], score: score.total },
      });
    }
  }

  const wagerInput = (item, index) => {
    const stateLabel = 'player' + (index + 1);
    console.log(
      'State label: ',
      stateLabel,
      'Score in component: ',
      input[stateLabel].score
    );
    return (
      <View style={{ marginBottom: 30 }} key={index}>
        <Text style={text.smallCentered}>{item.name}</Text>
        <Text style={text.score}>Score: {input[stateLabel].score}</Text>
        <Text style={text.score}>Wager: </Text>
        <View style={styles.buttonRowContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange(stateLabel, value)}
            value={input[stateLabel].wager}
            maxLength={6}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.buttonRowContainer}>
          <Pressable style={[buttons.wager, { backgroundColor: 'red' }]}>
            <Text style={text.smallCentered}>Incorrect</Text>
          </Pressable>
          <Pressable style={[buttons.wager, { backgroundColor: 'green' }]}>
            <Text style={text.smallCentered}>Correct</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#425896' }}>
      <ScrollView>
        <Text style={text.finalJeopardyTitle}>Final Jeopardy</Text>
        {players.map((item, index) => wagerInput(item, index))}
      </ScrollView>
    </View>
  );
}
