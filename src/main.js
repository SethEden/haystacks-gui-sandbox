import { app, BrowserWindow, screen } from 'electron';

const createWindow = () => {
  const displays = screen.getAllDisplays();
  let displayAsOneWindow = false;
  let displayAsTwoWindows = false;
  let displayAsMultiWindows = false;
  // Display 1
  let display01_minX = 0;
  let display01_minY = 0;
  let display01_maxX = 0;
  let display01_maxY = 0;

  // Display 2
  let display02_minX = 0;
  let display02_minY = 0;
  let display02_maxX = 0;
  let display02_maxY = 0;

  let width01 = 0;
  let height01 = 0;

  let width02 = 0;
  let height02 = 0;

  let force2Screens = true

  if (displays.length === 1) {
    displayAsOneWindow = true;
    display01_minX = displays[0].bounds.x;
    display01_minY = displays[0].bounds.y;
    display01_maxX = displays[0].bounds.x + displays[0].bounds.width;
    display01_maxY = displays[0].bounds.y + displays[0].bounds.height;

    width01 = display01_maxX - display01_minX;
    height01 = display01_maxY - display01_minY;
  } else if (displays.length === 2 || force2Screens === true) {
    displayAsTwoWindows = true;

    display01_minX = displays[0].bounds.x;
    display01_minY = displays[0].bounds.y;
    display01_maxX = displays[0].bounds.x + displays[0].bounds.width;
    display01_maxY = displays[0].bounds.y + displays[0].bounds.height;

    display02_minX = displays[1].bounds.x;
    display02_minY = displays[1].bounds.y;
    display02_maxX = displays[1].bounds.x + displays[1].bounds.width;
    display02_maxY = displays[1].bounds.y + displays[1].bounds.height;

    width01 = display01_maxX - display01_minX;
    height01 = display01_maxY - display01_minY;
    width02 = display02_maxX - display02_minX;
    height02 = display02_maxY - display02_minY;

    console.log({ display01_minX, display01_minY, width01, height01 });
    console.log({ display02_minX, display02_minY, width02, height02 });

    const window1 = new BrowserWindow({
      x: display01_minX,
      y: display01_minY,
      width01,
      height01,
      fullscreenEnable: true, // Prevents fullscreen mode
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false // Simplified setup; consider security adjustments later
      }
    });
  
    // Explicitly set the bounds after creation to span all monitors
    window1.setBounds({ x: display01_minX, y: display01_minY, width01, height01 });
  
    window1.loadFile('src/index.html');
    window1.webContents.openDevTools(); // Add this line

    const window2 = new BrowserWindow({
      x: display02_minX,
      y: display02_minY,
      width02,
      height02,
      fullscreenEnable: false, // Prevents fullscreen mode
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false // Simplified setup; consider security adjustments later
      }
    });
  
    // Explicitly set the bounds after creation to span all monitors
    window2.setBounds({ x: display02_minX, y: display02_minY, width02, height02 });
  
    window2.loadFile('src/index.html');
    window2.webContents.openDevTools(); // Add this line
  } else if (displays.length > 2) {
    displayAsMultiWindows = true;
  } else {

  }
};

app.whenReady().then(createWindow);