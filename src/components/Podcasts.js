import { useEffect, useCallback, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { getPodcasts } from "../functions/podcast";
import { getDaysDifference } from "../functions/utils";
import moment from "moment/moment";
import Header from "./Header";
import PodcastItem from "./PodcastItem";

export default function Podcasts() {
    const [podcasts, setPodcasts] = useLocalStorageState("podcasts", []);
    const [podcastsFetchDate, setPodcastsFetchDate] = useLocalStorageState("podcastsFetchDate", null);
    const [loading, setLoading] = useState(true);

    // TODO: Check if it is better to use useTransition here.
    // Perhaps not, because results are already cached?
    const [filter, setFilter] = useState("");

    const filteredPodcasts = podcasts.filter(p => {
        const f = filter.trim().toLowerCase();
        const name = p.name.trim().toLowerCase();
        const author = p.author.trim().toLowerCase();

        return !f || name.includes(f) || author.includes(f);
    });

    const fetchPodcasts = useCallback(async () => {
        const podcasts = await getPodcasts();

        // TODO: If there is no podcasts, then the user would
        // have to wait a day for new results. Fix that

        setPodcasts(podcasts);
        setPodcastsFetchDate(moment().utc().format());
        setLoading(false);
    }, [setPodcasts, setPodcastsFetchDate, setLoading]);
    
    function handleFilterChange({ target: { value } }) {
        setFilter(value);
    }
    
    useEffect(() => {
        if (!podcastsFetchDate || getDaysDifference(podcastsFetchDate) > 0) {
            fetchPodcasts();
        } else {
            setLoading(false);
        }
    }, [podcastsFetchDate, fetchPodcasts, setLoading]);
    
    return (
        <>
            <Header loading={loading} />
            {
                loading ? (
                    null
                ) : (
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
                )
            }
        </>
    );
}