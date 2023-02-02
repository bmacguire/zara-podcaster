import { useEffect, useCallback, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { getPodcasts } from "../functions/podcast";
import Header from "./Header";
import PodcastItem from "./PodcastItem";

export default function Podcasts() {
    const [podcasts, setPodcasts] = useLocalStorageState("podcasts", []);
    const [podcastsFetchDate, setPodcastsFetchDate] = useLocalStorageState("podcastsFetchDate", null);

    // TODO: Check if it is better to use useTransition here
    const [filter, setFilter] = useState("");

    const fetchPodcasts = useCallback(async () => {
        const podcasts = await getPodcasts();

        // TODO: If there is no podcasts, then the user would
        // have to wait a day for new results. Fix that
        
        setPodcasts(podcasts);
        setPodcastsFetchDate(new Date().toUTCString());
    }, [setPodcasts, setPodcastsFetchDate]);

    function handleFilterChange({ target: { value } }) {
        setFilter(value);
    }

    useEffect(() => {
        // TODO: Add check for date diff more than one day
        if (!podcastsFetchDate) {
            fetchPodcasts();
        }
    }, [podcastsFetchDate, fetchPodcasts]);

    const filteredPodcasts = podcasts.filter(p => {
        const f = filter.trim().toLowerCase();
        const name = p.name.trim().toLowerCase();
        const author = p.author.trim().toLowerCase();

        return !f || name.includes(f) || author.includes(f);
    });

    return (
        <>
            <Header />
            <div className="podcasts">
                <div className="search">
                    <span className="count">{filteredPodcasts.length}</span>
                    <input
                        type="text"
                        placeholder="Filter podcasts..."
                        onChange={handleFilterChange}
                        value={filter}
                    />
                </div>
                <div className="list">
                    {filteredPodcasts.map((p, i) => <PodcastItem key={i} podcast={p} />)}
                </div>
            </div>
        </>
    );
}