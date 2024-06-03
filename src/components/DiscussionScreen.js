import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import { styles } from '../styles/styles';
import { startRecognizing, stopRecognizing } from '../utils/speechRecognition';

const MAX_USERS = 4; // 最大ユーザー数を定義
const MIN_USERS = 2; // 最小ユーザー数を定義

const userColors = {
  'ユーザーA': styles.userA,
  'ユーザーB': styles.userB,
  'ユーザーC': styles.userC,
  'ユーザーD': styles.userD,
};

const DiscussionScreen = ({ route }) => {
  const { numberOfParticipants } = route.params;
  const [users, setUsers] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (numberOfParticipants > MAX_USERS || numberOfParticipants < MIN_USERS) {
      Alert.alert(`ユーザー数は${MIN_USERS}人から${MAX_USERS}人までです。`);
      return;
    }

    const tempUsers = [];
    for (let i = 0; i < parseInt(numberOfParticipants, 10); i++) {
      tempUsers.push(`ユーザー${String.fromCharCode(65 + i)}`); // 65 is the ASCII code for 'A'
    }
    setUsers(tempUsers);

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [numberOfParticipants]);

  const onSpeechResults = (e) => {
    const recognizedText = e.value[0];
    const userIndex = Math.floor(Math.random() * numberOfParticipants);
    const user = `ユーザー${String.fromCharCode(65 + userIndex)}`;

    setTranscripts((prevTranscripts) => [
      ...prevTranscripts,
      { user, text: recognizedText }
    ]);
  };

  const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
  };

  const handleStartRecognizing = async () => {
    setError('');
    try {
      await startRecognizing();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleFinishDiscussion = async () => {
    const title = 'ディスカッションの結果';
    const content = transcripts.map(t => `${t.text}`).join('\n');

    try {
      const response = await fetch('http://あなたのローカルIPアドレス:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        console.log('投稿が完了しました');
      } else {
        console.error('投稿に失敗しました:', response.status, response.statusText);
      }
    } catch (e) {
      console.error('ネットワークリクエストに失敗しました:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ディスカッション</Text>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>ユーザー情報を表示</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>ユーザー情報</Text>
            {users.map((user, index) => (
              <View key={index} style={[modalStyles.userBox, userColors[user]]}>
                <Text style={modalStyles.userText}>{user}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.buttonText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.chatContainer}>
        {transcripts.map((transcript, index) => (
          <View key={index} style={styles.chatRow}>
            <View style={[styles.icon, userColors[transcript.user]]}>
              <Text style={styles.iconText}>{transcript.user.charAt(3)}</Text>
            </View>
            <View style={[styles.bubble, userColors[transcript.user]]}>
              <Text style={styles.transcriptText}>{transcript.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleStartRecognizing}>
        <Text style={styles.buttonText}>音声認識開始</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFinishDiscussion}>
        <Text style={styles.buttonText}>終了</Text>
      </TouchableOpacity>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
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
    marginBottom: 15,
  },
  userBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DiscussionScreen;
