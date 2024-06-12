import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';
import { BarChart } from 'react-native-chart-kit';

const userColors = {
  'ユーザーA': styles.userA,
  'ユーザーB': styles.userB,
  'ユーザーC': styles.userC,
  'ユーザーD': styles.userD,
};

const PostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [votes, setVotes] = useState([]);
  const [voteModalVisible, setVoteModalVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.2:3000/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        const users = parseContent(data.content).map(transcript => transcript.user);
        setActiveUsers([...new Set(users)]); // 重複を排除してユーザーを設定
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  useEffect(() => {
    fetch(`http://192.168.0.2:3000/votes/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setVotes(data))
      .catch(error => console.error('Error fetching votes:', error));
  }, [postId]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      setModalVisible(true);
    }
  };

  const parseContent = (content) => {
    return content.split('\n').map(line => {
      const separatorIndex = line.indexOf(': ');
      return {
        user: line.substring(0, separatorIndex),
        text: line.substring(separatorIndex + 2)
      };
    });
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setModalVisible(false);
    Alert.alert('Selected User', `You selected: ${user}`);
  
    // 投票を保存する
    fetch('http://192.168.0.2:3000/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id: postId, user }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Vote saved:', data);
    })
    .catch(error => {
      console.error('Error saving vote:', error);
    });
  };  
  
  const showVoteResults = () => {
    setVoteModalVisible(true);
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const parsedContent = parseContent(post.content);

  const voteData = {
    labels: votes.map(vote => vote.user),
    datasets: [
      {
        data: votes.map(vote => vote.count),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',  // 背景色を白に設定
    backgroundGradientTo: '#e0e0e0',    // 背景色のグラデーションを明るい灰色に設定
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 棒グラフの色を黒に設定
    barPercentage: 0.5,
    labelColor: () => '#000', // ラベルの色を黒に設定
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onScroll={handleScroll}
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
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>
              あなたが閲覧したディスカッションの勝者は誰だと思いますか？以下から選択してください。
            </Text>
            {activeUsers.map((user) => (
              <TouchableOpacity
                key={user}
                style={modalStyles.userBox}
                onPress={() => handleUserSelection(user)}
              >
                <Text style={modalStyles.userText}>{user}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={voteModalVisible}
        onRequestClose={() => setVoteModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>投票結果</Text>
            <BarChart
              style={{ marginVertical: 8 }}
              data={voteData}
              width={300}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setVoteModalVisible(false)}
            >
              <Text style={modalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#f1f2f6', // モーダルの背景色を明るく
    borderRadius: 20,
    padding: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f3542', // タイトルの文字色をダークに
    textAlign: 'center',
  },
  userBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ff4757',
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f2f6',
  },
  closeButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#2f3542', // ボタンの文字色をダークに
    fontSize: 18,
  },
});

export default PostDetailScreen;
