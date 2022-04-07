
# Blastream NodeJS Sdk

All URIs are relative to *https://api.v2.blastream.com/api-docs*

### Install

```
npm install blastream
```

### Init

```js
const Blastream = require('blastream');
let PUBLIC_KEY = 'XXXXXX';
let PRIVATE_KEY = 'YYYYYY';
let blastream = new Blastream(PUBLIC_KEY, PRIVATE_KEY); 
```

### Examples

#### createOrGetChannel
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let iframe = channel.getIframe(800, 600, {
        username: 'admin_user'
    });
    console.log(iframe);
```


#### createCollaborator
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let colaborator = await channel.createOrGetCollaborator('alan', 'animator'); //The collaborator username is unique for a channel
    let iframe = colaborator.getIframe(800, 600);
    console.log('iframe', iframe);
```


#### createParticipant
```js
    let channel = await blastream.createOrGetParticipant('my-channel', 'my-part');
    let iframe = channel.getIframe(800, 600);
    console.log('iframe', iframe);
```


#### getReplays
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let list = await channel.getReplays();
    console.log('replays', list);
```


#### registerHook
```js
    let res = await blastream.registerHook('https://http.jay.invaders.stream/hook_from_blastream.php');
    console.log('res', res);
    
```


#### updateSubscription
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let res = await channel.updateSubscription('pro2', 'hourly');
    console.log('res', res);
```


#### setAccessRule
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let res = await channel.setAccessRule('PRIVATE', {
        knock: 1 //can be knock or password, if you set password you have to put the password value : password => 'my-password'
    });
    console.log('res', res);
```


#### updateSettings
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let res = await channel.updateSettings({
        autojoin: 1
    });
    console.log('res', res);
```


#### updateCollaborator
```js
    let channel = await blastream.createOrGetChannel('my-channel');
    let colaborator = await channel.createOrGetCollaborator('Collaborator Username', 'moderator'); 
    let res = await colaborator.update('New username', 'animator');
    console.log('res', res);
```


#### updateCustom
```js
    let channel = await blastream.createOrGetChannel('my-channel');
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
```


#### updateScene
```js
    let channel = await blastream.createOrGetChannel('my-channel');
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
```

