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
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let iframe = channel.getIframe(800, 600, {
        username: 'admin_user'
    });
    console.log(iframe);
}

async createCollaborator() {
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let colaborator = await channel.createOrGetCollaborator('alan', 'animator'); //The collaborator username is unique for a channel
    let iframe = colaborator.getIframe(800, 600);
    console.log('iframe', iframe);
}

async createParticipant() {
    let channel = await this.blastream.createOrGetParticipant('my-channel', 'my-part');
    let iframe = channel.getIframe(800, 600);
    console.log('iframe', iframe);
}

async getReplays() {
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let list = await channel.getReplays();
    console.log('replays', list);
}

async registerHook() {
    let res = await this.blastream.registerHook('https://http.jay.invaders.stream/hook_from_blastream.php');
    console.log('res', res);
    
}

async updateSubscription() {
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let res = await channel.updateSubscription('pro2', 'hourly');
    console.log('res', res);
}

async setAccessRule() {
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let res = await channel.setAccessRule('PRIVATE', {
        knock: 1 //can be knock or password, if you set password you have to put the password value : password => 'my-password'
    });
    console.log('res', res);
}

async updateSettings() {
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let res = await channel.updateSettings({
        autojoin: 1
    });
    console.log('res', res);
}

async updateCollaborator() {
    let channel = await this.blastream.createOrGetChannel('my-channel');
    let colaborator = await channel.createOrGetCollaborator('Collaborator Username', 'moderator'); 
    let res = await colaborator.update('New username', 'animator');
    console.log('res', res);
}

async updateCustom() {
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

async createReadme() {
    let props = Object.getOwnPropertyNames(Samples.prototype);
    let script = fs.readFileSync('index.js', 'utf8');
    let finalScripts = {};
    for(var i in props) {
        let fct = props[i];
        let fctNext = props[(parseInt(i) + 1)];
        console.log('fct', fct, fctNext)
        if(fct == 'createReadme' || fct == 'constructor') 
            continue;
        finalScripts[fct] = script.split('async ' + fct + '() {').pop().split('async ' + fctNext + '()').shift();
        for(var j=0; j<3; j++)
            finalScripts[fct] = finalScripts[fct].substring(0, finalScripts[fct].lastIndexOf("\n"));
        finalScripts[fct] = finalScripts[fct].substring(finalScripts[fct].indexOf("\n") + 1);
        finalScripts[fct] = finalScripts[fct].replaceAll('this.blastream', 'blastream');
    }
    //let samples = '```js' + "\n" + finalScripts.join('```' + "\n" + '```js' + "\n") + '```';
    
    let samples = [];
    
    for(var i in finalScripts) {
        samples.push('#### ' + i);
        samples.push('```js')
        samples.push(finalScripts[i])
        samples.push('```')
        samples.push("\n");
    }
    
    let readme = fs.readFileSync('README_TPL.md', 'utf8');
    readme = readme.replace('[SAMPLES]', samples.join("\n"));
    
    fs.writeFileSync('README.md', readme, 'utf8');
    
}
    
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

console.log(process.argv[2]);

let samples = new Samples();
samples[process.argv[2]]();