import { Button, Group, Modal, Text } from '@mantine/core';
import UserView from './user-view';
import ModalUserEditor from './user-editor-modal';
import { useEffect, useState } from 'react';
import API from '../../services/api';

const ModalUserView = ({ opened, handler, ...props }) => {
    const [showEdit, setShowEdit] = useState(false);
    const toggleModalEdit = () => setShowEdit(!showEdit);
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user);
        return () => {};
    }, [props.user]);

    return (
        <>
            <Modal.Root opened={opened} onClose={handler}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>
                            <Text fw={700} fz="lg">
                                User view
                            </Text>
                        </Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>
                        <UserView user={user} />
                        <Group position="right" mt="md">
                            <Button variant="light" color="blue" onClick={toggleModalEdit}>
                                Edit
                            </Button>
                        </Group>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <ModalUserEditor
                opened={showEdit}
                handler={(item) => setUser(item)}
                handlerClose={toggleModalEdit}
                APICall={API.updateUser}
                item={user}
                name="Update"
            />
        </>
    );
};

export default ModalUserView;
