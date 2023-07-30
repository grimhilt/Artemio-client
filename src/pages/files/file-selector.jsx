import { Modal, Button, Text, Group, Grid, TextInput, ScrollArea } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ModalAddFile from './add';
import SelectorItem from '../../components/select-item';
import API from '../../services/api';
import setNotification from '../errors/error-notification';

const ModalFileSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const [files, setFiles] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState('');
    let resfiless = [];

    const toggleShowAdd = () => setShowAdd(!showAdd);

    const clickHandler = (files) => {
        if (props.multi) {
            // eslint-disable-next-line eqeqeq
            const indexfiles = resfiless.findIndex((item) => item._id == files._id);
            if (indexfiles === -1) {
                resfiless.push(files);
            } else {
                resfiless.splice(indexfiles, 1);
            }
        } else {
            handleSubmitLocal(files);
        }
    };

    const handleSubmitLocal = (files) => {
        handleSubmit(props.multi ? resfiless : files);
        handleClose();
    };

    useEffect(() => {
        API.getFiles()
            .then((res) => {
                if (res.status === 200) {
                    setFiles(res.data);
                }
            })
            .catch((err) => {
                setNotification(true, err.response.data.error);
            });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (search.length >= 2) {
            API.searchfiles(search)
                .then((res) => {
                    if (res.status === 200) {
                        setFiles(res.data);
                    }
                })
                .catch((err) => {
                    setNotification(true, err.response.data.error);
                });
        } else if (search.length === 0) {
            API.getFiles()
                .then((res) => {
                    if (res.status === 200) {
                        setFiles(res.data);
                    }
                })
                .catch((err) => {
                    setNotification(true, err.response.data.error);
                });
        }
    }, [search]);

    return (
        <Modal.Root opened={opened} onClose={handleClose} size="lg">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Select file{props.multi ? 's' : ''}
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <TextInput
                        placeholder="Type to Search"
                        mb="sm"
                        radius="md"
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    <ScrollArea h={430} offsetScrollbars>
                        <Grid columns={3}>
                            {files.map((file) => (
                                <SelectorItem file={file} clickHandler={clickHandler} key={file.id} />
                            ))}
                        </Grid>
                    </ScrollArea>
                    <Group position="right" mt="md">
                        {props.multi && (
                            <>
                                <Button variant="light" color="gray" onClick={() => setShowAdd(true)}>
                                    Add file(s)
                                </Button>
                                <Button variant="light" color="red" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="light" color="green" onClick={() => handleSubmitLocal()}>
                                    Validate
                                </Button>
                            </>
                        )}
                    </Group>
                    {showAdd && (
                        <ModalAddFile
                            opened={showAdd}
                            handler={toggleShowAdd}
                            addFiles={(files) => setFiles((prev) => [...prev, files])}
                        />
                    )}
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalFileSelector;
