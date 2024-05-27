
# VoiceDiscussionApp

## 概要
VoiceDiscussionAppは、音声認識機能を使用して議論を文字起こしし、議論終了後にタイトルと本文を自動生成して投稿するアプリです。

## 基本機能
1. アプリ起動後のメニュー画面（「閲覧」「投稿」「履歴」）
2. 「投稿」を押下すると参加人数の選択画面
3. 指定した参加人数分のユーザー名が仮で割り当てられる（例：「ユーザーa」「ユーザーb」）
4. 各ユーザーの声を取得し、発言者を識別
5. 音声自動認識で議論を文字起こし
6. 全議論終了後、タイトルと本文を自動生成し、投稿

## セットアップ手順

### 必要な環境
- Node.js (version 18以上)
- Xcode (iOS開発用)
- Yarn

### 手順
1. リポジトリをクローンします：
    ```sh
    git clone <リポジトリのURL>
    cd VoiceDiscussionApp
    ```

2. 依存関係をインストールします：
    ```sh
    yarn install
    cd ios
    pod install
    cd ..
    ```

3. アプリを起動します：
    ```sh
    yarn start
    ```

4. iOSシミュレータでアプリを実行します：
    ```sh
    yarn ios
    ```

## 使用ライブラリ

- `@react-native-voice/voice`: 音声認識機能を提供
- `react`: Reactライブラリ
- `react-native`: React Nativeフレームワーク

### 開発用ライブラリ
- `@babel/core`: Babelコンパイラのコア
- `@babel/preset-env`: Babelプリセット
- `@babel/runtime`: Babelランタイム
- `@react-native/babel-preset`: React Native用Babelプリセット
- `@react-native/eslint-config`: React Native用ESLint設定
- `@react-native/metro-config`: Metroバンドラ設定
- `@react-native/typescript-config`: React Native用TypeScript設定
- `@types/react`: Reactの型定義
- `@types/react-test-renderer`: React Test Rendererの型定義
- `babel-jest`: Babelを使用したJestテスト
- `eslint`: ESLintツール
- `jest`: テストフレームワーク
- `prettier`: コードフォーマッタ
- `react-test-renderer`: Reactのテストレンダラー
- `typescript`: TypeScriptコンパイラ
