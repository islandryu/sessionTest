import React from 'react';
import logo from './logo.svg';

function App() {
  const onPressSetSessionButton = () => {
    fetch('http://localhost:5000/set-session', {
      method: 'POST',  // サーバーサイドで指定されているHTTPメソッド
      credentials: 'include',  // クッキーを送信するための設定
    })
    .then(response => response.json())  // この行はサーバーがJSONレスポンスを返す場合に有用です
    .then(data => console.log(data))
    .catch((err) => {
      console.log(err)
    });
  }

  const onPressVerifySessionButton = () => {
    fetch('http://localhost:5000/verify-session', {
      method: 'GET',
      credentials: 'include',  // クッキーを送信するための設定
    })
    .then(response => response.json())  // この行はサーバーがJSONレスポンスを返す場合に有用です
    .then(data => console.log(data))
    .catch((err) => {
      console.log(err)
    });
  }

  return (
    <div className="App">
      {/* set-sessionボタン */}
      <button onClick={onPressSetSessionButton}>set-session</button>
      {/* verify-sessionボタン */}
      <button onClick={onPressVerifySessionButton}>verify-session</button>
    </div>
  );
}

export default App;
