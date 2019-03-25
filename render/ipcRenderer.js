// 渲染进程
const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const btnSend = document.getElementById('btnSend');
const sendReplay = document.getElementById('sendReplay');
const btnSendSync = document.getElementById('btnSendSync');

// 异步
btnSend.onclick = () => {
    // 渲染进程向主进程send数据
    ipcRenderer.send('sendMsg', '来自渲染进程的数据_1')
}

sendReplay.onclick = () => {
    // 渲染进程向主进程send数据
    ipcRenderer.send('sendReplay', '来自渲染进程的数据_2')
}
// 接收主进程send的数据
ipcRenderer.on('replay', (event, data) => {
    console.log(data)
})

// 同步
btnSendSync.onclick = () => {
    const msg = ipcRenderer.sendSync('sendSync', '来自渲染进程的数据_sync')
    console.log(msg)
}

// 使用主进程打开页面
const openBtn = document.getElementById('openBtn');
// 获取当前窗口到id
const winId = BrowserWindow.getFocusedWindow().id;
openBtn.onclick = () => {
    ipcRenderer.send('openNew', winId, 456456);
    // 通过localStorage进行渲染进程与渲染进程通信
    localStorage.setItem('aid', 123123123)
}

// 接收到aid后返回到数据
ipcRenderer.on('toIndex', (event, data) => {
    console.log(data)
})
