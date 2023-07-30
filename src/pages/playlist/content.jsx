import { Box, Image, Flex } from '@mantine/core';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { StrictModeDroppable } from './StrictModeDroppable';
import { ActionIcon, Button, Center, Grid, Group, NumberInput, Paper, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import ModalFileSelector from '../files/file-selector';
import API from '../../services/api';
import setNotification from '../errors/error-notification';

const Content = ({ form, playlistId }) => {
    console.log(form.values);

    const [fileSelector, setFileSelector] = useState(true);
    const toggleFileSelector = () => setFileSelector(!fileSelector);

    const handleAddFiles = (files) => {
        console.log('handle add file');
        console.log(files);
        let formFiles = form.values.files;
        let max_position = formFiles[formFiles.length - 1]?.position ?? 0;
        files.forEach((file) => {
            max_position++;

            file.position = max_position;
            file.seconds = 10;
            form.insertListItem('files', file);
            API.addFileToPlaylist(playlistId, { position: file.position, file_id: file.id, seconds: file.seconds })
                .then((res) => {
                    if (res.status !== 200) {
                        setNotification(true, `Error when adding file (${res.status})`);
                    }
                })
                .catch((err) => {
                    setNotification(true, err.message);
                });
        });
    };

    const changePositionValue = (from, to) => {
        return new Promise((resolve, reject) => {
            const formFiles = form.values.files;
            let below_position = to === 0 ? 0 : formFiles[to].position;
            let above_position = formFiles[to].position;
            if (to > from) {
                if (to === formFiles.length - 1) {
                    // last element so nothing above
                    above_position = formFiles.length + 1;
                } else {
                    // not last to taking element above
                    above_position = formFiles[to + 1].position;
                }
            }
            let newPosition = (below_position + above_position) / 2;

            // sending modification to server
            API.playlistChangeOrder(playlistId, { file_id: formFiles[from].id, position: newPosition })
                .then((res) => {
                    if (res.status == 200) {
                        form.values.files[from].position = newPosition;
                        resolve(true);
                    } else {
                        setNotification(true, `Error when changing order (${res.status})`);
                        resolve(false);
                    }
                })
                .catch((err) => {
                    setNotification(true, err.message);
                    resolve(false);
                });
        });
    };

    const handleDelete = (index) => {
        API.playlistRemoveFile(playlistId, { file_id: form.values.files[index].id })
            .then((res) => {
                if (res.status == 200) {
                    form.removeListItem('files', index);
                } else {
                    setNotification(true, `Error when changing order (${res.status})`);
                }
            })
            .catch((err) => {
                setNotification(true, err.message);
            });
    };

    const fields = form.values.files.map((_, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps} position="center">
                    <Center {...provided.dragHandleProps}>
                        <IconGripVertical size="1.2rem" />
                    </Center>
                    <Paper p="xs" radius="sm" shadow="sm" withBorder spacing="xs" style={{ width: '90%' }}>
                        <Flex direction="row" align="center" gap="lg" justify="flex-end">
                            <Image height={100} src={'/api/file/' + form.getInputProps(`files.${index}.id`).value} />
                            <Text>{form.getInputProps(`files.${index}.name`).value}</Text>
                            <NumberInput
                                required
                                hideControls
                                description="Seconds to display"
                                {...form.getInputProps(`files.${index}.seconds`)}
                            />
                            <ActionIcon color="red" variant="light" size="lg" onClick={() => handleDelete(index)}>
                                <IconTrash size="1rem" />
                            </ActionIcon>
                        </Flex>
                    </Paper>
                </Group>
            )}
        </Draggable>
    ));

    return (
        <Box mx="auto">
            <DragDropContext
                onDragEnd={({ destination, source }) => {
                    form.reorderListItem('files', { from: source.index, to: destination.index });
                    changePositionValue(source.index, destination.index).then((success) => {
                        if (!success) {
                            form.reorderListItem('files', { from: destination.index, to: source.index });
                        }
                    });
                }}
            >
                <StrictModeDroppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>

            <Group position="center" mt="md">
                <Button vairant="light" onClick={toggleFileSelector}>
                    Select File(s)
                </Button>
            </Group>
            <ModalFileSelector
                opened={fileSelector}
                multi
                handleClose={toggleFileSelector}
                handleSubmit={(files) => handleAddFiles(files)}
            />
        </Box>
    );
};

export default Content;
