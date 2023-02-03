import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Podcasts from "./components/Podcasts";
import Podcast from "./components/Podcast";

// Using a CSS library, like Bootstrap, would have taken
// more time for me, so I just used plain CSS
import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Podcasts />} />
            <Route path="/podcast/:podcastId" element={<Podcast />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<Podcast />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);