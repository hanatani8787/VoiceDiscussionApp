import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info'; // 追加
import { styles } from '../styles/styles';

const userColors = {
  'ユーザーA': styles.userA,
  'ユーザーB': styles.userB,
  'ユーザーC': styles.userC,
  'ユーザーD': styles.userD,
};

const PostPreparationScreen = ({ route, navigation }) => {
  const { transcripts } = route.params;
  const [title, setTitle] = useState('');

  const handlePost = async () => {
    const content = transcripts.map((t) => `${t.user}: ${t.text}`).join('\n');

    try {
      const deviceId = await DeviceInfo.getUniqueId(); // 端末IDを取得
      console.log('Device ID:', deviceId); // 端末IDをログ出力

      const response = await fetch('http://192.168.0.7:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, device_id: deviceId }), // device_idを含める
      });
      if (response.ok) {
        console.log('投稿が完了しました');
        navigation.navigate('Menu'); // 投稿後にメニュー画面に戻る
      } else {
        console.error('投稿に失敗しました:', response.status, response.statusText);
      }
    } catch (e) {
      console.error('ネットワークリクエストに失敗しました:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>投稿準備</Text>
      <TextInput
        style={styles.input}
        placeholder="タイトルを入力してください"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
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
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>投稿</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostPreparationScreen;
