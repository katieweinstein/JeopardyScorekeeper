import React from 'react';
import { Home, AddPlayers, Scoreboard } from './components';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createGameTable, createMoveTable, createPlayerTable } from './api';

const Stack = createStackNavigator();

export default function App() {
  React.useEffect(() => {
    createPlayerTable();
    createGameTable();
    createMoveTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
        <Stack.Screen name="AddPlayers" component={AddPlayers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
