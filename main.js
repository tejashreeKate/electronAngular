// ./main.js
const {app, BrowserWindow} = require('electron')
require('dotenv').config();
const path = require('path')
 

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});

  if (process.env.PACKAGE === 'true'){
    win.loadURL(`file://${__dirname}/dist/index.html`)
  }
  else{
  // Specify entry point
  win.loadURL(`http://127.0.0.1:4200`);
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron.cmd')
  });
  // Show dev tool
  // Remove this line before distributing
  win.webContents.openDevTools()
  }

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});