import { Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";

export default function Header({ loading }) {
    return (
        <div className="header">
            <h2>
                <Link to="/">Podcaster</Link>
            </h2>
            {loading && <LoadingIcon />}
        </div>
    );
}