import process from 'node:process';
import fs from 'node:fs';

process.on('uncaughtException',(err,origin) => {
    fs.writeSync(
        process.stderr.fd,
        err,
        origin
    );
});

// setTimeout(() => {
//     console.log('This will still run.');
// },500);

// Intentionally cause an exception, but don't catch it.
testError();

// console.log('This will not run.');



function testError(){
    const a = 3.10;
    const b = int(a);

    console.log(b);
}