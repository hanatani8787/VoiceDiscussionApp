import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  userContainer: {
    marginVertical: 10,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transcriptContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  transcriptLeft: {
    backgroundColor: '#e1ffc7',
    alignSelf: 'flex-start',
  },
  transcriptRight: {
    backgroundColor: '#d1eaff',
    alignSelf: 'flex-end',
  },
  transcriptText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});
