import {Instance as Blastream} from './Instance';

function run(){
    let blastream = new Blastream(PUBLIC_KEY, PRIVATE_KEY); 
    blastream.setTimeout(6000);
    try {
        let channel = blastream.createOrGetChannel('my-channel');
        let iframe = channel.getIframe(800, 600, {
            username: 'admin username'
        });
        console.log(iframe);
    }
    catch (e) {
        console.log(e)
    }
}