/**
 * サーバー起動スクリプト
 * 
 * このスクリプトは、Expressを使用して基本的なHTTPサーバーを起動します。
 * JSONリクエストボディの解析ミドルウェアを設定し、指定されたポートで待ち受けます。
 * 
 * 使用技術:
 * - Express（Webフレームワーク）
 * - Node.js httpモジュール
 * 
 *  Date : 2025/04/01 - 2025/07/31
 *  Author : K.Murakami
 */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// expressアプリケーションのインスタンスを作成
const app = express();

// HTTPサーバーをexpressアプリを基に作成
const server = http.createServer(app);

// socket.io追加
const io = new Server(server, {
  cors: { origin: "*" },
});

// 受信するリクエストのボディをJSONとして自動的に解析するミドルウェアを追加
app.use(express.json());
app.use(cors());

// サーバーがリッスンするポート番号を指定
const port = 8000;

// 指定したポートでHTTPサーバーを起動し、起動成功時にメッセージを出力
server.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on port ${port}`);
});

// データ保存用（とりあえずメモリ）
type EnvLog = {
  temperatureSht: number;
  humidity: number;
  temperature_qmp: number;
  pressure: number;
  createdAt: string;
};

let logs: EnvLog[] = [];

/**
 * GET: データ取得（フロント用）
 */
app.get('/api/env-logs', (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const latest = logs.slice(-limit);
  res.json(latest);
});

/**
 * POST: データ受信（curl用）
 */
app.post('/api/env-logs', (req, res) => {
  const newLog = {
    ...req.body,
    createdAt: new Date().toISOString(), // ←重要
  };

  logs.push(newLog);

  // リアルタイム送信
  io.emit('env_log_update', newLog);

  res.json({ success: true });
});
