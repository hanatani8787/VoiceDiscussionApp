import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import MenuScreen from '../components/MenuScreen';
import PostScreen from '../components/PostScreen';
import DiscussionScreen from '../components/DiscussionScreen';
import PostPreparationScreen from '../components/PostPreparationScreen';
import PostDetailScreen from '../components/PostDetailScreen';
import PostListScreen from '../components/PostListScreen'; // 新しい投稿一覧画面を追加

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
              <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Text style={{ color: '#000', marginLeft: 10 }}>Post</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="PostPreparation" component={PostPreparationScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="PostList" component={PostListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
