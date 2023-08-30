import { Modal, Text } from '@mantine/core';
import API from '../../services/api';
import RoleViewEditor from './role-view-editor';

const ModalCreateRole = ({ opened, handler, addRole, item }) => {
    const validate = (role) => {
        if (role) {
            addRole(role);
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
                            Create Role
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <RoleViewEditor
                        buttonText="Create"
                        item={item}
                        APICall={API.roles.create}
                        handler={(role) => validate(role)}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreateRole;
