import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import MenuScreen from '../components/MenuScreen';
import PostScreen from '../components/PostScreen';
import DiscussionScreen from '../components/DiscussionScreen';
import PostPreparationScreen from '../components/PostPreparationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#c0c0c0',
          },
          headerTintColor: '#2f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen
          name="Discussion"
          component={DiscussionScreen}
          options={({ navigation, route }) => ({
            title: 'Discussion',
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Post')}
                title="Post"
                color="#000"
              />
            ),
            headerRight: () => (
              <Button
                onPress={route.params?.handleFinishDiscussion}
                title="終了"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="PostPreparation" component={PostPreparationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
