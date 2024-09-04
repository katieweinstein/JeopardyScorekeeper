import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addGameToDB } from '../api/games';
import { styles, buttons, text, colors } from './styles/styles';

export default function GameDetails({ route, navigation }) {
  const [episodeNumberInput, setEpisodeNumberInput] = React.useState('');
  const [nicknameInput, setNicknameInput] = React.useState('');

  async function addGame() {
    const data = await addGameToDB(
      route.params.playersInGame,
      episodeNumberInput,
      nicknameInput
    );
    return data.gameId;
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { justifyContent: 'center' }]}
    >
      <Text style={text.buttonText}>Episode Number (optional):</Text>
      <TextInput
        style={styles.marginedInput}
        onChangeText={setEpisodeNumberInput}
        value={episodeNumberInput}
        maxLength={4}
        keyboardType="number-pad"
      />
      <Text style={text.buttonText}>Game Nickname (optional):</Text>
      <TextInput
        style={styles.marginedInput}
        onChangeText={setNicknameInput}
        value={nicknameInput}
        autoCapitalize="words"
        maxLength={30}
      />
      <Pressable
        onPress={async () => {
          const id = await addGame();
          navigation.navigate('Scoreboard', {
            playersInGame: route.params.playersInGame,
            gameId: id,
          });
        }}
        style={buttons.nextButton}
      >
        <Text style={text.buttonText}>Start Game</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}
