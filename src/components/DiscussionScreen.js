import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import { styles } from '../styles/styles';
import { startRecognizing, stopRecognizing } from '../utils/speechRecognition';

const DiscussionScreen = ({ route }) => {
  const { numberOfParticipants } = route.params;
  const [users, setUsers] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const tempUsers = [];
    for (let i = 0; i < parseInt(numberOfParticipants, 10); i++) {
      tempUsers.push(`ユーザー${String.fromCharCode(97 + i)}`);
    }
    setUsers(tempUsers);

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [numberOfParticipants]);

  const onSpeechResults = (e) => {
    console.log('Speech results:', e.value[0]);
    const newTranscript = { user: `ユーザー${String.fromCharCode(97 + transcripts.length % numberOfParticipants)}`, text: e.value[0] };
    setTranscripts([...transcripts, newTranscript]);
  };

  const onSpeechError = (e) => {
    console.error('Speech error:', e.error);
    setError(JSON.stringify(e.error));
  };

  const handleStartRecognizing = async () => {
    console.log('Start recognizing called');
    setError('');
    setTranscripts([]);
    try {
      console.log('Trying to start voice recognition');
      await startRecognizing();
      console.log('Voice recognition started');
    } catch (e) {
      console.error('Error in startRecognizing:', e);
      setError(e.message);
    }
  };

  const handleFinishDiscussion = async () => {
    const title = 'ディスカッションの結果';
    const content = transcripts.map(transcript => `${transcript.user}: ${transcript.text}`).join('\n');

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
      {users.map((user, index) => (
        <Text key={index} style={styles.user}>{user}</Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleStartRecognizing}>
        <Text style={styles.buttonText}>音声認識開始</Text>
      </TouchableOpacity>
      {transcripts.map((transcript, index) => (
        <Text key={index} style={styles.transcript}>{transcript.user}: {transcript.text}</Text>
      ))}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleFinishDiscussion}>
        <Text style={styles.buttonText}>終了</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiscussionScreen;
