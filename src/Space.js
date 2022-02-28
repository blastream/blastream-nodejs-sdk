import Instance from "./Instance";
import Channel from "./Channel";

class Space extends Instance {
    initChannel(result) {
        let channel = new Channel(this._public_key, this._public_key, this._whitelabel_url);
        channel.setRequestUrl(this._request_url);
        channel.setSlug(this._slug);
        channel.setResponseToken(result);
        return $channel;
    }
    
}

export default Space;