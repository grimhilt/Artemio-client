import { Button, TextInput, Group } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useState } from 'react';

const PlaylistViewEditor = ({ item, handler, buttonText, APICall }) => {
    const handleClose = (playlist) => {
        form.reset();
        handler(playlist);
    };

    const [isLoading, setIsLoading] = useState(false);
    console.log(item);
    // todo permissions
    const form = useForm({
        initialValues: {
            name: item?.name ?? '',
        },
        validate: {
            name: isNotEmpty('Name is required'),
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            setIsLoading(true);
            const res = await APICall(item?.id, { name: form.values.name });
            setIsLoading(false);
            item.name = form.values.name;
            handleClose(item);
        } catch (error) {
            setIsLoading(false);
            // todo
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} mb="sm" />
            <Group position="right" mt="md">
                <Button variant="light" color="red" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="light" color="green" loading={isLoading}>
                    {buttonText}
                </Button>
            </Group>
        </form>
    );
};

export default PlaylistViewEditor;
