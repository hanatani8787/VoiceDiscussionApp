import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { DeviceContext } from '../../App';

const HistoryScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const deviceId = useContext(DeviceContext);

  useEffect(() => {
    console.log('Fetching posts for device ID:', deviceId); // deviceIdをログ出力
    fetch(`http://192.168.0.7:3000/posts/device/${deviceId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched posts:', data); // 取得データをログ出力
        setPosts(data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, [deviceId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>履歴</Text>
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

export default HistoryScreen;
