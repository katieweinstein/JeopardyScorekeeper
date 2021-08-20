import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { styles, buttons, text } from './styles';

export default function FinalJeopardy({ route }) {
  const [input, setInput] = React.useState({
    player1: { id: 0, wager: 0 },
    player2: { id: 0, wager: 0 },
    player3: { id: 0, wager: 0 },
    player4: { id: 0, wager: 0 },
    player5: { id: 0, wager: 0 },
    player6: { id: 0, wager: 0 },
  });

  function handleChange(stateLabel, value) {
    setInput({ ...input, [stateLabel]: { wager: value } });
  }

  const wagerInput = (item, index) => {
    const stateLabel = 'player' + (index + 1);
    input[stateLabel].id = item.id;
    console.log(input);
    return (
      <View>
        <Text style={text.smallCentered}>{item.name}</Text>
        <Text style={text.score}>Wager:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange(stateLabel, value)}
          value={input[stateLabel].wager}
          maxLength={6}
          keyboardType="number-pad"
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={text.mainText}>Final Jeopardy</Text>
      {route.params.players.map((item, index) => wagerInput(item, index))}
    </View>
  );
}
