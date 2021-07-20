import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { getPlayers } from '../api';

export default function PlayerList() {
  const playerList = getPlayers();
  console.log(playerList);

  return (
    // <FlatList
    //   data={DATA}
    //   renderItem={renderItem}
    //   keyExtractor={(item) => item.id}
    // />
    <Text>This is where the players will go.</Text>
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
