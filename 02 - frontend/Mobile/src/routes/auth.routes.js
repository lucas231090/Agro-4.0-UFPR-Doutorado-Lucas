import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

const Auth = createStackNavigator();

const AuthRoutes= () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Cadastro" component={Cadastro} />
  </Auth.Navigator>
);

export default AuthRoutes;