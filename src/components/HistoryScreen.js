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
      : `http://192.168.0.7:3000/posts/status/${filter}/${deviceId}`;
    
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  const isDateExceedingThreeDays = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - postDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 3;
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
      <Text style={styles.title}>履歴</Text>
      <View style={customStyles.buttonContainer}>
        <TouchableOpacity style={[customStyles.button, filter === 'ALL' && customStyles.activeButton]} onPress={() => setFilter('ALL')}>
          <Text style={customStyles.buttonText}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[customStyles.button, filter === 'OPEN' && customStyles.activeButton]} onPress={() => setFilter('OPEN')}>
          <Text style={customStyles.buttonText}>OPEN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[customStyles.button, filter === 'CLOSE' && customStyles.activeButton]} onPress={() => setFilter('CLOSE')}>
          <Text style={customStyles.buttonText}>CLOSE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {posts.map(post => {
          const isExpired = isDateExceedingThreeDays(post.created_at);
          const isNearExpiry = isDateExceedingTwoDays(post.created_at);

          return (
            <TouchableOpacity
              key={post.id}
              style={customStyles.postContainer}
              onPress={() => navigation.navigate('HistoryPostDetail', { postId: post.id })}
            >
              <Text style={customStyles.postTitle}>{post.title}</Text>
              <Text style={[customStyles.postDate, isNearExpiry && customStyles.nearExpiryDate]}>
                {formatDate(post.created_at)}
              </Text>
              {filter === 'ALL' && (
                <Text style={customStyles.postStatus}>
                  {isExpired ? 'CLOSE' : 'OPEN'}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
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
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#2f4f4f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
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
  nearExpiryDate: {
    color: 'red',
  },
  postStatus: {
    flex: 1,
    fontSize: 14,
    color: '#2f3542',
    textAlign: 'right',
  },
});
