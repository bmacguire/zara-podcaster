import { useState } from "react";
import parse from "html-react-parser";
import LoadingIcon from "./LoadingIcon";

export default function Episode({ episode }) {
    const { name, summary, audioUrl } = episode;
    const [audioLoading, setAudioLoading] = useState(true);
    
    function handleCanPlay() {
        setAudioLoading(false);
    }
    
    return (
        <div className="episode">
            <h2>{name}</h2>
            <div>
                <small>
                    {/* Show description as HTML */}
                    <i>{parse(summary)}</i>
                </small>
            </div>
            <hr />
            <div>
                <audio
                    src={audioUrl}
                    controls
                    style={{
                        display: audioLoading ? "none" : "block"
                    }}
                    onCanPlay={handleCanPlay}
                ></audio>
                {audioLoading && (
                    <>
                        <LoadingIcon />
                        <small><i>Loading Episode</i></small>
                    </>
                )}
            </div>
        </div>
    );
}