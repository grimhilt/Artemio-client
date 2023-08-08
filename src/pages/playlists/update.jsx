import { Modal, Text } from '@mantine/core';
import API from '../../services/api';
import PlaylistViewEditor from './playlist-view-editor';

const ModalUpdatePlaylist = ({ item, opened, handler, updatePlaylist }) => {
    const validated = (playlist) => {
        updatePlaylist(playlist);
        handler();
    };

    return (
        <Modal.Root opened={opened} onClose={handler}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Update Playlist
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <PlaylistViewEditor
                        item={item}
                        buttonText="Update"
                        APICall={API.playlists.update}
                        handler={(playlist) => validated(playlist)}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalUpdatePlaylist;
