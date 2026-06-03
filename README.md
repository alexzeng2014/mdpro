# MDPro - 思维导图 + Markdown 编辑器

一个基于 Markmap 的交互式思维导图与 Markdown 文档编辑器，所有功能集成在单个 HTML 文件中。

## 功能一览

### 思维导图操作

| 操作 | 途径 | 说明 |
|------|------|------|
| 选中节点 | 左键点击 | 右侧显示对应 Markdown 文档 |
| 添加子节点 | 选中节点后按 `Tab` | 在选中节点下添加子级 |
| 添加同级节点 | 选中节点后按 `Enter` | 在选中节点后添加同级 |
| 内联重命名 | 左键点击节点（或再次点击已选中的节点） | 直接在导图上编辑节点文本，`Enter` 确认 / `Esc` 取消 |
| 删除节点 | 节点 `⋮` → 删除节点 | 删除选中节点及其所有子节点 |
| 上移/下移 | 节点 `⋮` → 上移 / 下移 | 与同级节点交换位置 |
| 移动节点 | 节点 `⋮` → 移到到... ▶ | 将节点移动到另一个父节点下（自动排除自身及子树） |
| 展开/收起 | View 菜单 / 节点展开按钮 | 展开或收起所有子节点 |
| 重置视图 | View 菜单 / Reset View | 恢复初始缩放和平移 |

### Markdown 编辑器

选中左侧导图节点后，右侧面板显示对应的 Markdown 文档。

- **查看模式**：渲染后的 HTML 页面
- **编辑模式**：点击 Edit 按钮切换，支持 Markdown 语法实时编辑
- **格式化工具栏**：Bold、Italic、Strikethrough、H1/H2/H3、列表、引用、代码块

### 文件操作

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| New | Ctrl+N | 新建文档，重置为默认思维导图 |
| Open... | Ctrl+O | 打开 `.mdpro` 或 `.json` 文件 |
| Save | Ctrl+S | 保存到已打开的文件；若无则弹出另存为 |
| Save As... | Ctrl+Shift+S | 另存为新 `.mdpro` 文件 |
| Export JSON | File 菜单 | 导出纯 JSON 到下载 |
| Import JSON | File 菜单 | 从本地 JSON 文件导入 |

### 搜索

- **快捷键**：`Ctrl+F` 打开/关闭搜索栏
- **匹配高亮**：输入关键词后导图中匹配的节点自动高亮
- **结果跳转**：`Enter` / `Shift+Enter` 在匹配结果中循环跳转
- **自动滚动**：跳转时自动将节点滚动到可视区域

### 国际化

- 支持**中文**和**英文**界面
- 点击菜单栏语言按钮即时切换
- 语言偏好自动保存到 localStorage

### 暗色模式

- 点击工具栏 🌙 按钮切换亮色/暗色主题
- 所有颜色通过 CSS 变量统一管理
- 主题偏好自动保存到 localStorage

### 面板拖拽

左右面板之间的分隔条可通过鼠标拖拽自由调节宽度（20%–80%）。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [D3.js](https://d3js.org/) | 7.8.5 | 底层 SVG 渲染引擎 |
| [Markmap](https://markmap.js.org/) | 0.15.4 | 思维导图可视化 |
| [Marked](https://marked.js.org/) | 4.3.0 | Markdown → HTML 渲染 |
| [Express](https://expressjs.com/) | 4.18 | 可选的服务端数据持久化 |

## 运行方式

### 方式一：直接双击（推荐）

直接双击 `index.html` 在浏览器中打开即可。Save/Open 使用 File System Access API（Chrome/Edge）或下载/上传降级方案。

### 方式二：Node.js 服务器

```bash
npm install
npm start
```

访问 `http://localhost:3000`。服务端模式下，保存的数据会写入 `data/mindmap-data.json`，重启后可自动恢复。

## 文件格式（.mdpro）

```json
{
  "version": 1,
  "treeData": { "content": "根节点", "file": "root.md", "children": [...] },
  "contents": { "root.md": "# 内容...", "child.md": "# 子节点内容..." },
  "savedAt": "2026-06-02T12:00:00.000Z"
}
```

`.mdpro` 文件将整个思维导图树结构 + 所有 Markdown 内容保存为一个文件。

## 数据存储

- **浏览器模式**：自动保存到 localStorage（key: `mdpro-app-data`）
- **服务端模式**：Ctrl+S 写入 `data/mindmap-data.json`
- **文件模式**：Ctrl+S / Ctrl+Shift+S 保存到本地 `.mdpro` 文件

## 项目结构

```
mdpro/
├── index.html       # 主应用（单文件 HTML）
├── server.js        # Node.js 服务器（可选）
├── package.json     # 服务端依赖配置
├── data/            # 服务端数据目录（自动创建）
└── README.md        # 本文件
```
