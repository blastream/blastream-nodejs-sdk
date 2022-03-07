
class Scene {
    
    constructor(data, instance) {
        this._data = data;
        this._instance = instance;
    }
    
    async update(data) {
        res = await this._instance.post('/channel/scene/' + this._data['id'], {
            body: {
                data:data
            }
        });
        this._data = res;
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
 
    
    async createScene(name, data) {
        if(this.isV1())
            return;
        data['name'] = name;
        return new Scene(await this.put('/channel/scene', {
            body: {
                data:data
            }
        }), this);
    }
    
    async getScenes() {
        if(this.isV1())
            return [];
        list = await this.get('/channel/scenes');
        scenes = [];
        list['list'].foreach(  (scene) => {
            scenes.push(new Scene(scene, this));
        });
        return scenes;
    }
    
    async getScene(id) {
        if(this.isV1())
            return;
        scene = await this.get('/channel/scene/' + id);
        return new Scene(scene, this);;
    }
    
    async uploadScenePic(type, file) {
        if(this.isV1())
            return;
        res = await this.post('/broadcaster/upload/' + type, {
            file: file,
            name: basename(file)
        });
        res['file'] = './docs' + res['file'];
        return res;
    }
    
    
    
}
export default Scene;