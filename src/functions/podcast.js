import { PODCASTS_URL, PODCAST_URL } from "../consts/urls";
import { fetchJson, fetchXml, formatDate, formatDuration } from "./utils";
import moment from "moment/moment";

const EMPTY = "EMPTY";
const DEFAULT_IMAGE_SIZE = 55; // px

export async function getPodcasts() {
    const podcastsJson = await fetchJson(PODCASTS_URL);

    if (!podcastsJson) {
        return [];
    }

    try {
        const entry = podcastsJson.feed?.entry;

        if (!entry || !entry.length) {
            console.log("Error fetching podcasts");

            return [];
        }
        
        return entry.map(x => {
            const podcastId = (x.id?.attributes && x.id?.attributes["im:id"]) ? x.id.attributes["im:id"] : crypto.randomUUID();
            const imageUrl = (x["im:image"] && x["im:image"].length) ? x["im:image"][0].label : undefined;
            const imageSize = (x["im:image"] && x["im:image"].length) ? (x["im:image"][0].attributes?.height ?? DEFAULT_IMAGE_SIZE) : DEFAULT_IMAGE_SIZE;

            return {
                podcastId,
                name: x["im:name"]?.label ?? EMPTY,
                author: x["im:artist"]?.label ?? EMPTY,
                imageUrl,
                imageSize
            }
        });
    } catch (error) {
        console.log(error);

        return [];
    }
}

export async function getPodcast(podcastId) {
    const podcastJson = await fetchJson(`${PODCAST_URL}${podcastId}`);

    if (!podcastJson) {
        return null;
    }

    try {
        if (!podcastJson.results || !podcastJson.results.length) {
            console.log("Error fetching podcast");

            return null;
        }

        const feedUrl = podcastJson.results[0].feedUrl;
        const podcastFeedJson = await fetchXml(feedUrl);

        if (!podcastFeedJson) {
            return null;
        }

        const channel = podcastFeedJson.rss?.channel;

        if (!channel) {
            console.log("Error fetching podcast");

            return null;
        }

        return {
            podcastId,
            imageUrl: channel["itunes:image"]?._attributes?.href,
            name: channel.title?._text ?? EMPTY,
            author: channel["itunes:author"]?._text ?? EMPTY,
            summary: channel["itunes:summary"]?._text ?? EMPTY,
            fetchDate: moment().utc().format(),
            episodes: (channel.item && channel.item.length) ? channel.item.map(x => ({
                episodeId: x.guid?._text ?? crypto.randomUUID(),
                name: x.title?._text ?? EMPTY,
                date: formatDate(x.pubDate?._text) ?? EMPTY,

                // Ask here, as duration is not always accurate.
                // Maybe take it from the audio file itself?
                duration: formatDuration(x["itunes:duration"]?._text),
                
                summary: x.description?._cdata ?? "<p></p>",
                audioUrl: x.enclosure?._attributes?.url
            })) : []
        }
    } catch (error) {
        console.log(error);

        return null;
    }
}