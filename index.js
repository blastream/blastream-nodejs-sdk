import Blastream from './src/Blastream';
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('config.json'));

class Samples {
    
    constructor() {
        this.blastream = new Blastream(config.PUBLIC_KEY, config.PRIVATE_KEY); 
        
        if(config.URL)
            this.blastream.setRequestUrl(config.URL);
        
        this.blastream.setTimeout(6000);
    }
    
    async createChannel() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let iframe = channel.getIframe(800, 600, {
                username: 'admin_user'
            });
            console.log(iframe);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async createCollaborator() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let colaborator = await channel.createOrGetCollaborator('alan', 'animator'); //The collaborator username is unique for a channel
            let iframe = colaborator.getIframe(800, 600);
            console.log('iframe', iframe);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async createParticipant() {
        try {
            let channel = await this.blastream.createOrGetParticipant('my-channel', 'my-part');
            let iframe = channel.getIframe(800, 600);
            console.log('iframe', iframe);
        }
        catch (e) {
            console.log(e);
        }
    }
    
}

console.log(process.argv[2]);

let samples = new Samples();
samples[process.argv[2]]();