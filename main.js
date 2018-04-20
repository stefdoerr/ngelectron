'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require('electron-debug')({showDevTools: true});

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });

    mainWindow.loadURL('file://' + __dirname + '/app/webapp.html');
    mainWindow.setMenu(null);
});
