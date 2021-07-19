import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';

export default function AddPlayers() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>We will add players here.</Text>
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
});
