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
    
    async createOrGetChannel() {
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
    
    async getReplays() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let list = await channel.getReplays();
            console.log('replays', list);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async registerHook() {
        try {
            let res = await this.blastream.registerHook('https://http.jay.invaders.stream/hook_from_blastream.php');
            console.log('res', res);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async updateSubscription() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let res = await channel.updateSubscription('pro2', 'hourly');
            console.log('res', res);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async setAccessRule() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let res = await channel.setAccessRule('PRIVATE', {
                knock: 1 //can be knock or password, if you set password you have to put the password value : password => 'my-password'
            });
            console.log('res', res);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async updateSettings() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let res = await channel.updateSettings({
                autojoin: 1
            });
            console.log('res', res);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async updateCollaborator() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let colaborator = await channel.createOrGetCollaborator('Collaborator Username', 'moderator'); 
            let res = await colaborator.update('New username', 'animator');
            console.log('res', res);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async updateCustom() {
        try {
            let channel = await this.blastream.createOrGetChannel('my-channel');
            let upload = await channel.uploadPic('logo.png');
            let res = await channel.setCustom({
                colors:  [
                  "#ff0000",
                  "#ff0000",
                  "#ff0000",
                  "#ff0000"
                ],
                js: 'alert(\'ok\')',
                css: '',
                logo: upload.file
            });
            console.log('res', res)
        }
        catch(err) {
            console.log('err', err)
        }
    }
    
    async updateScene() {
        let channel = await this.blastream.createOrGetChannel('my-channel');
        let scenes = await channel.getScenes(); 
        
        //can be 'overlay', 'logo' or 'background'
        let upload = await channel.uploadScenePic('overlay', 'logo.png');
        for(var i in scenes) {
            let scene = scenes[i];
            if(scene.isDefault()) {
                let res = await scene.update({
                    overlay: {
                        src: upload['file'],
                        play: true
                    },
                    background: {
                        color: '#ff0000'
                    }
                });
                console.log('res', res);
            }
        }
    }
    
}

console.log(process.argv[2]);

let samples = new Samples();
samples[process.argv[2]]();