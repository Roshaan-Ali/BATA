import React, {useEffect} from 'react';
import MainNavigator from './src/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
            <MainNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
