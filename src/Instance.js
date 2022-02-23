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
    
};