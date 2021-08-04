import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { addGameToDB } from '../api/games';
import { styles, buttons, text } from './styles';

export default function GameDetails({ route }) {
  const [episodeNumberInput, setEpisodeNumberInput] = React.useState('');
  const [nicknameInput, setNicknameInput] = React.useState('');

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={text.buttonText}>Episode Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEpisodeNumberInput}
        value={episodeNumberInput}
        maxLength={4}
        keyboardType="number-pad"
      />
      <Text style={text.buttonText}>Game Nickname:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNicknameInput}
        value={nicknameInput}
        autoCapitalize="words"
        maxLength={30}
      />
      <Pressable
        onPress={() =>
          addGameToDB(
            route.params.playersInGame,
            episodeNumberInput,
            nicknameInput
          )
        }
        style={buttons.nextButton}
      >
        <Text style={text.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}
