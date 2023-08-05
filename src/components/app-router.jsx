import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/errors/404';
import Home from '../pages/home';
import Planning from '../pages/planning';
import Playlists from '../pages/playlists';
import Playlist from '../pages/playlist';
import Files from '../pages/files';
import Authentication from '../pages/auth';
import { LoginRequired } from '../tools/grant-access';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planning" element={<LoginRequired children={<Planning />} />} />
            <Route path="/playlists" element={<LoginRequired children={<Playlists />} />} />
            <Route path="/files" element={<LoginRequired children={<Files />} />} />
            <Route path="/playlist/:id" element={<LoginRequired children={<Playlist />} />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
