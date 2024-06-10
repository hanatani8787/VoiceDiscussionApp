import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

const userColors = {
  'ユーザーA': styles.userA,
  'ユーザーB': styles.userB,
  'ユーザーC': styles.userC,
  'ユーザーD': styles.userD,
};

const PostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.0.2:3000/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  // Parse the content to extract user and text
  const parseContent = (content) => {
    return content.split('\n').map(line => {
      const separatorIndex = line.indexOf(': ');
      return {
        user: line.substring(0, separatorIndex),
        text: line.substring(separatorIndex + 2)
      };
    });
  };

  const parsedContent = parseContent(post.content);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <ScrollView style={styles.chatContainer}>
        {parsedContent.map((transcript, index) => (
          <View key={index} style={styles.chatRow}>
            <View style={[styles.icon, userColors[transcript.user]]}>
              <Text style={styles.iconText}>{transcript.user.charAt(transcript.user.length - 1)}</Text>
            </View>
            <View style={[styles.bubble, userColors[transcript.user]]}>
              <Text style={styles.transcriptText}>{transcript.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PostDetailScreen;
