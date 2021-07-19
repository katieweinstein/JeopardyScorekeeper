import React from 'react';
import Home from './components/Home';
import Scoreboard from './components/Scoreboard';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
      </Stack.Navigator>
      {/* <Home /> */}
    </NavigationContainer>
  );
}
