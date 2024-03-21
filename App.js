/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { InitialScreens } from './src/Navigations/StackNavigation';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
function App() {
  const [isStarted,setIsStarted]=useState(false)
    useEffect(()=>{
      console.log("hello")
      // if(!isStarted){
      //   connectToRemoteDebugger()
      //   setIsStarted(true)
      // }
    },[])
  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };
  return (
    <NavigationContainer>
      <InitialScreens/>
    </NavigationContainer>
  );
}



export default App;
