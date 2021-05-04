/* eslint-disable */
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const {ipcMain, globalShortcut} = require("electron")
const { parse } = require('json2csv')
const db = require('./database')

const Survey = db.survey
Survey.init()
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWin;
let mainView;
let navView;
var home = 'app://./index.html'

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    kiosk: true,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      webSecurity: false,
      webviewTag: true
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    home = process.env.WEBPACK_DEV_SERVER_URL
    await win.loadURL(home)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL(home)
  }
  mainWin = await win
}
// app.allowRendererProcessReuse = false
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

let optionWindow
async function createOptionWin(){
  const win = new BrowserWindow({
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      webSecurity: false,
      webviewTag: true,
    }
  })
  win.setMenuBarVisibility(false)
  win.loadURL(home+"#/option")
  optionWindow = await win
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''));
    callback(pathname);
  });
  globalShortcut.register('Alt+CommandOrControl+O', () => {
    createOptionWin()
  })
})

ipcMain.on('get-wall', (event)=>{
  Survey.db.all(`
    SELECT * FROM homescreen
  `, (err, data)=>{
    if(err) console.log(err)
    else event.reply('retrive-wall', data)
  })
})
ipcMain.on('get-survey', (evt) => {
  Survey.db.all(`
    SELECT * FROM survey
  `, (err, data) => {
    if(err) console.log(err)
    else {
      data = data.map(e => {
        e.layanan = e.layanan.split(",").map(e => {
          return e == 1 ? "Perpustakaan Tercetak" :
          e == 2 ? "Perpustakaan Digital" :
          e == 3 ? "Data Mikro" :
          e == 4 ? "Konsultasi Statistik" :
          e == 5 ? "Penjualan Softcopy/Hardcopy" : 
          "Rekomendasi Statistik"
        }).join(" ,")
        return e
      })
      evt.reply('r-survey', parse(data, {
        fields: ['id','nama', 'email', 'layanan', 'kepuasan', 'saran']
      }))
    }
  })
})


ipcMain.on('update-wall', (event, paths)=>{
  let added = false;
  let deleted = false;
  if(paths.insert.length == 0){
    added = true
  }
  if(paths.delete.length == 0){
    deleted = true
  }
  if(added && deleted){
    event.reply("wall-updated")
  }
  paths.insert.forEach((e,i,a) => {
    Survey.insertWallpaper(e)
    if(i == a.length-1){
      event.reply("wall-added")
      added = true
      if(added && deleted){
        event.reply("wall-updated")
        mainWin.reload()
      }
    }
  })
  paths.delete.forEach((e,i,a) => {
    Survey.deleteWallpaper(e)
    if(i == a.length-1){
      event.reply("wall-removed")
      deleted = true
      if(added && deleted){
        event.reply("wall-updated")
        mainWin.reload()
      }
    }
  })
})

ipcMain.on('insert-survey', (evt, data)=>{
  // console.log(data)
  Survey.insertSurvey(
    {
      nama: data.nama,
      email: data.email,
      kepuasan: data.kepuasan,
      saran: data.saran,
      layanan: data.layanan
    }
  )
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
