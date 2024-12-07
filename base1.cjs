// ******* Node.js as a File Path ******** //

/**
 * On linux or macOS, a path look like: /users/tsitohaina/file.txt
 * on windows: C:\users\tsitohaina\file.txt
 * 
 * @dirname :  gets the parent folder of a file
 * @basename : gets the filename part
 * @extname : gets the file extension
 */

const path = require ('path');
const notes = '/users/tsitohaina/notes.txt'

path.dirname(notes); // /users/tsitohaina
path.basename(notes); // notes.txt
path.extname(notes); // .txt

// Other fonctionnality
path.resolve('tsitohaina.txt'); // C:\Users\Tsitohaina\Desktop\tsitohaina.txt if run from my home folder

path.resolve('tmp','tsitohaina.txt'); // C:\Users\Tsitohaina\Desktop\tmp\tsitohaina.txt if run from my home folder

path.resolve('/etc','tsitohaina.txt'); // /etc/tsitohaina.txt

// ******* Node.js as a File Server ******** //

var fs = require('node:fs'); // File System

/**
 * @Read files
 * @Create files
 *      @appendFile
 *      @open
 *      @writeFile
 * @Update files
 * @Delete files
 *      @unlink
 * @Rename files
 * 
 */

fs.appendFile(path.join(__dirname,'test.txt'),'This is writed by base1.cjs',['utf-8','a'],(err) => {
    if (err) throw err;
    console.log('File created and data saved!');  
})


fs.readFile(path.join(__dirname,'test.txt'),'utf-8', (err,data) => {
    if (err) throw err;
    console.log(data);
})

setTimeout(() => {
    fs.unlink(path.join(__dirname,'test.txt'),(error) => {
        if (error) throw error;
        console.log("File deleted");
    })
},5000);








