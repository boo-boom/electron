const { ipcRenderer } = require('electron')
const { BrowserWindow } = require('electron').remote

// 1. localStorage
const aid = localStorage.getItem('aid')
console.log('localStorage:', aid)

// 2. win.webContents.send
ipcRenderer.on('toNew', (event, winId, aid) => {
    console.log('send:', aid, ';winId:', winId)
    // 根据id查找窗口
    const firstWin = BrowserWindow.fromId(winId)
    firstWin.webContents.send('toIndex', '接收到了aid')
})