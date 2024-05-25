import Voice from '@react-native-voice/voice';

const startRecognizing = async () => {
  try {
    await Voice.start('ja-JP');
  } catch (e) {
    console.error(e);
  }
};

const stopRecognizing = async () => {
  try {
    await Voice.stop();
  } catch (e) {
    console.error(e);
  }
};

export { startRecognizing, stopRecognizing };
