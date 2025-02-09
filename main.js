import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

// Verifica si el servidor Express está listo
function waitForServer(url, callback) {
  const checkServer = () => {
    http.get(url, (res) => {
      if (res.statusCode === 200) {
        callback();
      } else {
        setTimeout(checkServer, 500);
      }
    }).on('error', () => {
      setTimeout(checkServer, 500);
    });
  };
  checkServer();
}


const userDataPath = app.getPath('userData');
process.env.SQLITE_DB_PATH = path.join(userDataPath, 'lb_stock.db');
// Iniciar el backend (Express)
function startBackend() {
  backendProcess = spawn('node', ['server/index.js'], {
    cwd: __dirname,
    stdio: 'ignore',  // Oculta la salida en la consola
    detached: true, // Permite que siga corriendo en segundo plano
    env: {
      ...process.env,
      SQLITE_DB_PATH: process.env.SQLITE_DB_PATH // Pasa la ruta al servidor
    }
  });
  backendProcess.on('error', (err) => {
    console.error('Error al iniciar el backend:', err);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend cerrado con código ${code}`);
  });
}

// Crear la ventana de Electron
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.setMenu(null);
  // Cargar la URL cuando el servidor esté listo
  waitForServer('http://localhost:5000', () => {
    mainWindow.loadURL('http://localhost:5000');
  });   

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Cuando la aplicación esté lista
app.whenReady().then(() => {
  startBackend();
  createWindow();
});

// Manejar eventos de cierre
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});