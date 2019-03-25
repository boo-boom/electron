/**
 * 自定义菜单
 */

const { Menu } = require('electron');

const template = [{
        label: '文件',
        submenu: [
            {
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
        submenu: [
            {
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