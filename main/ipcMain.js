// 主进程
const { ipcMain, BrowserWindow } = require('electron');

// 异步
// 接收渲染进程send的数据
ipcMain.on('sendMsg', (event, data) => {
    console.log(data);
})

// 接收渲染进程send的数据并返回
ipcMain.on('sendReplay', (event, data) => {
    console.log(data);
    // 接收数据并返回给渲染进程
    event.sender.send('replay', '好的，收到')
})

// 同步
ipcMain.on('sendSync', (event, data) => {
    console.log(data)
    // 给渲染进程返回数据
    event.returnValue = '好的，收到同步数据'
})

// 使用主进程打开页面
const path = require('path');
let win = null;
ipcMain.on('openNew', (event, winId, aid) => {
    win = new BrowserWindow({
        width: 400,
        height: 300,
    })
    win.loadURL(path.join('file:', __dirname, '../new.html'))
    win.webContents.openDevTools()

    /**
     * ipcMain只能从哪里过来的send返回到哪里，
     * 如果需要send到别到渲染进程，则需要使用win.webContents.send
     */
    // 监听当前窗口加载完成
    win.webContents.on('did-finish-load', (event) => {
        win.webContents.send('toNew', winId, aid)
    })

    win.on('closed', () => {
        win = null
    })
})