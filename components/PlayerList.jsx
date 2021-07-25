import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { getPlayers, players } from '../api/players';

export default function PlayerList() {
  const [playersList, setPlayersList] = React.useState(players);

  React.useEffect(() => {
    getPlayers();
    setPlayersList(players);
    console.log('Players in component: ', playersList);
  }, [players]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={playersList}
        renderItem={({ item, index, separators }) => (
          <Text key={index} style={styles.text}>
            {item}
          </Text>
        )}
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
