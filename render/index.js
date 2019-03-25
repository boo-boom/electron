const fs = require('fs');
const { Menu, getCurrentWindow } = require('electron').remote;

window.onload = function () {
    // 显示文件内容
    var btn = document.getElementById('btn')
    var textarea = document.getElementById('textarea')
    btn.onclick = function () {
        // 使用node模块
        fs.readFile('package.json', (err, data) => {
            textarea.innerHTML = data
        });
    }

    // 拖拽显示内容
    var drag = document.querySelector('#drag')
    drag.ondragenter = drag.ondragover = drag.ondragleave = function () {
        return false;
    }
    drag.ondrop = function (e) {
        var path = e.dataTransfer.files[0].path
        fs.readFile(path, 'utf-8', (err, data) => {
            drag.innerHTML = data;
        })
    }

    // 定义右键菜单
    const template = [{
            label: '文件',
            submenu: [{
                    label: '新建文件',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        console.log('新建文件')
                    }
                },
                {
                    label: '新建窗口'
                }
            ]
        },
        {
            label: '编辑',
            submenu: [{
                    label: 'reload',
                    accelerator: 'CmdOrCtrl+R',
                    role: 'reload'
                },
                {
                    label: '复制',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: '粘贴',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                }
            ]
        }
    ]
    const m = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(m)
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        m.popup({
            window: getCurrentWindow()
        })
    }, false)
}