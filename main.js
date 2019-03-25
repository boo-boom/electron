// 主进程
const electron = require('electron');
// 直接使用node模块
const path = require('path');

/**
 * app: 控制应用生命周期到模块
 * BrowserWindow: 窗口相关的模块
 */
const {app, BrowserWindow} = electron;

// 保存对应用窗口的引用
let mainWindow = null;

function createWindow() {
    // 创建BrowserWindow实例 赋值给mainWindow打开窗口
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    }); 

    /**
     * 加载页面方式 loadFile loadURL
     */
    // 将index.html加载到窗口
    // mainWindow.loadFile('index.html')

    mainWindow.loadURL(path.join('file:', __dirname, 'index.html'))

    // 开启渲染进程的调试模式
    mainWindow.webContents.openDevTools()

    // 关闭时销毁实例
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

// 开启应用
app.on('ready', createWindow)

// 当所有窗口被关闭后退出应用
app.on('window-all-closed', () => {
    // 对于OS X系统，应用和相应的菜单会一直激活到用户通过 Cmd + Q 显式退出
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

// macos当应用被激活时
app.on('activate', () => {
    // 当dock图标被点击后重新激活app
    if(mainWindow === null) {
        createWindow()
    }
})