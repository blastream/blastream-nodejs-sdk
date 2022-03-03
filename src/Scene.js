
class Scene {
    
    constructor(data, instance) {
        this._data = data;
        this._instance = instance;
    }
    
    update(data) {
        res = this._instance.post('/channel/scene/' + this._data['id'], {
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
    
    remove(id, data) {
        this._instance.delete('/channel/scene/' + this._data['id']);
    }
 
    
    createScene(name, data) {
        if(this.isV1())
            return;
        data['name'] = name;
        return new Scene(this.put('/channel/scene', {
            body: {
                data:data
            }
        }), this);
    }
    
    getScenes() {
        if(this.isV1())
            return [];
        list = this.get('/channel/scenes');
        scenes = [];
        list['list'].foreach(  (scene) => {
            scenes.push(new Scene(scene, this));
        });
        return scenes;
    }
    
    getScene(id) {
        if(this.isV1())
            return;
        scene = this.get('/channel/scene/' + id);
        return new Scene(scene, this);;
    }
    
    uploadScenePic(type, file) {
        if(this.isV1())
            return;
        res = this.post('/broadcaster/upload/' + type, {
            file: file,
            name: basename(file)
        });
        res['file'] = './docs' + res['file'];
        return res;
    }
    
    
    
}
export default Scene;