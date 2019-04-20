const electron = require("electron");
const fs = require("fs");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

const startUrl =
  process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`;
const MOVIES_PATH = path.join(__dirname, "public", "movies");
const PAGINATION_STEP = 12;

let mainWindow;
let categories;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 800,
    width: 1250,
    resizable: false
  });
  //mainWindow.setFullScreen(true);
  mainWindow.setMenu(null);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(startUrl);

  /*const mainMenu = Menu.buildFromTemplate(menuTemplate);
  if (process.platform === "darwin") {
    Menu.setApplicationMenu(mainMenu);
  } else {
    mainWindow.setMenu(mainMenu);
  }*/

  //enable garbage collector
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

app.on("ready", createWindow);

ipcMain.on("categories:get", () => {
  fs.readdir(MOVIES_PATH, function(err, items) {
    categories = items;
    mainWindow.webContents.send("categories:list", categories);
  });
});

ipcMain.on("movies:get", (event, { categoryId, page }) => {
  const CATEGORY_FOLDER_NAME = categories[categoryId];
  const CATEGORY_FOLDER = `/movies/${CATEGORY_FOLDER_NAME}`;

  const POSTERS_FOLDER = path.join(MOVIES_PATH, CATEGORY_FOLDER_NAME, "image");
  fs.readdir(POSTERS_FOLDER, function(err, items) {
    const length = items ? items.length : 0;
    const maxPage = Math.ceil(length / PAGINATION_STEP);
    const movies = items
      ? items.slice((page - 1) * PAGINATION_STEP, page * PAGINATION_STEP)
      : null;
    mainWindow.webContents.send("movies:list", {
      movies,
      maxPage,
      CATEGORY_FOLDER
    });
  });
});
