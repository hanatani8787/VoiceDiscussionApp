import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import config from '../../config'; // config.js をインポート

const HomeScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Menu')}>
      <Text style={styles.welcomeText}>Welcome to Voice Discussion App!</Text>
      <Text style={styles.instructionText}>Tap anywhere to continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3542',  // 背景色を暗めのグレーに
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f1f2f6',  // テキストの色を淡いグレーに
  },
  instructionText: {
    fontSize: 18,
    color: '#f1f2f6',  // テキストの色を淡いグレーに
  },
});

export default HomeScreen;
