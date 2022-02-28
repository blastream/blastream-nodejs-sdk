import { fetchApi } from "./utils";

class Instance {
    static request_url = 'https://api.v2.blastream.com';
    static app_url =  'app.v2.blastream.com';

    static public_key;
    static private_key;
    static token = false;
    static channel_url;
    static embed = 1;
    static whitelabel_url = '';
    static is_channel = false;
    static timeout = 3000;
    static version = 2;


    constructor(public_key, private_key, custom_domain = ''){
        if ('DEV_REQUEST_URL')
        this.public_key = public_key;
        this.private_key = private_key;
        if (custom_domain != '')
        {
            this.whitelabel_url = custom_domain;
        }
        
    }
   
    setRequestUrl(url) {
        this.request_url =  url
    }

    static slugify(text) {
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
        if(v == 1) {
            this.request_url = 'https://api.blastream.com';
            this.app_url = 'app.blastream.com';
        }
    }
    isV1() {
        return this.version == 1 ? true : false;
    }

    get(url, params = []) {
        params['method'] = 'GET';
        return fetchApi(url, params);
    }
    
    post(url, params = []) {
        params['method'] = 'POST';
        return fetchApi(url, params);
    }
    
    put(url, params = []) {
        params['method'] = 'PUT';
        return fetchApi(url, params);
    }
    
    delete(url, params = []) {
        params['method'] = 'DELETE';
        return fetchApi(url, params);
    }
    
    thowException(error) {
        throw new Error(error);
    }
    
    getIframe(width, height, params = []) {
        
        let url;
        if(!isset(params['url']))
            url = this.getUrl();
        else {
            url = params['url'];
            unset(params['url']);
        }
        
        let style = '';
        if(params['style']) {
            style = params['style'];
            delete params['style']
        }
        
        params['embed'] = 1
        
        
        url = url+ '&' + new URLSearchParams(params);

        $htmlFrame = '<iframe allow="microphone; camera; display-capture" width="'+width+'" height="'+height+'" src="' +url +'" frameborder="0" scrolling="no" allowFullScreen="true" style="' + style + '" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';

        return $htmlFrame;
    }
    getUrl() {
        url = this._channel_url;
        if (this._whitelabel_url) { url = url.replace(this._app_url, this._whitelabel_url) };
        return url + '?token=' + this._token + '&api=' + this._public_key;
    }
    
};

export default Instance;