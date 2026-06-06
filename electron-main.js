const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  /* 优先加载 dist/index.html（离线打包版本），回退到 index.html（CDN 版本） */
  const distPath = path.join(__dirname, 'dist', 'index.html');
  const srcPath = path.join(__dirname, 'index.html');
  const indexFile = fs.existsSync(distPath) ? distPath : srcPath;
  win.loadFile(indexFile);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
