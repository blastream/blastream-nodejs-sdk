import fetchApi from './utils'


class Channel {
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

}