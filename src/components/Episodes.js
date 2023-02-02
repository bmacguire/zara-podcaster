import { Link } from "react-router-dom";

export default function Episodes({ podcastId, episodes }) {
    return (
        <div className="episodes">
            <div className="count">
                <h2>Episodes: {episodes.length}</h2>
            </div>
            <div className="list">
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                            <th style={{ width: "70%" }}>Title</th>
                            <th style={{ width: "15%" }}>Date</th>
                            <th style={{ width: "15%" }}>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((e, i) => (
                            <tr key={i}>
                                <td>
                                    <Link to={`/podcast/${podcastId}/episode/${e.episodeId}`}>{e.name}</Link>
                                </td>
                                <td>{e.date}</td>
                                <td>{e.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}