import { Box, Image, Flex } from '@mantine/core';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { StrictModeDroppable } from './StrictModeDroppable';
import { ActionIcon, Button, Center, Group, NumberInput, Paper, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ModalFileSelector from '../files/file-selector';
import API from '../../services/api';
import setNotification from '../errors/error-notification';
import { Perm, checkPerm } from '../../tools/grant-access';
import { useAuth } from '../../tools/auth-provider';
import { parseTime } from '../../tools/timeUtil';
import MediaPlayer from '../../components/media-player';
import { isVideo } from '../../tools/fileUtil';

const DEFAULT_FILE_TIME = 2;

const Content = ({ form, playlistId, playlist }) => {
    const [fileSelector, setFileSelector] = useState(false);
    const toggleFileSelector = () => setFileSelector(!fileSelector);
    const [canEdit, setCanEdit] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !playlist) return;
        const canEditTmp = checkPerm(Perm.EDIT_PLAYLIST, user, playlist);
        if (canEditTmp !== canEdit) {
            setCanEdit(canEditTmp);
        }
        return () => {};
        // eslint-disable-next-line
    }, [playlist, user]);

    const handleAddFiles = (files) => {
        let formFiles = form.values.files;
        let max_position = formFiles[formFiles.length - 1]?.position ?? 0;
        files.forEach((file) => {
            max_position++;

            file.position = max_position;
            file.seconds = DEFAULT_FILE_TIME;
            const index = form.values.files.length;
            form.insertListItem('files', file);
            API.playlists
                .addFile(playlistId, { position: file.position, file_id: file.id, seconds: file.seconds })
                .then((res) => {
                    if (res.status !== 200) {
                        setNotification(true, `Error when adding file (${res.status})`);
                    }
                })
                .catch((err) => {
                    console.log('here');
                    form.removeListItem('files', index);
                    setNotification(true, err);
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
            API.playlists
                .changeOrder(playlistId, { pfid: formFiles[from].pfid, position: newPosition })
                .then((res) => {
                    if (res.status === 200) {
                        resolve(true);
                    } else {
                        setNotification(true, `Error when changing order (${res.status})`);
                        resolve(false);
                    }
                })
                .catch((err) => {
                    setNotification(true, err);
                    resolve(false);
                });
        });
    };

    const [timeout, setTimeout2] = useState();
    const [originSecs, setOriginSecs] = useState();
    const handleChangeSeconds = (seconds, index) => {
        if (!originSecs) setOriginSecs(form.values.files[index].seconds);
        changeSecsForm(seconds, index);
        if (timeout) clearTimeout(timeout);
        setTimeout2(setTimeout(() => changeSeconds(seconds, index), 1000));
    };

    const changeSecsForm = (seconds, index) => {
        form.setFieldValue(
            form.values.files.map((file, i) => {
                if (index === i) {
                    file.seconds = seconds;
                    return seconds;
                } else {
                    return file;
                }
            })
        );
    };

    const changeSeconds = (seconds, index) => {
        const filePfid = form.values.files[index].pfid;
        API.playlists
            .changeSeconds(playlistId, { pfid: filePfid, seconds: seconds })
            .then((res) => {
                if (res.status === 200) {
                    setOriginSecs();
                } else {
                    setNotification(true, `Error when changing seconds (${res.status})`);
                    changeSecsForm(originSecs, index);
                }
            })
            .catch((err) => {
                setNotification(true, err);
                changeSecsForm(originSecs, index);
            });
    };

    const handleDelete = (index) => {
        API.playlists
            .removeFile(playlistId, {
                pfid: form.values.files[index].pfid,
            })
            .then((res) => {
                if (res.status === 200) {
                    form.removeListItem('files', index);
                } else {
                    setNotification(true, `Error when changing order (${res.status})`);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });
    };

    const fields = form.values.files.map((_, index) =>
        canEdit ? (
            <Draggable key={index} index={index} draggableId={index.toString()}>
                {(provided) => (
                    <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps} position="center">
                        <Paper p="xs" radius="sm" shadow="sm" withBorder spacing="xs" style={{ width: '90%' }}>
                            <Flex direction="row" align="center" gap="lg" justify="flex-end">
                                <Text>{form.getInputProps(`files.${index}.name`).value}</Text>
                                <MediaPlayer file={form.getInputProps(`files.${index}`).value} />
                                <NumberInput
                                    required
                                    {...(isVideo(form.getInputProps(`files.${index}.type`).value)
                                        ? {
                                              disabled: true,
                                              value: 0,
                                              description: 'Default to video duration',
                                          }
                                        : {
                                              value: form.getInputProps(`files.${index}.seconds`).value,
                                              onChange: (secs) => handleChangeSeconds(secs, index),
                                          })}
                                    hideControls
                                    label="Seconds to display"
                                    error={
                                        form.getInputProps(`files.${index}.seconds`).errors && 'This field is required'
                                    }
                                />
                                <ActionIcon color="red" variant="light" size="lg" onClick={() => handleDelete(index)}>
                                    <IconTrash size="1rem" />
                                </ActionIcon>
                            </Flex>
                        </Paper>
                        <Center {...provided.dragHandleProps}>
                            <IconGripVertical size="1.2rem" />
                        </Center>
                    </Group>
                )}
            </Draggable>
        ) : (
            <Group key={index} mt="xs" position="center">
                <Paper p="xs" radius="sm" shadow="sm" withBorder spacing="xs" style={{ width: '90%' }}>
                    <Flex direction="row" align="center" gap="lg" justify="flex-end">
                        <Text>{form.getInputProps(`files.${index}.name`).value}</Text>
                        <MediaPlayer file={form.getInputProps(`files.${index}`).value} />
                        <Text>Display time: {parseTime(form.getInputProps(`files.${index}.seconds`).value)}</Text>
                    </Flex>
                </Paper>
            </Group>
        )
    );

    return (
        <Box mx="auto" maw={1200}>
            {canEdit ? (
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
            ) : (
                fields
            )}

            {canEdit ? (
                <>
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
                </>
            ) : (
                <></>
            )}
        </Box>
    );
};

export default Content;
