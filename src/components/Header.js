import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <h2>
                <Link to="/">Podcaster</Link>
            </h2>
        </div>
    );
}