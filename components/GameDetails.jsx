import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { addGameToDB } from '../api/games';

export default function GameDetails({ route }) {
  const [episodeNumberInput, setEpisodeNumberInput] = React.useState('');
  const [nicknameInput, setNicknameInput] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Episode Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEpisodeNumberInput}
        value={episodeNumberInput}
        maxLength={4}
        keyboardType="number-pad"
      />
      <Text style={styles.text}>Game Nickname:</Text>
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
        style={styles.startGameButton}
      >
        <Text style={styles.text}>Start Game</Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425896',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 24,
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#c7853d',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    margin: 10,
    padding: 20,
    maxHeight: 75,
  },
  input: {
    height: 50,
    width: 250,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 24,
  },
});
