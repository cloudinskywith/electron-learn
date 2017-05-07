const {app, BrowserWindow, ipcMain, globalShortcut, dialog, shell, Tray, Menu} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow = null;
let tray = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    //打开开发者工具
    mainWindow.openDevTools();
    //设置下载进度
    mainWindow.setProgressBar(0.5);

    //get、set目录
    console.log(app.getPath('home'));
    app.setPath('home', 'D:/ElectronApp');
    console.log(app.getPath('home'));
    //获取参数  argv[1]是.   argv[2]是传递的参数
    console.log(process.argv[2]);
    //判断是否生产环境
    if (app.getName() !== 'Electron' && process.argv.length > 1) {
        console.log('ok');
    }

    //注册快捷键
    // var isRegistered = globalShortcut.register('Ctrl+V', () => {
    //     console.log('ctrl+v is pressed');
    //     dialog.showMessageBox({
    //         message: 'ERROR',
    //         buttons: ['确定', '知道了', '第三个']
    //     }, function (index) {
    //         console.log(index)
    //     });
    // });
    // console.log(globalShortcut.isRegistered('Ctrl+V'));
    dialog.showSaveDialog(mainWindow, {
        title: '保存文件',
        defaultPath: '/Users/',
        filters: []
    }, (filePath) => {
        if(filePath){
            console.log(filePath);
        }
    });


    let child = new BrowserWindow({width: 400, height: 300, parent: mainWindow, modal: true, show: false});
    child.loadURL('https://github.com');
    child.once('ready-to-show', () => {
        child.show()
    });
});


ipcMain.on('ping', (event, arg) => {
    if (arg === 'hello') {
        event.sender.send('pong', '你好，我是ipcMain')
    }
});

ipcMain.on('open-shell',function(event,args){
    console.log(args);
    shell.openItem('D:/ElectronApp');
    console.log('after openItem');
    shell.openExternal('http://www.liaobaocheng.com');
    isDeleted = shell.moveItemToTrash('C:/Users/Administrator/Desktop/vpn.txt');
    if(isDeleted){
        shell.beep();
    }else{
        console.log('remove fail');
    }

});

app.on('open-file', (event, path) => {
    event.preventDefault();
    fileToOpen = path;
    if (mainWindow) {
        mainWindow.send('open-file', path);
    }
});

let trayIcon = null;
ipcMain.on('open-tray',function(event,args){
    console.log('open-tray');
    trayIcon = new Tray('D:/ElectronApp/developing-an-electron-edge/8802-multiprocesses/windows.png');
    trayIcon.setToolTip('这个是我的应用');
    trayIcon.setContextMenu(Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio', click: () => {console.log('good to item1')} },
        { label: 'Item2', type: 'radio', checked: true, click: () => {console.log('good to item2')} }
    ]));
});


