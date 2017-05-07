window.ipcRenderer.send('ping', 'hello');

window.ipcRenderer.on('pong', (event, arg) => {
    // document.write('<h1>' + arg + '</h1>');
});


const {dialog} = require('electron').remote;

const {ipcRenderer} = require('electron');

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

$("#openShell").on('click',function(){
    var bb = 'yes i go';
    ipcRenderer.send('open-shell',bb);
});

$("#openTray").on('click',function(){
    ipcRenderer.send('open-tray');
})

function openFile (filename) {
    var contents = fs.readFileSync(filename);
    console.log(contents.toString());
}

ipcRenderer.on('open-file', (event, arg) => {
    console.log(arg);
});