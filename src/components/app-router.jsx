import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/errors/404';
import Home from '../pages/home';
import Planning from '../pages/planning';
import Playlists from '../pages/playlists';
import Playlist from '../pages/playlist';
import Files from '../pages/files';
import Authentication from '../pages/auth';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/files" element={<Files />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
