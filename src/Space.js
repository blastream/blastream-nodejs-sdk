import Instance from "./Instance";
import Channel from "./Channel";

class Space extends Instance {
    initChannel(result) {
        let channel = new Channel(this._public_key, this._public_key, this._whitelabel_url);
        channel.setRequestUrl(this._request_url);
        channel.setSlug(this._slug);
        channel.setResponseToken(result);
        return channel;
    }
    
    setSlug(slug) {
        if(slug.match('/[^a-z\-0-9]/i') ){
            this.thowException('this is not a valid slug ! only alphanumeric and "-" character is accepted');
        }
        
        slug =  slug.replace('/[^A-Za-z0-9-]+/', '-').trim().toLowerCase();
        if (slug.lenght > 64 || slug.lenght < 2) {
            this.thowException('slug is too long or too short');
        }
        this._slug = slug;
    }
    
    createOrGetChannel(slug, params = {}) {
        this.setSlug(slug);
        
        if(this.isV1()) {
            params = {
                body:{
                    email: slug +'-whitelabel@blastream.com',
                    nickname: slug,
                    api_user_id: slug,
                    status: 'broadcaster'
                }
            };
            result = this.post('/api/token/request', params);
        }
        else
            result = this.post('/space/channel/' + this._slug, params);
        
        return this.initChannel(result);
    }

    createOrGetParticipant(slug, id, params = []) {
        this.setSlug(slug);
        
        if (!id)
            this.thowException('identifier_undefined');
        
        params['id'] = id;
        
        if(!(params['nickname'])) {
            params['nickname'] = id;
        }
        
        if(this.isV1()) {
            params = {
                body:{
                    email: id +'-whitelabel@blastream.com',
                    nickname: id,
                    api_user_id: id,
                    channel: slug,
                    status: 'member'
                }
            };
            
            result = this.post('/api/token/request', params);
        }
        else
            result = this.post('/space/channel/' + this._slug + '/participant', {
                body: params
            });
        
        return this.initChannel(result);
    }
    
    setResponseToken(res) {
        this._token = res['token'];
        this._channel_url = res['url'];
    }
    
    getToken() {
        return this._token;
    }
    
    revokeToken(token) {
        return this.post('/space/revoke-token/' + token);
    }
    
    revokeTokens(slug) {
        return this.post('/space/revoke-tokens/' + slug);
    }
    
    registerHook(url) {
        return this.post('/space/hook', {
            body:{
                url:url
            }
        });
    }

}

export default Space;