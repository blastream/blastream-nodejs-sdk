export default class Scene {
    
    constructor(data, instance) {
        this._data = data;
        this._instance = instance;
    }
    
    async update(data) {
        let res = await this._instance.post('/channel/scene/' + this._data['id'], {
            body: {
                data
            }
        });
        this._data = res;
        return res;
    }
    
    getData() {
        return this._data;
    }
    
    isDefault() {
        return this._data['default_scene'];
    }
    
    async remove(id, data) {
       await this._instance.delete('/channel/scene/' + this._data['id']);
    }
 
    async getScene(id) {
        let scene = await this.get('/channel/scene/' + id);
        return new Scene(scene, this);;
    }
    
    
    
    
    
}
