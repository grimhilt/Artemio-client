import { Group, Modal, Text, rem, Button, List } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { useState } from 'react';
import API from '../../services/api';
import setNotification from '../errors/error-notification';

const ModalAddFile = ({ opened, handler, addFiles }) => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const validate = (object) => {
        setIsLoading(false);
        setFiles([]);
        addFiles(object);
        handler();
    };

    const addFilesToList = (files) => {
        files.forEach((file) => {
            setFiles((prev) => [...prev, file]);
        });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB chunks

        files.forEach((file) => formData.append(`${file.name}`, file, file.name));

        API.files
            .upload(formData)
            .then((res) => {
                if (res.status === 200) {
                    validate(res.data);
                }
            })
            .catch((err) => {
                setNotification(true, err);
                setIsLoading(false);
            });
    };

    return (
        <Modal.Root opened={opened} onClose={() => validate([])}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Add File
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Dropzone
                        onDrop={(files) => addFilesToList(files)}
                        onReject={(files) => setNotification(true, `Rejected files: ${files.map((file) => file.name)}`)}
                        maxSize={1024 ** 3} // 1 GB
                        accept={[IMAGE_MIME_TYPE, MIME_TYPES.mp4]}
                    >
                        <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                            <Dropzone.Accept>
                                <IconUpload size="3.2rem" stroke={1.5} />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX size="3.2rem" stroke={1.5} />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconPhoto size="3.2rem" stroke={1.5} />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>
                                    Drag images here or click to select files
                                </Text>
                                <Text size="sm" color="dimmed" inline mt={7}>
                                    Attach as many files as you like, each file should not exceed 1 GB
                                </Text>
                            </div>
                        </Group>
                    </Dropzone>
                    <List>
                        {files.map((file, index) => (
                            <List.Item key={index}>{file.name}</List.Item>
                        ))}
                    </List>
                    <Group position="right" mt="md">
                        <Button variant="light" color="red" onClick={() => validate([])}>
                            Cancel
                        </Button>
                        <Button variant="light" color="green" loading={isLoading} onClick={handleSubmit}>
                            Upload
                        </Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalAddFile;
