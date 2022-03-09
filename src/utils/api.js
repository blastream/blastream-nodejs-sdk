import fetch,{ Headers} from "node-fetch";

export default async function fetchApi(extension, params = {}) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    if(params['method'] !== 'GET') {
        headers.append('X-Api-Public', process.env.PUBLIC_KEY)
        headers.append('X-Api-Private', process.env.PRIVATE_KEY)
    }
    params['headers'] = headers
    console.log(process.env.DEV_REQUEST_URL+extension)
    let query = await fetch(process.env.DEV_REQUEST_URL+extension, params)
    let res = await query.json();
    return res
}
