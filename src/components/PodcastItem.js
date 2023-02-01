import { Link } from "react-router-dom";

export default function PodcastItem({ podcast }) {
    const {
        podcastId,
        name,
        author,
        image: {
            url: imageUrl,
            size: imageSize
        }
    } = podcast;
    
    return (
        <Link to={`/podcast/${podcastId}`}>
            <div className="item">
                <img
                    src={imageUrl}
                    className="image"
                    style={{
                        width: `${imageSize}px`,
                        height: `${imageSize}px`
                    }}
                    alt="Podcast Item"
                />
                <div className="name">{name}</div>
                <div className="author">Author: {author}</div>
            </div>
        </Link>
    );
}