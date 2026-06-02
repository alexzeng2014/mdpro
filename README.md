# 思维导图查看器 (MindMap Viewer)

一个基于 Markmap 的交互式思维导图 + Markdown 文档编辑器，所有功能集成在单个 HTML 文件中。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [D3.js](https://d3js.org/) | 7.8.5 | 底层 SVG 渲染引擎 |
| [Markmap](https://markmap.js.org/) | 0.15.4 | 思维导图可视化（lib + view） |
| [Marked](https://marked.js.org/) | 4.3.0 | Markdown → HTML 渲染 |
| [Express](https://expressjs.com/) | 4.18 | 可选的文件读写 API（Node.js） |
| [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) | — | 原生文件保存/打开（Chrome/Edge） |

## 运行条件

- **现代浏览器**（Chrome 86+, Edge 86+, Firefox, Safari）。推荐 Chrome/Edge 以获得完整的文件系统 API 支持。
- **可选**：Node.js 18+（用于启动本地服务器，支持服务端数据持久化）。
- 无需任何构建工具或包管理器（使用 CDN 加载依赖）。

## 运行方式

### 方式一：直接双击（推荐）

直接双击 `index.html` 在浏览器中打开即可使用。所有功能均可正常工作，Save/Open 使用浏览器 File System Access API（Chrome/Edge）或下载/上传降级方案。

### 方式二：Node.js 服务器

```bash
npm install
npm start
```

访问 `http://localhost:3000`。服务端模式下，Save 快捷键会将数据写入 `data/mindmap-data.json`，重启后可通过服务端自动恢复。

## 功能说明

### 文件操作（File 菜单）

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| New | Ctrl+N | 新建文档，重置为默认思维导图 |
| Open... | Ctrl+O | 打开 `.mdpro` 或 `.json` 文件 |
| Save | Ctrl+S | 保存到已打开的文件；若无则弹出另存为 |
| Save As... | Ctrl+Shift+S | 另存为新 `.mdpro` 文件 |
| Export JSON | — | 导出纯 JSON 到下载 |
| Import JSON | — | 从本地 JSON 文件导入 |

### 编辑操作（Edit 菜单）

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| Add Child | Tab / Ins | 为选中节点添加子节点 |
| Add Sibling | Enter | 为选中节点添加同级节点 |
| Rename | F2 | 重命名选中节点 |
| Delete | Del | 删除选中节点（含子节点） |

### 视图操作（View 菜单）

| 操作 | 说明 |
|------|------|
| Expand All | 展开所有节点 |
| Collapse All | 收起所有节点 |
| Reset View | 重置缩放和平移到初始位置 |

### Markdown 编辑器

选中左侧导图节点后，右侧面板显示对应的 Markdown 文档。

- **查看模式**：渲染后的 HTML 页面
- **编辑模式**：点击 Edit 按钮切换，支持 Markdown 语法实时编辑
- **工具栏**：Bold、Italic、Strikethrough、H1/H2/H3、列表、引用、代码块等

### 面板拖拽

左右面板之间的分隔条可通过鼠标拖拽自由调节宽度（20%–80%）。

## 文件格式（.mdpro）

```json
{
  "version": 1,
  "treeData": { "content": "根节点", "file": "root.md", "children": [...] },
  "contents": { "root.md": "# 内容...", "child.md": "# 子节点内容..." },
  "savedAt": "2026-06-02T12:00:00.000Z"
}
```

`.mdpro` 文件将整个思维导图树结构 + 所有 Markdown 内容保存为一个文件，方便分发和备份。

## 数据存储

- **浏览器模式**：自动保存到 localStorage（key: `mdpro-app-data`）
- **服务端模式**：按 Ctrl+S 写入 `data/mindmap-data.json`
- **文件模式**：通过 Ctrl+S / Ctrl+Shift+S 保存到本地 `.mdpro` 文件

## 项目结构

```
mdpro/
├── index.html       # 主应用（单文件 HTML）
├── server.js        # Node.js 服务器（可选）
├── package.json     # 服务端依赖配置
├── data/            # 服务端数据目录（自动创建）
└── README.md        # 本文件
```

## 制作过程

1. **单文件架构**：全部代码（HTML/CSS/JS）集成在一个 `index.html` 中，无需打包工具。
2. **树状数据结构**：定义递归的 `{ content, file, children[] }` 结构，每个节点对应一个 Markdown 文件。
3. **Markmap 集成**：使用 markmap-lib 将树数据转换为 D3 层次结构，markmap-view 渲染为可交互 SVG。
4. **选中联动**：通过 `file` 字段建立节点 ↔ 文档的映射关系，点击节点时加载对应 Markdown 内容。
5. **编辑器**：使用 contenteditable 实现所见即所得的轻量 Markdown 编辑，marked.js 负责渲染。
6. **文件持久化**：利用 File System Access API（`showSaveFilePicker` / `showOpenFilePicker`）实现原生文件读写，不支持时自动降级为下载/上传。
7. **可拖拽分隔条**：监听 mousedown/mousemove/mouseup 事件，实时调整左右面板宽度百分比。
8. **键盘快捷键**：统一在 keydown 事件中派发，与菜单/工具栏 action 体系一致。
