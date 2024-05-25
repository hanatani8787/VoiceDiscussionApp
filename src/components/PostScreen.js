import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const PostScreen = ({ navigation }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>参加人数を入力</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="参加人数"
        value={numberOfParticipants}
        onChangeText={setNumberOfParticipants}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Discussion', { numberOfParticipants })}
      >
        <Text style={styles.buttonText}>次へ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostScreen;
