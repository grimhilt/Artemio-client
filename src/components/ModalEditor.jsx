import { Modal, Text } from '@mantine/core';

const ModalEditor = ({ title, opened, handlerClose }) => {

    return (
        <Modal.Root opened={opened} onClose={handlerClose}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            {title}
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalEditor;
