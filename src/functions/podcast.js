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
            imageUrl: x["im:image"][0].label
        }));
    } catch (error) {
        console.log(error);

        return [];
    }
}