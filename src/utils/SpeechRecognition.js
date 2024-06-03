import Voice from '@react-native-voice/voice';

const initVoiceRecognition = () => {
  console.log('Initializing voice recognition');
  Voice.onSpeechResults = (e) => {
    console.log('onSpeechResults:', e);
    if (typeof onSpeechResults === 'function') {
      onSpeechResults(e);
    }
  };
  
  Voice.onSpeechError = (e) => {
    console.error('onSpeechError:', e);
    if (typeof onSpeechError === 'function') {
      onSpeechError(e);
    }
  };
};

const startRecognizing = async () => {
  try {
    console.log('Starting voice recognition');
    await Voice.start('ja-JP');
    console.log('Voice recognition started');
  } catch (e) {
    console.error('Error starting voice recognition:', e);
  }
};

const stopRecognizing = async () => {
  try {
    await Voice.stop();
  } catch (e) {
    console.error(e);
  }
};

export { initVoiceRecognition, startRecognizing, stopRecognizing };
