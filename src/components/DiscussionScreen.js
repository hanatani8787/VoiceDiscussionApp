import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

const DiscussionScreen = ({ route }) => {
  const { numberOfParticipants } = route.params;
  const [users, setUsers] = useState([]);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const tempUsers = [];
    for (let i = 0; i < parseInt(numberOfParticipants, 10); i++) {
      tempUsers.push(`ユーザー${String.fromCharCode(97 + i)}`);
    }
    setUsers(tempUsers);

    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [numberOfParticipants]);

  const onSpeechResults = (e) => {
    setTranscript(e.value[0]);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('ja-JP');
    } catch (e) {
      console.error(e);
    }
  };

  const handleFinishDiscussion = async () => {
    const title = 'ディスカッションの結果';
    const content = transcript;

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        console.log('投稿が完了しました');
      } else {
        console.error('投稿に失敗しました');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ディスカッション</Text>
      {users.map((user, index) => (
        <Text key={index} style={styles.user}>{user}</Text>
      ))}
      <Button title="音声認識開始" onPress={startRecognizing} />
      <Text style={styles.transcript}>{transcript}</Text>
      <Button title="終了" onPress={handleFinishDiscussion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  user: {
    fontSize: 18,
    marginBottom: 10,
  },
  transcript: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default DiscussionScreen;
