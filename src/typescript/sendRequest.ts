export async function sendRequest(method:string, URL:string, body:BodyInit=null) {
    const headers = {
        'Content-Type': 'application/json',
        'Pragma': 'no-cache'
    };
    const request = await fetch(URL,{
        method: method,
        body: body,
        headers: headers
    });
    const response = await request.json();
    return response;
}