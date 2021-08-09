import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import { currentGameId, getCurrentGameInfo } from '../api/games';
import { addMoveToDB } from '../api/moves';
import Scoring from './Scoring';

export default function Scoreboard({ route, navigation }) {
  const [gameInfo, setGameInfo] = React.useState({
    gameId: -1,
    players: [],
  });
  const [moveInfo, setMoveInfo] = React.useState({
    player: '',
    score: 1,
  });
  const [scores, setScores] = React.useState([200, 400, 600, 800, 1000]);
  const [double, setDouble] = React.useState(false);

  React.useEffect(() => {
    setGameInfo({
      gameId: currentGameId,
      players: route.params.playersInGame,
    });
  }, []);

  return (
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <View style={[styles.scoreboardButtonContainer, { marginTop: 15 }]}>
        {gameInfo.players.length ? (
          gameInfo.players.map((item) => (
            <Pressable
              key={item.id}
              style={[
                buttons.playerButton,
                moveInfo.player === item
                  ? { borderColor: 'white' }
                  : { borderColor: '#9E99DE' },
              ]}
              onPress={() => setMoveInfo({ ...moveInfo, player: item })}
            >
              <Text style={text.buttonText}>{item.name}</Text>
            </Pressable>
          ))
        ) : (
          <Text styles={text.smallCentered}>Loading...</Text>
        )}
      </View>
      <Scoring
        scores={scores}
        setScores={setScores}
        double={double}
        setDouble={setDouble}
        moveInfo={moveInfo}
        setMoveInfo={setMoveInfo}
        gameInfo={gameInfo}
        setGameInfo={setGameInfo}
      />
      <Pressable
        style={buttons.submitScore}
        onPress={() =>
          addMoveToDB(moveInfo.player.id, gameInfo.gameId, moveInfo.score)
        }
      >
        <Text style={text.buttonText}>Submit</Text>
      </Pressable>
      <View style={styles.buttonRowContainer}>
        <Pressable
          style={buttons.currentGameHistory}
          onPress={() =>
            navigation.navigate('CurrentGameHistory', {
              players: gameInfo.players,
            })
          }
        >
          <Text style={text.smallCentered}>Scores</Text>
        </Pressable>
        <Pressable style={buttons.finalJeopardy}>
          <Text style={text.smallCentered}>Final Jeopardy</Text>
        </Pressable>
      </View>
    </View>
  );
}
