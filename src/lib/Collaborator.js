import fetchApi from './utils';


class Collaborator {
    constructor(data,instance) {
        this.data = data;
        this.instance = instance
    }
    
    getIframe(width, height, params = {}) {
        params['url'] = this._data['invite_link']+'?api=' + this._instance.getPublickKey();
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
    
    update(displayname, status, params = {}) {
        params['displayname'] = displayname;
        params['email'] = this._data['email'];
        params['status'] = status;
        res = this._instance.post('/channel/collaborator/' +  this._data['token'], {
            'body': params
            });
        this._data = res;
    }
    
    remove() {
        this._instance.delete('/channel/collaborator/' + this.data['token']);
    }


    createOrGetCollaborator(displayname, status, params = []) {
        colabs = this.getCollaborators();
        colabs.foreach((colab) => {
            if(colab.getDisplayname() == displayname && colab.getStatus() == status)
                return colab;
        })
        return this.createCollaborator(displayname, status, params);
    }
    
    createCollaborator(displayname, status, params = []) {
        params['displayname'] = displayname;
        params['email'] = this.slugify(displayname)+'-'+time()+'@mail.com';
        params['status'] = status;
        return new Collaborator(this.put('/channel/collaborator', {
            'body': params
        }), this);
    }
    
    getCollaborators(type = false) {
        if(type == false)
            list = this.get('/channel/collaborators');
        else
            list = this.get('/channel/collaborators/' + type);
        
        colabs = [];
        list.foreach( (colab) => {
            colabs.push(new Collaborator(colab, this));
        })
        return colabs;
    }

}
export default Collaborator;