const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'mindmap-data.json');

/* 确保 data 目录存在 */
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

/* GET /api/data — 加载思维导图数据 */
app.get('/api/data', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json(null);
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* POST /api/data — 保存思维导图数据 */
app.post('/api/data', (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.treeData) {
      return res.status(400).json({ error: 'Invalid data: missing treeData' });
    }
    payload.savedAt = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    res.json({ status: 'ok', savedAt: payload.savedAt });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* GET /api/export — 导出思维导图数据为下载文件 */
app.get('/api/export', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.status(404).json({ error: 'No data to export' });
  }
  res.download(DATA_FILE, 'mindmap-export.json');
});

app.listen(PORT, () => {
  console.log('思维导图服务器已启动');
  console.log('  http://localhost:' + PORT);
});
