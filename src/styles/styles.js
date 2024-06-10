import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3542',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#f1f2f6',
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#f1f2f6',
  },
  labelText: {
    fontSize: 18,
    color: '#f1f2f6',
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 60, // ボタンの領域を確保するために余白を追加
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bubble: {
    padding: 15,
    borderRadius: 20,
    maxWidth: '70%',
    marginRight: 10, // アイコンの余白とバランスをとる
  },
  transcriptText: {
    fontSize: 16,
    color: '#f1f2f6',
  },
  button: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#f1f2f6',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  userA: {
    backgroundColor: '#70a1ff',
  },
  userB: {
    backgroundColor: '#ff6348',
  },
  userC: {
    backgroundColor: '#ffa502',
  },
  userD: {
    backgroundColor: '#2ed573',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2f3542', // 背景色を暗めのグレーに
    paddingHorizontal: 20,
  },
  menuButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  fixedButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  postTitle: {
    padding: 15,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  postTitleText: {
    fontSize: 20,
    color: '#f1f2f6',
  },
});
