const fetch = require('node-fetch');

export default class Instance {
    
    constructor(public_key, private_key, custom_domain = '') {
        this.request_url = 'https://api.v2.blastream.com';
        this.app_url =  'app.v2.blastream.com';
        this.public_key;
        this.private_key;
        this.token = false;
        this.channel_url;
        this.embed = 1;
        this.whitelabel_url = '';
        this.is_channel = false;
        this.timeout = 3000;
        this.version = 2;
        
        this.public_key = public_key;
        this.private_key = private_key;
        
        if (custom_domain != '') {
            this.whitelabel_url = custom_domain;
        }
    }
    
    setChannelModel(Channel) {
        this.Channel = Channel;
    }
   
    setRequestUrl(url) {
        this.request_url =  url
    }

    slugify(text) {
        let trExp = /[\/\s]+/gi;
        text = text.replace(trExp, '-')
            .toString()
            .toLowerCase() 
            .trim();
        var from = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
        var to = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
        for (var i = 0, len = from.length; i < len; i++) {
            text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        return text
            .replace(/\s+/g, '-')
            .replace(/&/g, '-y-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    }

    getPublickKey() {
        return this.public_key;
    }

    setTimeout(timeout) {
        this.timeout = timeout;
    }

    setVersion(v) {
        this.version = v;
    }
    
    async fetchApi(uri, params = {}) {
        let headers = {};
        
        if(params.body && params.file) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        
        if (params.json !== false)  {
            headers['Content-Type'] = 'application/json';
            if(params.body)
                params.body = JSON.stringify(params.body);
        }
        
        
        
        if(!this._is_channel) {
            headers['X-Api-Public'] = this.public_key;
            headers['X-Api-Private'] = this.private_key;
        }
        else {
            if(this._token == false)
                this.thowException('token is not initialized, please createOrGetChannel before');
            headers['X-Auth-Token'] = this._token;
        }
        
        params['headers'] = headers;
        
        let query = await fetch(this.request_url + uri, params);
        let res = await query.json();
        return res
    }

    async get(url, params = {}) {
        params['method'] = 'GET';
        return await this.fetchApi(url, params);
    }
    
    async post(url, params = {}) {
        params['method'] = 'POST';
        return await this.fetchApi(url, params);
    }
    
    async put(url, params = {}) {
        params['method'] = 'PUT';
        return await this.fetchApi(url, params);
    }
    
    async delete(url, params = {}) {
        params['method'] = 'DELETE';
        return await this.fetchApi(url, params);
    }
    
    thowException(error) {
        throw new Error(error);
    }
    
    getIframe(width, height, params = {}) {
        
        let url;
        if(!params['url'])
            url = this.getUrl();
        else {
            url = params['url'];
            delete params['url'];
        }
        
        let style = '';
        if(params['style']) {
            style = params['style'];
            delete params['style']
        }
        
        params['embed'] = 1
        
        
        url = url + '&' + new URLSearchParams(params);

        let htmlFrame = '<iframe allow="microphone; camera; display-capture" width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" scrolling="no" allowFullScreen="true" style="' + style + '" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';

        return htmlFrame;
    }
    
    getUrl() {
        let url = this._channel_url;
        if (this._whitelabel_url) { url = url.replace(this._app_url, this._whitelabel_url) };
        return url + '?token=' + this._token + '&api=' + this._public_key;
    }
    
    initChannel(result) {
        let channel = new this.Channel(this._public_key, this._public_key, this._whitelabel_url);
        channel.setRequestUrl(this.request_url);
        channel.setSlug(this._slug);
        channel.setResponseToken(result);
        return channel;
    }
    
    setSlug(slug) {
        if(slug.match('/[^a-z\-0-9]/i') ){
            this.thowException('this is not a valid slug ! only alphanumeric and "-" character is accepted');
        }
        
        slug =  slug.replace('/[^A-Za-z0-9-]+/', '-').trim().toLowerCase();
        if (slug.lenght > 64 || slug.lenght < 2) {
            this.thowException('slug is too long or too short');
        }
        this._slug = slug;
    }
    
    async createOrGetChannel(slug, params = {}) {
        this.setSlug(slug);
        let result = await this.post('/space/channel/' + this._slug, params);
        return this.initChannel(result);
    }

    async createOrGetParticipant(slug, id, params = {}) {
        this.setSlug(slug);
        
        if (!id)
            this.thowException('identifier_undefined');
        
        params['id'] = id;
        
        if(!params['nickname']) {
            params['nickname'] = id;
        }
        
        
        let result = await this.post('/space/channel/' + this._slug + '/participant', {
            body: params
        });
        
        return this.initChannel(result);
    }
    
    setResponseToken(res) {
        this._token = res['token'];
        this._channel_url = res['url'];
    }
    
    getToken() {
        return this._token;
    }
    
    async revokeToken(token) {
        return await this.post('/space/revoke-token/' + token);
    }
    
    async revokeTokens(slug) {
        return await this.post('/space/revoke-tokens/' + slug);
    }
    
    async registerHook(url) {
        return await this.post('/space/hook', {
            body: {
                url
            }
        });
    }
    
    async getPlans() {
        return await this.get('/plans');
    }
    
};

