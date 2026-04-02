# My Maps Sample

藤沢駅上空に赤い星形オブジェクトが回転する、Google Maps + Three.js のサンプルアプリです。

## 使い方

### 1. リポジトリをクローン
```bash
git clone https://github.com/Tatsu613/my-maps-sample.git
cd my-maps-sample
```

### 2. Google Maps APIキーを取得
[Google Cloud Console](https://console.cloud.google.com/) でAPIキーを取得してください。

### 3. .env ファイルを作成
```
VITE_GOOGLE_MAPS_API_KEY=あなたのAPIキー
```

### 4. インストールして起動
```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開くと地図が表示されます。
