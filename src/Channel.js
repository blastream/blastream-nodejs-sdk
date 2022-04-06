import Instance from './Instance';
import Collaborator from './Collaborator';

export default class Channel extends Instance {
    
    constructor(public_key, private_key, custom_domain = '') {
        super(public_key, private_key, custom_domain);
    }
    
    setSlug(slug) {
        this.slug = slug;
    }

    async setAccessRule(privacy, params = {}) {
        if(privacy == 'PRIVATE')
            privacy = 2;
        if(privacy == 'PUBLIC')
            privacy = 0;
        return await this.put('/channel/rule', { 
            privacy: privacy, 
            data: params
        });
    }

    async createOrRefreshSpeakersToken() {
        return await this.put('/channel/speakers-token');
    }

    async removeSpeakersToken() {
        return await this.delete('/channel/speakers-token');
    }
    async getSpeakersToken() {
        return await this.get('/channel/speakers-token');
    }
    async getReplays() {
        return await this.get('/channel/videos');
    }
    async updateSettings(params) {
        return await this.post('/channel/settings', {
            body: {
                data: params
            }
        });
    }

    updateChatSettings(params) {
        return this.post('/chat/settings', {
            body: {
                data: params
            }
        });
    }
    
    updateSubscription(plan, billing) {
        return this.post('/channel/subscription',
        {
            body: {
                plan: plan,
                billing: billing
            }
        });
    }
    
    setCustom(params = []) {
        return this.post('/channel/custom',{
            body: {
                data: params
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
        let result = this.post('/api/msg', {
            body: {
                msg: params['msg'],
                username: params['username'],
                slug: this._slug
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
    
    async createOrGetCollaborator(displayname, status, params = []) {
        let colabs = this.getCollaborators();
        for(var i in colabs) {
            let colab = colabs[i];
            if(colab.getDisplayname() == displayname && colab.getStatus() == status)
                return colab;
        }
        return this.createCollaborator(displayname, status, params);
    }
    
    async createCollaborator(displayname, status, params = []) {
        params['displayname'] = displayname;
        params['email'] = this.slugify(displayname) + '-' + new Date().getTime() + '@mail.com';
        params['status'] = status;
        let collab = await this.put('/channel/collaborator', { body: params });
        return new Collaborator(collab, this);
    }
    
    async getCollaborators(type = false) {
        let list;
        if(type == false)
            list = await this.get('/channel/collaborators');
        else
            list = await this.get('/channel/collaborators/' + type);
        
        let colabs = [];
        for(var i in list) {
            let collab = list[i];
            colabs.push(new Collaborator(collab, this));
        }
        return colabs;
    }
}