import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>メニュー</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post')}>
        <Text style={styles.buttonText}>投稿</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>閲覧</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>履歴</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;
