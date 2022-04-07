const Blastream = require('./build/blastream').default;
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('config.json'));
let blastream = new Blastream(config.PUBLIC_KEY, config.PRIVATE_KEY); 

blastream.createOrGetChannel('my-channel').then(data => { console.log('data', data) });