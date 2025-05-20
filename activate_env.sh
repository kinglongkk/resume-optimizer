#!/bin/bash
# 激活Python 3.10虚拟环境的脚本
echo "正在激活Python 3.10虚拟环境..."
source /Users/huangjinlong/resume-optimizer/venv/bin/activate
echo "虚拟环境已激活！现在使用的是Python $(python --version)"
echo "提示: 使用'deactivate'命令可以退出虚拟环境"
echo "您现在可以在此环境中运行resume-optimizer项目"
