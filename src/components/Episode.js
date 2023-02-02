import parse from "html-react-parser";

export default function Episode({ episode }) {
    const { name, summary, audioUrl } = episode;
    
    return (
        <div className="episode">
            <h2>{name}</h2>
            <div>
                <small>
                    <i>{parse(summary ?? "")}</i>
                </small>
            </div>
            <audio src={audioUrl} controls></audio>
        </div>
    );
}