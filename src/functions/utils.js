import { xml2json } from "xml-js";

// This CORS app needs to be activated in order to use it,
// and is temporarily. Activation can be done visiting the
// link below
const CORS_URL = "https://cors-anywhere.herokuapp.com";

export async function fetchJson(url) {
    // Returns JSON data
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
    // Fetch XML data and parse the result as JSON
    // and return that JSON
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

export function formatDate(dateText) {
    try {
        const date = new Date(dateText);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch {
        return undefined;
    }
}

export function formatDuration(durationText) {
    // Duration comes in seconds, mostly, but it has
    // different formats for different podcasts. Ask
    // about that. It is not always accurate
    const duration = parseInt(durationText);

    if (isNaN(duration)) {
        return "00:00:00";
    }

    // Get time portion of a date object as a string.
    // Sample data for durationText === 64: "Tue Feb 01 2000 00:01:04 GMT+0100 (Central European Standard Time)"
    return new Date(2000, 1, 1, 0, 0, duration, 0).toString().split(" ")[4];
}