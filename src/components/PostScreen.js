import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const PostScreen = ({ navigation }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState('');

  return (
    <View style={styles.container}>
      <Text>参加人数を入力してください</Text>
      <TextInput
        style={styles.input}
        value={numberOfParticipants}
        onChangeText={setNumberOfParticipants}
        keyboardType="numeric"
      />
      <Button
        title="次へ"
        onPress={() => navigation.navigate('DiscussionScreen', { numberOfParticipants })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default PostScreen;
