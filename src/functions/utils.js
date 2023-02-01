import { xml2json } from "xml-js";

// This CORS app needs to be activated in order to use it,
// and is temporarily. Activation can be done visiting the
// link below
const CORS_URL = "https://cors-anywhere.herokuapp.com";

export async function fetchJson(url) {
    const fullUrl = `${CORS_URL}/${url}`;
    
    try {
        return await (await fetch(fullUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })).json();
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function fetchXml(url) {
    const fullUrl = `${CORS_URL}/${url}`;

    try {
        const xmlText = await (await fetch(fullUrl, {
            method: "GET",
            headers: { "Content-Type": "application/rss+xml" }
        })).text();
        
        const jsonText = xml2json(xmlText, { compact: true });
        
        return JSON.parse(jsonText);
    } catch (error) {
        console.log(error);

        return null;
    }
}