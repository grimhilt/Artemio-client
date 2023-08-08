import { Modal, Text } from '@mantine/core';
import PlaylistViewEditor from './playlist-view-editor';
import API from '../../services/api';

const ModalCreatePlaylist = ({ opened, handler, addPlaylist }) => {
    const validated = (item) => {
        if (item) {
            addPlaylist(item);
        }
        handler();
    };

    return (
        <Modal.Root opened={opened} onClose={handler}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Create Playlist
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <PlaylistViewEditor
                        buttonText="Create"
                        APICall={API.createPlaylist}
                        handler={(item) => validated(item)}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreatePlaylist;
