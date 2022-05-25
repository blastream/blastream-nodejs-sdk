import Instance from './Instance';
import Collaborator from './Collaborator';
import Scene from './Scene';
const FormData = require('form-data');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

export default class Channel extends Instance {
    
    constructor(public_key, private_key, custom_domain = '') {
        super(public_key, private_key, custom_domain);
        this._is_channel = true;
    }
    
    setSlug(slug) {
        this.slug = slug;
    }
    
    setId(id) {
        this.id = id;
    }
    
    getId(id) {
        return this.id;
    }

    async setAccessRule(privacy, params = {}) {
        if(privacy == 'PRIVATE')
            privacy = 2;
        if(privacy == 'PUBLIC')
            privacy = 0;
        return await this.put('/channel/rule', { 
            body: {
                privacy: privacy, 
                data: params    
            }
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
    
    async getSettings() {
        return this.get('/channel/settings');
    }
    
    async updateAdvancedSettings(params) {
        let settings = await this.getSettings();
        for(var i in params)
            settings.advanced[i] = params[i];
        return await this.updateSettings({
            advanced: settings.advanced
        });
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
    
    setCustom(params = {}) {
        return this.post('/channel/custom',{
            body: {
                data: params
            }
        });
    }
    
    removeCustom(params = {}) {
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
    
    async remove() {
        this._is_channel = false;
        let result = await this.delete('/space/' . this._slug);
        this._is_channel = true;
        return result;
    }
    
    async startLivestreaming() {
        return await this.post('/channel/livestreaming/start');
    }
    
    async stopLivestreaming() {
        return await this.post('/channel/livestreaming/stop');
    }
    
    async startRecord() {
        return await this.post('/channel/startrecord');
    }
    
    async stopRecord() {
        return await this.post('/channel/stoprecord');
    }
    
    async createOrGetCollaborator(displayname, status, params = {}) {
        let colabs = await this.getCollaborators();
        for(var i in colabs) {
            let colab = colabs[i];
            if(colab.getDisplayname() == displayname && colab.getStatus() == status)
                return colab;
        }
        return await this.createCollaborator(displayname, status, params);
    }
    
    async createCollaborator(displayname, status, params = {}) {
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
    
    async uploadPic(name, file = false, type = 'pic') {
        const form = new FormData();
        if(file === false)
            file = name;
        const buffer = await readFile(file);
        const fileName = name;
            
        form.append('file', buffer, {
          contentType: 'application/octet-stream',
          name: 'file',
          filename: fileName,
        });
        
        return await this.post('/broadcaster/upload/' + type, {
            body: form,
            json: false
        });
    }
    
    async createScene(name, data) {
        data['name'] = name;
        return new Scene(await this.put('/channel/scene', {
            body: {
                data: data
            }
        }), this);
    }
    
    async getScenes() {
        let data = await this.get('/channel/scenes');
        let scenes = [];
        for(var i in data.list) {
            let scene = data.list[i];
            scenes.push(new Scene(scene, this));
        }
        return scenes;
    }
    
    async uploadScenePic(type, file) {
        let res = await this.uploadPic(file, file, type);
        res['file'] = './docs' + res['file'];
        return res;
    }
    
    
    
}