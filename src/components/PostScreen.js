import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { styles } from '../styles/styles';

const PostScreen = ({ navigation }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState('');

  const handleStartDiscussion = () => {
    const participants = parseInt(numberOfParticipants, 10);
    if (participants >= 2 && participants <= 4) {
      navigation.navigate('Discussion', { numberOfParticipants: participants });
    } else {
      Alert.alert('エラー', '参加人数は2人から4人までです。');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>参加人数を入力してください</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={numberOfParticipants}
        onChangeText={setNumberOfParticipants}
      />
      <Button title="開始" onPress={handleStartDiscussion} />
    </View>
  );
};

export default PostScreen;
