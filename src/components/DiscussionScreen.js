import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { initVoiceRecognition, startRecognizing, stopRecognizing } from '../utils/speechRecognition';
import Voice from '@react-native-voice/voice';

const MAX_USERS = 4; // 最大ユーザー数を定義
const MIN_USERS = 2; // 最小ユーザー数を定義

const userColors = {
  'ユーザーA': styles.userA,
  'ユーザーB': styles.userB,
  'ユーザーC': styles.userC,
  'ユーザーD': styles.userD,
};

const DiscussionScreen = ({ route, navigation }) => {
  const { numberOfParticipants } = route.params;
  const [users, setUsers] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [error, setError] = useState('');
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [startModalVisible, setStartModalVisible] = useState(true); // 音声認識開始モーダル
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); // 確認モーダル
  const scrollViewRef = useRef();

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

    initVoiceRecognition();

    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = handleSpeechError;

    return () => {
      stopRecognizing();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [numberOfParticipants]);

  const handleSpeechResults = (e) => {
    const recognizedText = e.value[0];
    const userIndex = Math.floor(Math.random() * numberOfParticipants);
    const user = `ユーザー${String.fromCharCode(65 + userIndex)}`;

    setTranscripts((prevTranscripts) => [
      ...prevTranscripts,
      { user, text: recognizedText }
    ]);

    // 自動スクロール
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const handleSpeechError = (e) => {
    setError(JSON.stringify(e.error));
  };

  const handleStartRecognizing = async () => {
    setError('');
    setStartModalVisible(false); // 音声認識開始モーダルを非表示にする
    try {
      await startRecognizing();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleFinishDiscussion = async () => {
    setConfirmModalVisible(true);
  };

  const confirmFinishDiscussion = async () => {
    setConfirmModalVisible(false);
    navigation.navigate('PostPreparation', { transcripts }); // 投稿準備画面に遷移
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={startModalVisible}
        onRequestClose={() => setStartModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>音声認識開始</Text>
            <TouchableOpacity
              style={modalStyles.startButton}
              onPress={handleStartRecognizing}
            >
              <Text style={modalStyles.buttonText}>開始</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
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
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setUserInfoModalVisible(true)}
        >
          <Text style={styles.buttonText}>ユーザー情報</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={handleFinishDiscussion}
        >
          <Text style={styles.buttonText}>終了</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={userInfoModalVisible}
        onRequestClose={() => setUserInfoModalVisible(false)}
      >
        <TouchableOpacity style={modalStyles.modalOverlay} onPress={() => setUserInfoModalVisible(false)}>
          <TouchableOpacity style={modalStyles.modalView} activeOpacity={1}>
            <Text style={modalStyles.modalTitle}>ユーザー情報</Text>
            {users.map((user, index) => (
              <View key={index} style={[modalStyles.userBox, userColors[user]]}>
                <Text style={modalStyles.userText}>{user}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setUserInfoModalVisible(false)}
            >
              <Text style={modalStyles.buttonText}>閉じる</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>ディスカッションを終了します。本当にいいですか？</Text>
            <View style={modalStyles.confirmButtonContainer}>
              <TouchableOpacity
                style={modalStyles.confirmButton}
                onPress={confirmFinishDiscussion}
              >
                <Text style={modalStyles.buttonText}>はい</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.confirmButton}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={modalStyles.buttonText}>いいえ</Text>
              </TouchableOpacity>
            </View>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f3542', // タイトルの文字色をダークに
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  buttonText: {
    color: '#2f3542', // ボタンの文字色をダークに
    fontSize: 18,
  },
  userBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f3542', // ユーザー情報の文字色をダークに
  },
});

export default DiscussionScreen;
