import express from 'express';
import session from 'express-session';
import cors from 'cors';

const app = express();
const port = 5000;

// CORSの設定
const corsOptions = {
  origin: 'http://localhost:3000',  // Reactアプリのオリジン。必要に応じて修正してください
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // クレデンシャルを許可
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// JSON ボディのパーサーを設定
app.use(express.json());

// セッション設定
app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false }  // 本番環境では secure を true に設定してください
  })
);
// HTTPOnly の sessionId を設定する API
app.post('/set-session', (req, res) => {
  if (req.session) {
    // 例として、ランダムな値をセッションに保存します。
    // @ts-expect-error
    req.session.userId = Math.floor(Math.random() * 1000);
    res.status(200).json({ message: 'Session set successfully' });
  } else {
    res.status(500).json({ message: 'Could not set session' });
  }
});

// sessionId を検証する API
app.get('/verify-session', (req, res) => {
    // @ts-expect-error
  if (req.session && req.session.userId) {
    // @ts-expect-error
    res.status(200).json({ message: 'Session is valid', userId: req.session.userId });
  } else {
    res.status(401).json({ message: 'Invalid session' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});