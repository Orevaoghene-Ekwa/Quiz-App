import pkg from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { spawn } from "child_process";

// npx electron main.js
// This is the main file that will be run by Electron.
// It creates a window and loads the frontend.

const { app, BrowserWindow } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.commandLine.appendSwitch("disable-gpu");

let backendProcess;
function startBackend() {
  backendProcess = spawn("node", ["index.js"], {
    cwd: __dirname,
    detached: true,
    stdio: "inherit",
  });

  backendProcess.on("error", (err) => {
    console.error("Failed to start backend", err);
  });

  backendProcess.on("exit", (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
}
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, ""),
      nodeIntegration: true, // Allows using Node.js modules
    },
  });

  // Wait for the backend to start before loading the frontend
  setTimeout(() => {
    win.loadURL("http://localhost:3000");
  }, 1000);
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});
