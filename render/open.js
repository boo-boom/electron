// 渲染进程中无法调用主进程中到模块，但可以通过electron中但remote模块间接调用
const { BrowserWindow } = require('electron').remote;
const path = require('path');

const btn = document.getElementById('openBtn');
const openHome = document.getElementById('openHome');

let win = null;

btn.onclick = () => {
    win = new BrowserWindow({
        width: 400,
        height: 300,
        // frame: false,           // 不显示菜单
        // fullscreen: true,       // 全屏
    })
    win.loadURL(path.join('file:', __dirname, 'new.html'))
    win.on('closed', () => {
        win = null
    })
}

