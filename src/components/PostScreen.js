import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';

const MIN_USERS = 2;
const MAX_USERS = 4;

const PostScreen = ({ navigation }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState('');

  const handleStartDiscussion = () => {
    const participants = parseInt(numberOfParticipants, 10);
    if (participants < MIN_USERS || participants > MAX_USERS) {
      Alert.alert(`ユーザー数は${MIN_USERS}人から${MAX_USERS}人までです。`);
    } else if (isNaN(participants)) {
      Alert.alert('有効なユーザー数を入力してください。');
    } else {
      navigation.navigate('Discussion', { numberOfParticipants });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>参加人数を入力してください</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numberOfParticipants}
        onChangeText={setNumberOfParticipants}
        placeholder="例: 2"
      />
      <TouchableOpacity style={styles.button} onPress={handleStartDiscussion}>
        <Text style={styles.buttonText}>ディスカッションを開始</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostScreen;
