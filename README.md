# 简历优化助手

一个基于 React + FastAPI + Moonshot AI 的简历优化 Web 应用。用户可以上传 PDF 简历，系统会分析简历内容并提供优化建议与模拟面试题。

## 功能特点

- 用户输入 Moonshot API Key 进行验证
- 上传 PDF 格式的简历文件
- 使用 Moonshot AI 分析简历内容
- 提供简历优化建议
- 生成基于简历内容的模拟面试题

## 项目结构

```
resume-optimizer/
├── backend/            # FastAPI 后端
│   ├── app/
│   │   ├── main.py     # 主应用
│   │   ├── routers/    # API 路由
│   │   ├── services/   # 业务逻辑
│   │   └── utils/      # 工具函数
│   └── requirements.txt
├── frontend/           # React 前端
│   ├── public/
│   ├── src/
│   │   ├── components/ # React 组件
│   │   ├── services/   # API 服务
│   │   └── styles/     # CSS 样式
│   └── package.json
└── README.md
```

## 安装与运行

### 后端

1. 进入后端目录：
   ```
   cd resume-optimizer/backend
   ```

2. 创建并激活虚拟环境：
   ```
   python -m venv venv
   source venv/bin/activate  # 在 Windows 上使用 venv\Scripts\activate
   ```

3. 安装依赖：
   ```
   pip install -r requirements.txt
   ```

4. 运行后端服务：
   ```
   uvicorn app.main:app --reload
   ```

### 前端

1. 进入前端目录：
   ```
   cd resume-optimizer/frontend
   ```

2. 安装依赖：
   ```
   npm install
   ```

3. 运行前端服务：
   ```
   npm start
   ```

## 使用方法

1. 访问 http://localhost:3000
2. 输入您的 Moonshot API Key 并验证
3. 上传 PDF 格式的简历文件
4. 查看分析结果和优化建议

## 技术栈

- **前端**：React, Axios, CSS
- **后端**：FastAPI, PyPDF2, httpx
- **AI**：Moonshot AI API

## 注意事项

- 需要有效的 Moonshot API Key
- 仅支持 PDF 格式的简历文件
- 文件大小限制为 5MB
