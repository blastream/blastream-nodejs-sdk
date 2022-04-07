export default class Collaborator {
    
    constructor(data, instance) {
        this._data = data;
        this._instance = instance;
    }
    
    getIframe(width, height, params = {}) {
        params['url'] = this._data['invite_link'] + '?api=' + this._instance.getPublickKey();
        return this._instance.getIframe(width, height, params);
    }
    
    getDisplayname() {
        return this._data['displayname'];
    }
    
    getStatus() {
        return this._data['status'];
    }
    
    getData() {
        return this._data;
    }
    
    async update(displayname, status, params = {}) {
        params['displayname'] = displayname;
        params['email'] = this._data['email'];
        params['status'] = status;
        let res = await this._instance.post('/channel/collaborator/' + this._data['token'], {
            body: params
        });
        this._data = res;
        return res;
    }
    
    async remove() {
        await this._instance.delete('/channel/collaborator/' + this._data['token']);
    }
}