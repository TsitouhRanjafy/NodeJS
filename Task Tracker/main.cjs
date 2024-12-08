const task = require("./task.json");
const process = require('node:process');
const prompts = require('prompts')

let input;
async function listenCMD() {
    do {
        input = await prompts({
            type: 'text',
            name: 'cmd',
            message: 'task-cli >>'
        })
    
        console.log(input);
    } while(input.cmd != 'stop');
}    

listenCMD();
