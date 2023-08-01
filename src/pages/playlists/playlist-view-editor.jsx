import { Button, TextInput, Group } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useState } from 'react';

const PlaylistViewEditor = ({ item, handler, buttonText, APICall }) => {
    const handleClose = (playlist) => {
        form.reset();
        console.log('call jiezf');
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
            if (item) {
                await APICall(item?.id, { name: form.values.name });
                item.name = form.values.name;
                handleClose(item);
            } else {
                const res = await APICall({ name: form.values.name });
                handleClose(res.data);
            }
            setIsLoading(false);
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
