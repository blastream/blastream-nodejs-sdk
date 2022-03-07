const { default: Instance } = require("./Instance");

import Instance from './Instance'

class Document extends Instance {
    async uploadPic(name, file = false) {
        if(file === false) {
            file = $name;
            name = basename($file);
        }

        var data = new FormData()
        data.append('file', file)
        data.append('name', name)
        return await this.post('/broadcaster/upload/pic', {body:data});
    }
}

export default Document;