import Instance from './Instance';
import Channel from './Channel';

export default class Blastream {
    
    constructor(public_key, private_key, custom_domain = '') {
        let instance = new Instance(public_key, private_key, custom_domain);
        instance.setChannelModel(Channel);
        return instance;
    }
    
}