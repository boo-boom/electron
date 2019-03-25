const { shell } = require('electron')

const alink = document.getElementById('alink')

alink.onclick = function(e) {
    e.preventDefault()
    const href = this.getAttribute('href')
    shell.openExternal(href)
}