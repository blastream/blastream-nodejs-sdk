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
}
export default Channel;