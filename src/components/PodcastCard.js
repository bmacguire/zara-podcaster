import { Link } from "react-router-dom";

const EMPTY = "EMPTY";

export default function PodcastCard({ podcast }) {
    const { podcastId, imageUrl, name, author, summary } = podcast;

    return (
        <div className="podcast-card">
            <Link to={`/podcast/${podcastId}`} className="image-link">
                <img src={imageUrl} alt="Podcast Card" />
            </Link>
            <hr />
            <Link to={`/podcast/${podcastId}`} className="name-author-link">
                <div>
                    <b>{name}</b><br />
                    {(author !== EMPTY) && <small><i>by {author}</i></small>}
                </div>
            </Link>
            <hr />
            <div>
                <b>Description:</b><br />
                <small><i>{summary}</i></small>
            </div>
        </div>
    );
}