import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TvScreen from '../screens/TvScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from '../screens/MoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Movies' component={MoviesScreen} />
        <Tab.Screen name='Details' component={DetailsScreen} />

        <Tab.Screen name='Search' component={SearchScreen} />
        <Tab.Screen name='Tv' component={TvScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
