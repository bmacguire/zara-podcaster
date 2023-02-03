import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { getPodcast } from "../functions/podcast";
import { getDaysDifference } from "../functions/utils";
import Header from "./Header";
import PodcastCard from "./PodcastCard";
import Episodes from "./Episodes";
import Episode from "./Episode";

export default function Podcast() {
    const { podcastId, episodeId } = useParams();
    const [fetchedPodcasts, setFetchedPodcasts] = useLocalStorageState("fetchedPodcasts", []);
    const [loading, setLoading] = useState(true);
    
    const podcast = fetchedPodcasts.find(p => p.podcastId === podcastId);
    const episode = podcast ? podcast.episodes.find(e => e.episodeId === episodeId) : null;

    // Either the podcast couldn't be found or an episode
    // couldn't be found when it was requested
    const error = !podcast || (!episode && episodeId);

    // Log errors, if any
    if (!loading && !podcast) {
        console.log("Podcast not found");
    }

    if (!loading && !episode && episodeId) {
        console.log("Podcast episode not found");
    }
    
    const fetchPodcast = useCallback(async (podcastId) => {
        const podcast = await getPodcast(podcastId);

        if (podcast) {
            setFetchedPodcasts(fetchedPodcasts => ([
                ...fetchedPodcasts,
                podcast
            ]));
        }

        setLoading(false);
    }, [setFetchedPodcasts, setLoading]);

    useEffect(() => {
        if (!podcast || getDaysDifference(podcast.fetchDate) > 0) {
            fetchPodcast(podcastId);
        } else {
            setLoading(false);
        }
    }, [podcast, fetchPodcast, podcastId, setLoading]);
    
    return (
        <>
            <Header loading={loading} />
            {
                (loading || error) ? (
                    null
                ) : (
                    <div className="podcast">
                        <PodcastCard podcast={podcast} />
                        {
                            episode ? (
                                <Episode episode={episode} />
                            ) : (
                                <Episodes podcastId={podcastId} episodes={podcast.episodes} />
                            )
                        }
                    </div>
                )
            }
        </>
    );
}