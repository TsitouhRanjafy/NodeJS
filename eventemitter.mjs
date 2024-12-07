import EventEmitter from "node:events";

const eventEmitter = new EventEmitter();

eventEmitter.on('start', (number,string) => {
    console.log(`started ${number} - ${string}`);
})

eventEmitter.once('newListener',(event,listener) => {
    if (event === 'event') {
        eventEmitter.on('event',() => {
            console.log('B');
        })
    }
});
eventEmitter.on('event', () => {
    console.log('A');
    
})

eventEmitter.emit('event');

// B
// A