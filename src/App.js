import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';

import DetailsPage from './pages/Details/detailsPage';
import HomePage from './pages/Home/homePage';
import {GlobalDependencyInjectionProvider} from './services/dependencyInjection';

const Stack = createStackNavigator();

/**
 * Entry point when the app initialises
 */
const App = () => {
  return (
    <GlobalDependencyInjectionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Details" component={DetailsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalDependencyInjectionProvider>
  );
};

export default App;
