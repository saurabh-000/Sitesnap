/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { InitialScreens } from './src/Navigations/StackNavigation';
function App() {
  return (
    <NavigationContainer>
      <InitialScreens/>
    </NavigationContainer>
  );
}



export default App;
