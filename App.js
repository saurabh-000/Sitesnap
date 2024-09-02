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
import { Provider } from 'react-redux'
import { store,  persistor } from './src/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {
  const [isStarted,setIsStarted]=useState(false)
    useEffect(()=>{
      // if(!isStarted){
      //   connectToRemoteDebugger()
      //   setIsStarted(true)
      // }
    },[])
  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <GestureHandlerRootView>
            <InitialScreens/>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    
  );
}



export default App;
