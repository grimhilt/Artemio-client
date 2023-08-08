import { useEffect, useState } from 'react';
import NavbarSignage from '../../components/navbar';
import PlaylistTable from './playlist-table';
import API from '../../services/api';
import setNotification from '../errors/error-notification';
import ModalCreatePlaylist from './create';
import { Button } from '@mantine/core';
import GrantAccess, { Perm } from '../../tools/grant-access';

const Playlists = () => {
    const [showCreate, setShowCreate] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);
    const [, setItem] = useState({});
    const [page, setPage] = useState(0);
    const limit = 6;

    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);

    const [playlists, setPlaylist] = useState([]);

    useEffect(() => {
        API.playlists.list(limit, page)
            .then((res) => {
                if (res.status === 200) {
                    if (playlists.length === 0) setPlaylist(res.data);
                    else setPlaylist((prev) => [...prev, ...res.data]);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const [search, setSearch] = useState('');

    const loadMore = () => {
        setPage((prev) => prev + limit);
    };

    const addPlaylist = (playlist) => {
        setPlaylist((prev) => [...prev, playlist]);
    };

    const navbar = {
        title: 'Playlists',
        search: search,
        handlerChange: (e) => setSearch(e.target.value),
        buttonCreate: (
            <GrantAccess
                role={Perm.CREATE_PLAYLIST}
                children={<Button onClick={toggleModalCreate}>New Playlist</Button>}
            />
        ),
    };

    return (
        <>
            <NavbarSignage data={navbar} />
            <PlaylistTable
                data={playlists}
                updateItem={setItem} // todo
                // eslint-disable-next-line eqeqeq
                onDelete={(id) => setPlaylist(playlists.filter((item) => item._id != id))}
                updateHandler={toggleModalUpdate}
                loadMore={loadMore}
            />
            <ModalCreatePlaylist
                opened={showCreate}
                handler={toggleModalCreate}
                addPlaylist={(playlist) => addPlaylist(playlist)}
            />
        </>
    );
};

export default Playlists;
