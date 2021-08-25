import React from 'react';
import { Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import { styles, buttons, text } from './styles';

export default function FinalJeopardy({ route }) {
  const [input, setInput] = React.useState({
    player1: { id: 0, wager: '' },
    player2: { id: 0, wager: '' },
    player3: { id: 0, wager: '' },
    player4: { id: 0, wager: '' },
    player5: { id: 0, wager: '' },
    player6: { id: 0, wager: '' },
  });

  function handleChange(stateLabel, value) {
    setInput({ ...input, [stateLabel]: { wager: value } });
  }

  const wagerInput = (item, index) => {
    const stateLabel = 'player' + (index + 1);
    input[stateLabel].id = item.id;
    return (
      <View style={{ marginBottom: 30 }}>
        <Text style={text.smallCentered}>{item.name}</Text>
        <Text style={text.score}>Wager:</Text>
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
      <ScrollView style={{ marginTop: 85, marginBottom: 50 }}>
        <Text
          style={[text.mainText, { marginBottom: 20, textAlign: 'center' }]}
        >
          Final Jeopardy
        </Text>
        {route.params.players.map((item, index) => wagerInput(item, index))}
      </ScrollView>
    </View>
  );
}
