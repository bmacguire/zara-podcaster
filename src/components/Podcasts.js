import { useEffect, useCallback, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { getPodcasts } from "../functions/podcast";
import PodcastItem from "./PodcastItem";

export default function Podcasts() {
    const [podcasts, setPodcasts] = useLocalStorageState("podcasts", []);
    const [podcastsFetchDate, setPodcastsFetchDate] = useLocalStorageState("podcastsFetchDate", null);
    const [filter, setFilter] = useState("");
    
    const fetchPodcasts = useCallback(async () => {
        const podcasts = await getPodcasts();

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
    );
}