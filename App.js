// App.js
import React, { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import AppNavigator from './src/navigation/AppNavigator';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, Alert } from 'react-native';

export const DeviceContext = React.createContext();

const App = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const getDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };

    getDeviceId();
  }, []);

  if (!deviceId) {
    return <Text>Loading...</Text>; // ローディング画面を表示
  }

  return (
    <DeviceContext.Provider value={deviceId}>
      <AppNavigator />
    </DeviceContext.Provider>
  );
};

export default App;
