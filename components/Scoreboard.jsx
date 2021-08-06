import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import { currentGameId, getCurrentGameInfo } from '../api/games';
import Scoring from './Scoring';

export default function Scoreboard({ route }) {
  const [gameInfo, setGameInfo] = React.useState({
    gameId: -1,
    players: [],
  });
  const [moveInfo, setMoveInfo] = React.useState({
    player: '',
    score: 0,
  });

  React.useEffect(() => {
    setGameInfo({
      gameId: currentGameId,
      players: route.params.playersInGame,
    });
    console.log(gameInfo);
  }, []);

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={text.mainText}>Players</Text>
      <View style={styles.scoreboardButtonContainer}>
        {gameInfo.players.length ? (
          gameInfo.players.map((item) => (
            <Pressable key={item.id} style={buttons.playerButton}>
              <Text style={text.buttonText}>{item.name}</Text>
            </Pressable>
          ))
        ) : (
          <Text styles={text.smallCentered}>Loading...</Text>
        )}
      </View>
      <Scoring />
    </View>
  );
}
