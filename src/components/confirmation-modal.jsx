import { Modal, Text, Group, Button } from '@mantine/core';

const ConfirmationModal = ({ opened, handler, text, action }) => {
    const confirm = () => {
        action();
        handler();
    };

    return (
        <Modal.Root opened={opened} onClose={handler}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Confirmation
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Text>{text ?? 'Are you sure you want to do this ?'}</Text>
                    <Group position="right" mt="md">
                        <Button variant="light" color="red" onClick={handler}>
                            Cancel
                        </Button>
                        <Button variant="light" color="green" onClick={confirm}>
                            Confirm
                        </Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ConfirmationModal;
