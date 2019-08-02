// dependencies
const path = require('path');

const browserWindows = {
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'public/img/banco-electron.ico'),
    center: true,
    resizable: false,
    fullscreen: false,
    webPreferences: {
        nodeIntegration: true
    }

}

module.exports = {
    browserWindows,
}