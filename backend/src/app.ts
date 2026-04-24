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
import { AppDataSource } from "./data-source";
import { EnvLog } from "./entity/EnvLog";

console.log("🔥 app start");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" }, });

app.use(cors());
app.use(express.json());

const port = 8000;

// サーバー起動
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

// DB接続
AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

/**
 * GET: データ取得（フロント用）
 */
app.get('/api/env-logs', async (req, res) => {
  if (!AppDataSource.isInitialized) {
    res.status(503).json({ error: "Database not ready" });
    return;
  }
  
  try {
    const limit = Number(req.query.limit) || 10;
    const repo = AppDataSource.getRepository(EnvLog);
    const logs = await repo.find({
      order: { createdAt: "DESC" },
      take: limit,
    });

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * POST: データ受信（curl用）
 */
app.post('/api/env-logs', async (req, res) => {
  const repo = AppDataSource.getRepository(EnvLog);

  const newLog = repo.create({
    ...req.body,
  });

  await repo.save(newLog);

  io.emit('env_log_update', newLog);

  res.json({ success: true });
});
