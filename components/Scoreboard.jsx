import React from 'react';
import { Text, View, Image, Pressable, Alert } from 'react-native';
import { styles, buttons, text } from './styles';
import { currentGameId, getCurrentGameInfo } from '../api/games';

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
      <View style={[styles.buttonContainer, { alignItems: 'flex-start' }]}>
        {gameInfo.players.length ? (
          gameInfo.players.map((item) => (
            <Pressable key={item.id} style={buttons.playerButton}>
              <Text style={text.mainText}>{item.name}</Text>
            </Pressable>
          ))
        ) : (
          <Text styles={text.smallCentered}>Loading...</Text>
        )}
      </View>
    </View>
  );
}
