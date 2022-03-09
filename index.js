
import Instance from './src/Instance';
import env from 'custom-env'
env.env()
function run (){
    
    let blastream = new Instance(process.env.PUBLIC_KEY, process.env.PRIVATE_KEY); 
    blastream.setTimeout(6000);
    try {
        let channel = blastream.createOrGetChannel('my-channel');
        iframe = channel.getIframe(800, 600, {
            username: 'admin_user'
        });
        console.log(iframe);
    }
    catch (e) {
        console.log(e);
    }
}

run();