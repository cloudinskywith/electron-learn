window.ipcRenderer = require('electron').ipcRenderer;

const fs = require('fs');
fs.readFile(__dirname + '/file.txt', function (error, contents) {
    if (error) return console.error(error);
    console.log(contents.toString());
});



