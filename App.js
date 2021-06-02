import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { Context } from './src/context';
import store from './src/store';

import routes from './src/routes';

import LoginScreen from './src/containers/Login';
import HomeScreen from './src/containers/Home';
import AddTaskScreen from './src/containers/AddTask';
import SettingScreen from './src/containers/Setting';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routes.LOGIN_SCREEN}
        headerMode="none"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={routes.ADD_TASK_SCREEN} component={AddTaskScreen} />
        <Stack.Screen name={routes.SETTING_SCREEN} component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Context.Provider value={store}>
      <AppNavigator />
    </Context.Provider>
  );
};

export default App;
