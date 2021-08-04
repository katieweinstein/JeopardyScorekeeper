import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';

export default function Home({ navigation }) {
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Image
        source={require('../images/jeopardy-logo.png')}
        style={styles.logo}
      />
      <Text style={text.mainText}>Scorekeeper</Text>
      <StatusBar style="auto" />
      <Pressable
        style={buttons.newGameButton}
        onPress={() =>
          navigation.navigate('AddPlayers', { name: 'AddPlayers' })
        }
      >
        <Text style={text.mainText}>New Game</Text>
      </Pressable>
    </View>
  );
}
