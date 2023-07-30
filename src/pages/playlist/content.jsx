import { Box } from '@mantine/core';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { StrictModeDroppable } from './StrictModeDroppable';
import { ActionIcon, Button, Center, Grid, Group, NumberInput, Paper, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import ModalFileSelector from '../files/file-selector';

const Content = ({ form }) => {
    console.log(form.values);

    const [fileSelector, setFileSelector] = useState(true);
    const toggleFileSelector = () => setFileSelector(!fileSelector);

    const handleAddFiles = (files) => {
        files.forEach((file) => {
            file.seconds = 10;
            form.insertListItem('files', file);
        });
    };

    const handleDelete = (fileId) => {
        console.log(form.values);
        const index = form.values.files.findIndex((file) => file.id === fileId);
        console.log(index, fileId);
        if (index) {
            form.removeListItem('files', index);
        }
    };

    const fields = form.values.files.map((el, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided) => (
                <Center>
                    <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                        <Center {...provided.dragHandleProps}>
                            <IconGripVertical size="1.2rem" />
                        </Center>
                        <Paper p="xs" radius="sm" shadow="sm" withBorder spacing="xs">
                            <Grid columns={10}>
                                <Grid.Col span={4}>
                                    <Text>{form.getInputProps(`files.${index}.name`).value}</Text>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <NumberInput
                                        required
                                        hideControls
                                        description="Seconds to display"
                                        {...form.getInputProps(`files.${index}.seconds`)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <ActionIcon
                                        color="red"
                                        variant="light"
                                        size="lg"
                                        onClick={() => handleDelete(el.id)}
                                    >
                                        <IconTrash size="1rem" />
                                    </ActionIcon>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Group>
                </Center>
            )}
        </Draggable>
    ));

    return (
        <Box mx="auto">
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    form.reorderListItem('files', { from: source.index, to: destination.index })
                }
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
