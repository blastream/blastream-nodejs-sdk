export async function fetchApi(extension, params) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    if(params['method'] !== 'GET') {
        headers.append('X-Api-Public', PUBLIC_KEY)
        headers.append('X-Api-Private', PRIVATE_KEY)
    }
    params['headers'] = headers
    let query = await fetch(DEV_REQUEST_URL+extension, params)
    let res = await query.json();
    return res
}
