## 1一个最简单的Electron应用
npm init -y
npm install --save-dev electron-prebuilt

```
// index.js
app.on('ready',()=>{
    mainWindow = new BrowserWindow({width: 800,height: 600,webPreferences:{
        nodeIntegration: false,
        preload: __dirname + '/preload.js'
    }});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }))
});


ipcMain.on('ping',(event,arg)=>{
    if(arg==='hello'){
        event.sender.send('pong','你好，我是ipcMain')
    }
});

//preload.js
windows.ipcRenderer = require('electron').ipcRenderer

//index.html
<script src="main.js"></script>

// main.js
window.ipcRenderer.send('ping','hello world');
window.ipcRenderer.on('pong',(event,arg){
    document.write('<h1>' + arg + '</h1>');
})
```

## 2.代码示例
##### 2.1 global
```
//ipcMain中
global.something = foobar;

//ipcRenderer中
let someThing = require('electron').remote.getGlobal('something')
```

##### 2.2 dialog
npm install domtastic --save

```
const {dialog} = require('electron').remote;

window.$ = require('domtastic');
const fs = require('fs');

$("#openFile").on('click',function () {
    dialog.showOpenDialog({
        title: '打开文件'
    }, (filenames) => {
        if (!filenames) return;
        if (filenames.length > 0) {
            openFile(filenames[0]);
        }
    })
});

function openFile (filename) {
    var contents = fs.readFileSync(filename);
    console.log(contents.toString());
}
```


##### 2.3 获取/设置主目录
```
// ipcMain中可用（会在命令行输出）
app.getPath('home');
app.setPath('home', 'D:/ElectronApp');

console.log(app.getPath('home'));
```

##### 2.4 获取命令行参数
```
//获取参数  argv[1]是.   argv[2]是传递的参数
console.log(process.argv[2]);
```

##### 2.5 设置下载进度
```
//设置下载进度
mainWindow.setProgressBar(0.5);
```

##### 2.6 注册快捷键
```
//注册快捷键
    var isRegistered = globalShortcut.register('Ctrl+V', () => {
        console.log('ctrl+v is pressed');
    });
    if (!isRegistered) {
        // Registration failed
    }
    globalShortcut.isRegistered('Ctrl+V')   //正确或错误
```

##### 2.7 dialog案例
```
dialog.showMessageBox({
    message: 'ERROR',
        buttons: ['确定', '知道了', '第三个']
    }, function (index) {
   console.log(index)
});

dialog.showSaveDialog(mainWindow, {
    title: '保存文件',
    defaultPath: '/Users/',
    filters: []
}, (filePath) => {
    if(filePath){
        console.log(filePath);
    }
});
```

##### 2.8 shell的用法
```
shell.openItem('D:/ElectronApp');  //文件浏览器打开一个确定目录，如果该目录存在
shell.openExternal('http://www.liaobaocheng.com'); //网络浏览器打开一个网址
isDeleted = shell.moveItemToTrash('C:/Users/Administrator/Desktop/vpn.txt');
    if(isDeleted){
        shell.beep();
    }else{
        console.log('remove fail');
    }
```

##### 2.9 Tray的用法
```
trayIcon = new Tray('D:/ElectronApp/developing-an-electron-edge/8802-multiprocesses/windows.png');
trayIcon.setToolTip('这个是我的应用');
trayIcon.setContextMenu(Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', click: () => {console.log('good to item1')} },
    { label: 'Item2', type: 'radio', checked: true, click: () => {console.log('good to item2')} }
]));
```
