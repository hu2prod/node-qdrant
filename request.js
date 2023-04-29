const fetch = require("node-fetch");

this.body_request = async function body_request(url,body,method){
    method = method || "POST";

    let fetch_spec = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (body) fetch_spec.body = JSON.stringify(body);

    let response = await fetch(url, fetch_spec);

    let text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(text);
    }
}


this.url_request = async function url_request(url,params){
    if (params) {
        url += "?" + new URLSearchParams(params).toString();
    }

    let response = await fetch(url);

    let text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(text);
    }
}
