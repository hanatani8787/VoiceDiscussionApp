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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  chatContainer: {
    flex: 1,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    backgroundColor: '#e1ffc7',
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
  userA: {
    backgroundColor: '#e1ffc7',
  },
  userB: {
    backgroundColor: '#d1eaff',
  },
  userC: {
    backgroundColor: '#ffe1e1',
  },
  userD: {
    backgroundColor: '#e1e1ff',
  },
});
