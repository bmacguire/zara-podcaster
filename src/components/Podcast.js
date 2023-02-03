import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { getPodcast } from "../functions/podcast";
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
    const error = !podcast || (!episode && episodeId);
    
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
        // TODO: Add check for date diff more than one day
        if (!podcast) {
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