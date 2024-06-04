import Voice from '@react-native-voice/voice';

let isRecognizing = false;

const initVoiceRecognition = () => {
  console.log('Voice recognition initialized');
  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechError = onSpeechError;
  Voice.onSpeechResults = onSpeechResults;
};

const startRecognizing = async () => {
  if (isRecognizing) {
    console.warn('Speech recognition already started!');
    return;
  }
  try {
    console.log('Starting voice recognition');
    isRecognizing = true;
    await Voice.start('ja-JP');
    console.log('Voice recognition started');
  } catch (e) {
    isRecognizing = false;
    console.error('Error starting voice recognition:', e);
  }
};

const stopRecognizing = async () => {
  if (!isRecognizing) {
    console.warn('Voice recognition not started, no need to stop');
    return;
  }
  try {
    console.log('Stopping voice recognition');
    await Voice.stop();
    isRecognizing = false;
    console.log('Voice recognition stopped');
  } catch (e) {
    console.error('Error stopping voice recognition:', e);
  }
};

const onSpeechStart = (e) => {
  console.log('onSpeechStart:', e);
};

const onSpeechEnd = async (e) => {
  console.log('onSpeechEnd:', e);
  isRecognizing = false;
  try {
    console.log('Restarting voice recognition');
    await startRecognizing(); // Automatically restart recognition
  } catch (error) {
    console.error('Error restarting voice recognition:', error);
  }
};

const onSpeechError = (e) => {
  console.error('onSpeechError:', e);
  isRecognizing = false;
};

const onSpeechResults = (e) => {
  console.log('onSpeechResults:', e);
};

export { initVoiceRecognition, startRecognizing, stopRecognizing, onSpeechResults, onSpeechError };
