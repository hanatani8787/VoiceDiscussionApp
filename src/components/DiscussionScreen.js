import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';
import { styles } from '../styles/styles';
import { startRecognizing, stopRecognizing } from '../utils/speechRecognition';

const DiscussionScreen = ({ route }) => {
  const { numberOfParticipants } = route.params;
  const [users, setUsers] = useState([]);
  const [transcripts, setTranscripts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
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

    setTranscripts((prevTranscripts) => {
      const updatedTranscripts = { ...prevTranscripts };
      if (!updatedTranscripts[user]) {
        updatedTranscripts[user] = [];
      }
      updatedTranscripts[user].push(recognizedText);
      return updatedTranscripts;
    });
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
    const content = Object.entries(transcripts).map(([user, texts]) => `${user}: ${texts.join('\n')}`).join('\n\n');

    try {
      const response = await fetch('http://192.168.0.2:3000/posts', {
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
      <ScrollView>
        {users.map((user) => (
          <View key={user} style={styles.userContainer}>
            <Text style={styles.user}>{user}</Text>
            <Text style={styles.transcript}>{(transcripts[user] || []).join('\n')}</Text>
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

export default DiscussionScreen;
