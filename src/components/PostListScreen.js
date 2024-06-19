import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

const PostListScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.7:3000/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>投稿一覧</Text>
      <ScrollView style={styles.scrollView}>
        {posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.postTitle}
            onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
          >
            <Text style={styles.postTitleText}>{post.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PostListScreen;
