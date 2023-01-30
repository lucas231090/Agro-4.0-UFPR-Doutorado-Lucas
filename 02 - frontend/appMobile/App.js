//yarn start
import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/hooks';

import Routes from './src/routes';

const App = () => (

  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#4169E1" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
 
);

export default App;

//#7d40e7