export async function fetchApi(extension, params) {
    headers.append('Content-Type', 'application/json')
    headers.append('X-Api-Public', PUBLIC_KEY)
    headers.append('X-Api-Private', PRIVATE_KEY)
    let query = await fetch(DEV_REQUEST_URL+extension, params)
    let res = await query.json();
    return res
}
