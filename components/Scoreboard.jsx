import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles';
import { addMoveToDB } from '../api/moves';
import Scoring from './Scoring';

const baseScores = [200, 400, 600, 800, 1000];

export default function Scoreboard({ route, navigation }) {
  const [gameInfo, setGameInfo] = React.useState({
    gameId: route.params.gameId,
    players: route.params.playersInGame,
  });
  const [moveInfo, setMoveInfo] = React.useState({
    player: '',
    score: 0,
  });
  const [scores, setScores] = React.useState(baseScores);
  const [double, setDouble] = React.useState(false);

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
              onPress={() => {
                setMoveInfo({ ...moveInfo, player: item });
              }}
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
        style={[
          buttons.submitScore,
          typeof moveInfo.player === 'string' || moveInfo.score === 0
            ? { backgroundColor: 'grey', borderColor: 'grey' }
            : { backgroundColor: '#C7853D' },
        ]}
        onPress={() => {
          addMoveToDB(moveInfo.player.id, gameInfo.gameId, moveInfo.score);
          setMoveInfo({
            player: '',
            score: 0,
          });
          setScores(baseScores);
        }}
      >
        <Text
          style={text.buttonText}
          disabled={typeof moveInfo.player === 'string' || moveInfo.score === 0}
        >
          Submit
        </Text>
      </Pressable>
      <View style={styles.buttonRowContainer}>
        <Pressable
          style={buttons.currentGameHistory}
          onPress={() =>
            navigation.navigate('CurrentGameHistory', {
              players: gameInfo.players,
              gameId: gameInfo.gameId,
            })
          }
        >
          <Text style={text.smallCentered}>Scores</Text>
        </Pressable>
        <Pressable
          style={buttons.finalJeopardy}
          onPress={() =>
            navigation.navigate('FinalJeopardy', {
              players: gameInfo.players,
              gameId: gameInfo.gameId,
            })
          }
        >
          <Text style={text.smallCentered}>Final Jeopardy</Text>
        </Pressable>
      </View>
    </View>
  );
}
