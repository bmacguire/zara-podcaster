import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { getPodcast } from "../functions/podcast";
import Header from "./Header";
import PodcastCard from "./PodcastCard";
import Episodes from "./Episodes";
import Episode from "./Episode";
import Error from "./Error";

export default function Podcast() {
    const { podcastId, episodeId } = useParams();
    const [fetchedPodcasts, setFetchedPodcasts] = useLocalStorageState("fetchedPodcasts", []);

    const podcast = fetchedPodcasts.find(p => p.podcastId === podcastId);
    const episode = podcast ? podcast.episodes.find(e => e.episodeId === episodeId) : null;
    
    const fetchPodcast = useCallback(async (podcastId) => {
        const podcast = await getPodcast(podcastId);

        if (!podcast) {
            return;
        }

        setFetchedPodcasts(fetchedPodcasts => ([
            ...fetchedPodcasts,
            podcast
        ]));
    }, [setFetchedPodcasts]);

    useEffect(() => {
        // TODO: Add check for date diff more than one day
        if (!podcast) {
            fetchPodcast(podcastId);
        }
    }, [podcast, fetchPodcast, podcastId]);

    const error = !podcast || (!episode && episodeId);
    
    return (
        <>
            <Header />
            {
                error ? (
                    <Error />
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