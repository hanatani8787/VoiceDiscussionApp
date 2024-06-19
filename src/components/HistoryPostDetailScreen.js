import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { styles } from '../styles/styles';
import HorizontalBarChart from '../components/HorizontalBarChart';

const userColors = {
  'ユーザーA': styles.userA,
  'ユーザーB': styles.userB,
  'ユーザーC': styles.userC,
  'ユーザーD': styles.userD,
};

const HistoryPostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [voteModalVisible, setVoteModalVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.7:3000/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  useEffect(() => {
    fetch(`http://192.168.0.7:3000/votes/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setVotes(data))
      .catch(error => console.error('Error fetching votes:', error));
  }, [postId]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

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

  const voteData = {
    labels: votes.map(vote => vote.user),
    datasets: [
      {
        data: votes.map(vote => vote.count),
      },
    ],
  };

  const showVoteResults = () => {
    setVoteModalVisible(true);
  };

  const closeVoteModal = () => {
    setVoteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        scrollEventThrottle={16}
      >
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
      <TouchableOpacity style={styles.fixedButton} onPress={showVoteResults}>
        <Text style={styles.buttonText}>投稿結果</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={voteModalVisible}
        onRequestClose={closeVoteModal}
      >
        <View style={fullScreenModalStyles.modalContainer}>
          <View style={fullScreenModalStyles.modalView}>
            <Text style={fullScreenModalStyles.modalTitle}>投票結果</Text>
            <HorizontalBarChart
              data={voteData}
              width={350}
              height={300}
            />
            <TouchableOpacity
              style={fullScreenModalStyles.closeButton}
              onPress={closeVoteModal}
            >
              <Text style={fullScreenModalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const fullScreenModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 黒系の背景色を透過
  },
  modalView: {
    width: '90%', // モーダルの幅を少し広げる
    height: '80%', // モーダルの高さを調整
    backgroundColor: '#f1f2f6',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f3542',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    width: '80%',
  },
  buttonText: {
    color: '#2f3542',
    fontSize: 18,
  },
});

export default HistoryPostDetailScreen;
