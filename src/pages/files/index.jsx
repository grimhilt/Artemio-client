import { Button, Paper, Grid, Text, Title, Group, List, Image, ScrollArea, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import setNotification from '../errors/error-notification';
import ModalAddFile from './add';
import FileView from '../files/file-view';

const Files = () => {
    const [showAddFile, setShowAddFile] = useState(false);
    const [files, setFiles] = useState([]);
    const toggleShowAddFile = () => setShowAddFile(!showAddFile);

    const handleAddFiles = (files) => {
        console.log(files);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Group position="apart" mt="md">
                <Title m="md" order={2}>
                    Files
                </Title>
                <Button variant="light" mt="sm" onClick={toggleShowAddFile}>
                    Add file
                </Button>
            </Group>

            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <ScrollArea.Autosize mah={700} offsetScrollbars>
                    <Title order={3}>Files</Title>
                    <Grid columns={12}>
                        {files.map((file) => (
                            <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={file.id}>
                                <FileView key={file.id} file={file} noSelect />
                            </Grid.Col>
                        ))}
                    </Grid>
                </ScrollArea.Autosize>
                <Center>
                    <Button onClick={() => {}} mt="md">
                        Load More
                    </Button>
                </Center>
            </Paper>
            <ModalAddFile
                opened={showAddFile}
                handler={toggleShowAddFile}
                addFiles={(files) => handleAddFiles(files)}
            />
        </>
    );
};

export default Files;
