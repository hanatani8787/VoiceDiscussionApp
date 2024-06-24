import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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
      .then(data => {
        const filteredPosts = data.filter(post => {
          const postDate = new Date(post.created_at);
          const now = new Date();
          const diffTime = Math.abs(now - postDate);
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return diffDays <= 3;
        });
        setPosts(filteredPosts);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const formatDate = (dateString, includeTime = false) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return includeTime ? `${year}/${month}/${day} ${hours}:${minutes}` : `${year}/${month}/${day}`;
  };

  const isDateExceedingTwoDays = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - postDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 2;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>投稿一覧</Text>
      <ScrollView style={styles.scrollView}>
        {posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={customStyles.postContainer}
            onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
          >
            <Text style={customStyles.postTitle}>{post.title}</Text>
            <Text style={[customStyles.postDate, isDateExceedingTwoDays(post.created_at) && customStyles.expiredDate]}>
              {formatDate(post.created_at, true)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PostListScreen;

const customStyles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f1f2f6',
    borderRadius: 5,
  },
  postTitle: {
    flex: 2,
    fontSize: 16,
    color: '#2f3542',
  },
  postDate: {
    flex: 1,
    fontSize: 14,
    color: '#2f3542',
    textAlign: 'center',
  },
  expiredDate: {
    color: 'red',
  },
});
