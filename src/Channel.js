import fetchApi from './utils';
import Instance from './Instance';
import Collaborator from './Collaborator';
import Document from './Document';


class Channel extends Instance {
    constructor() {
        this.slug;
        this.isChannel = true
    }
    
    setSlug(slug){
        this.slug = slug;
    }

    setAccessRule(privacy, params = {}) {
        if(privacy == 'PRIVATE')
            privacy = 2;
        if(privacy == 'PUBLIC')
            privacy = 0;
        let headers;
        return fetchApi('/channel/rule', 'PUT', headers , {privacy: privacy, data: params});
    }
    createOrRefreshSpeakersToken() {
        return this.put('/channel/speakers-token');
    }
    removeSpeakersToken() {
        return this.delete('/channel/speakers-token');
    }
    getSpeakersToken() {
        return this.get('/channel/speakers-token');
    }
    getReplays() {
        return $this.get('/channel/videos');
    }
    updateSettings(params) {
        return this.post('/channel/settings', {
            'body': {
                'data': params
            }
        });
    }

    updateChatSettings(params) {
        return this.post('/chat/settings', {
            'body': {
                'data': params
            }
        });
    }
    
    updateSubscription(plan, billing) {
        return this.post('/channel/subscription',
        {
            'body': {
                'plan': plan,
                'billing': billing
            }
        });
    }
    
    setCustom(params = []) {
        if(this.sV1()) {
            if(!prams['css'])
                prams['css'] = '';
            if(!$prams['js'])
                $prams['js'] = '';
        }
        return this.post('/channel/custom',{
            'body': {
                'data': params
            }
        });
    }
    
    removeCustom(params = []) {
        return this.delete('/channel/custom');
    }
    
    disconnectAll() {
        return this.post('/channel/disconnectall');
    }
    
    sendMessage(params) {
        this._is_channel = false;
        result = this.post('/api/msg', {
            'body': {
                'msg': params['msg'],
                'username': params['username'],
                'slug': this._slug
            }
        });
        this._is_channel = true;
        return result;
    }
    remove() {
        this._is_channel = false;
        let result = this.delete('/space/' . this._slug);
        this._is_channel = true;
        return result;
    }
}
export default Channel;