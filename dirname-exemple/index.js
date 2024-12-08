const fs = require('node:fs');
const path = require('path');
const express = require('express');
const { openAsBlob } = require('node:fs')

const dirPah = path.join(__dirname,'/pictures');
const filePath = path.join(__dirname,'/pictures','text.txt');

// create a new directory '/pictures'
fs.mkdirSync(dirPah) 

// open file as blob
(async () => {
    const blob = await openAsBlob(path.join(__dirname,'/pictures','text.txt'),{ type: "soratra" });
    const ab = await blob.arrayBuffer();
    // blob.stream();
    console.log(blob);
    console.log(ab);
    
})();

express.static(path.join(__dirname,'/public'));

// Open (created or overwritten) and write something in a file
const fd = fs.openSync(filePath,'w',11)

fs.writeSync(fd,'ito soratra hipetaka ao');

setTimeout(() => {
    console.log('close file now');
    fs.closeSync(fd)
    
},10000)

console.log(fd);
console.log('Program done!'); 

// Difference between process.cwd() vs __dirname
/**
 * Project 
 *  |___ main.js
 *  |___ lib
 *      |__ script.js
 * 
 * process.cwd() returns the value of directory where we run the node process.
 * 
 * __dirname returns the values of directory where the current running file resides.
 * 
 */

// main.js
console.log(process.cwd()); // C:\Project
console.log(__dirname); // C:\Project

// script.js
console.log(process.cwd()); // C:\Project
console.log(__dirname); // C:\Project\lib











