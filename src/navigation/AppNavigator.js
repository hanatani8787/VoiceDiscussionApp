import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../components/MenuScreen';
import PostScreen from '../components/PostScreen';
import DiscussionScreen from '../components/DiscussionScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ title: 'メニュー' }} />
      <Stack.Screen name="PostScreen" component={PostScreen} options={{ title: '投稿' }} />
      <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} options={{ title: 'ディスカッション' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
