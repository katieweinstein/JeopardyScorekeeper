import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { getPlayers } from '../api/players';

export default function PlayerList({ playersList, setPlayersList }) {
  React.useEffect(() => {
    getPlayers(setPlayersList);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={playersList}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => <Text style={styles.text}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: 36,
  },
  flatList: {
    backgroundColor: '#231d5b',
    margin: 50,
    padding: 10,
    flexGrow: 0,
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#edc8a2',
    borderRadius: 20,
  },
});
