import { PODCASTS_URL } from "../consts/urls";
import { fetchJson } from "./utils";

export async function getPodcasts() {
    const podcastJson = await fetchJson(PODCASTS_URL);

    if (!podcastJson) {
        return [];
    }
    
    try {
        return podcastJson.feed.entry.map(x => ({
            podcastId: x.id.attributes["im:id"],
            name: x["im:name"].label,
            author: x["im:artist"].label,
            image: {
                url: x["im:image"][0].label,
                size: x["im:image"][0].attributes.height
            }
        }));
    } catch (error) {
        console.log(error);

        return [];
    }
}