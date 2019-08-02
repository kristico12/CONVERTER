// Dependencies
const electron = require('electron');
const path = require('path');
const os = require('os');

// imports
const { browserWindows } = require('./config.js');

//initial const
const { app, BrowserWindow } = electron;

// reload hot electron
require('electron-reload')(__dirname);

// method initial call windows
app.on('ready', () => {
    // created new windows
    let window = new BrowserWindow(browserWindows);
    // charge windows file html
    window.loadURL(`file://${__dirname}/public/index.html?home=${os.homedir()}`);
    // Emitido cuando la ventana es cerrada.
    window.on('closed', () => {
        // Elimina la referencia al objeto window, normalmente  guardarías las ventanas
        // en un vector si tu aplicación soporta múltiples ventanas, este es el momento
        // en el que deberías borrar el elemento correspondiente.
        window = null;
    })
    // se elimina la barra de herramientas
    window.setMenu(null);
    // se lanza el devptools de desarrollo
    window.webContents.openDevTools();
    // charget react devtools
    BrowserWindow.addDevToolsExtension(
        path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
    )
})

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clicado y no hay otras ventanas abiertas.
    if (win === null) {
        createWindow()
    }
})