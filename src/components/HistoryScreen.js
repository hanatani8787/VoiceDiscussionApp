import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';
import { DeviceContext } from '../../App';

const HistoryScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const deviceId = useContext(DeviceContext);

  useEffect(() => {
    fetchPosts();
  }, [deviceId, filter]);

  const fetchPosts = () => {
    const url = filter === 'ALL' 
      ? `http://192.168.0.7:3000/posts/device/${deviceId}`
      : `http://192.168.0.7:3000/posts/device/${deviceId}/status/${filter}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>履歴</Text>
      <View style={customStyles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setFilter('OPEN')}>
          <Text style={styles.buttonText}>OPEN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setFilter('CLOSE')}>
          <Text style={styles.buttonText}>CLOSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setFilter('ALL')}>
          <Text style={styles.buttonText}>ALL</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.postTitle}
            onPress={() => navigation.navigate('HistoryPostDetail', { postId: post.id })}
          >
            <Text style={styles.postTitleText}>{post.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;

const customStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
