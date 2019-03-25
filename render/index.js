var fs = require('fs');

window.onload = function() {
    // 显示文件内容
    var btn = document.getElementById('btn')
    var textarea = document.getElementById('textarea')
    btn.onclick = function() {
        // 使用node模块
        fs.readFile('package.json', (err, data) => {
            textarea.innerHTML = data
        });
    }

    // 拖拽显示内容
    var drag = document.querySelector('#drag')
    drag.ondragenter = drag.ondragover = drag.ondragleave = function() {
        return false;
    }
    drag.ondrop = function(e) {
        var path = e.dataTransfer.files[0].path
        fs.readFile(path, 'utf-8', (err, data) => {
            drag.innerHTML = data;
        })
    }
}
