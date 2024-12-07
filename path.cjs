/** NodeJS File Paths */

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

console.log("File directory: "+ path.dirname(notes)); // /users/tsitohaina
console.log("File: "+path.basename(notes)); // notes.txt
console.log("File extension: "+path.extname(notes)); // .txt

// Other fonctionnality
path.resolve('tsitohaina.txt'); // C:\Users\Tsitohaina\Desktop\tsitohaina.txt if run from my home folder

path.resolve('tmp','tsitohaina.txt'); // C:\Users\Tsitohaina\Desktop\tmp\tsitohaina.txt if run from my home folder

path.resolve('/etc','tsitohaina.txt'); // /etc/tsitohaina.txt






