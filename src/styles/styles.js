import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0c0c0', // 背景色を暗めのグレーに
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2f4f4f', // タイトルの色をダークスレートグレーに
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#2f4f4f', // テキスト入力の色をダークスレートグレーに
  },
  chatContainer: {
    flex: 1,
    marginTop: 20,
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
    color: '#fff', // アイコンの文字を白に
    fontWeight: 'bold',
    fontSize: 18,
  },
  bubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  transcriptText: {
    fontSize: 16,
    color: '#2f4f4f', // 吹き出しの文字をダークスレートグレーに
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
    backgroundColor: '#b0c4de', // ライトスチールブルー
  },
  userB: {
    backgroundColor: '#ffcccb', // ライトピンク
  },
  userC: {
    backgroundColor: '#add8e6', // ライトブルー
  },
  userD: {
    backgroundColor: '#f5deb3', // ウィート
  },
});
