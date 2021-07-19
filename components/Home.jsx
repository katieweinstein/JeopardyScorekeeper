import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/jeopardy-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Scorekeeper</Text>
      <StatusBar style="auto" />
      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('AddPlayers', { name: 'AddPlayers' })
        }
      >
        <Text style={styles.text}>New Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425896',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 36,
  },
  logo: {
    width: '85%',
    height: '20%',
    resizeMode: 'contain',
    marginTop: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#edb76f',
    width: 275,
    height: 60,
    borderRadius: 10,
    borderColor: '#c7853d',
    borderWidth: 3,
    margin: 50,
  },
});
