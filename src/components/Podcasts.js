import { useEffect, useState } from "react";
import { getPodcasts } from "../functions/podcast";

export default function Podcasts() {
    const [podcastJsonText, setPodcastJsonText] = useState("");
    
    useEffect(() => {
        (async function () {
            const podcasts = await getPodcasts();
            
            setPodcastJsonText(JSON.stringify(podcasts, null, 2));
        })();
    }, []);
    
    return (
        <>
            <h1>Podcasts</h1>
            <pre>{podcastJsonText}</pre>
        </>
    );
}