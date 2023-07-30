import { useEffect, useState } from 'react';
import NavbarSignage from '../../components/navbar';
import PlaylistTable from './playlist-table';
import API from '../../services/api';
import setNotification from '../errors/error-notification';

const Playlists = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [item, setItem] = useState({});
    const [page, setPage] = useState(0);
    const limit = 6;

    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);

    const [playlists, setPlaylist] = useState([]);

    useEffect(() => {
        API.listPlaylists(limit, page)
            .then((res) => {
                if (res.status === 200) {
                    if (playlists.length === 0) setPlaylist(res.data);
                    else setPlaylist((prev) => [...prev, ...res.data]);
                }
            })
            .catch((err) => {
                setNotification(true, err.message);
            });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const [search, setSearch] = useState('');

    const loadMore = () => {
        setPage((prev) => prev + limit);
    };

    const navbar = {
        title: 'Playlists',
        search: search,
        handlerChange: (e) => setSearch(e.target.value),
        buttonCreate: {
            text: 'New Playlist',
            handler: toggleModalCreate,
        },
    };

    return (
        <>
            <NavbarSignage data={navbar} />
            <PlaylistTable
                data={playlists}
                updateItem={setItem}
                // eslint-disable-next-line eqeqeq
                onDelete={(id) => setPlaylist(playlists.filter((item) => item._id != id))}
                updateHandler={toggleModalUpdate}
                loadMore={loadMore}
            />
        </>
    );
};

export default Playlists;
