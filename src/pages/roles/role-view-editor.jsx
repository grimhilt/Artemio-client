import { Button, TextInput, Group, Stack } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useEffect, useState } from 'react';
import setNotification from '../errors/error-notification';

const RoleViewEditor = ({ item, handler, buttonText, APICall }) => {
    const handleClose = (role) => {
        form.reset();
        handler(role);
    };

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: item?.name ?? '',
        },
        validate: {
            name: isNotEmpty('Name is required'),
        },
    });

    useEffect(() => {
        form.setFieldValue('name', item?.name);
        return () => {};
    }, [item]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            setIsLoading(true);
            if (item?.id) {
                const res = await APICall(item?.id, { name: form.values.name });
                handleClose(res.data);
            } else {
                const res = await APICall({ name: form.values.name });
                handleClose(res.data);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setNotification(true, err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} mb="sm" />
            todo parent id
            users
            <Group position="right" mt="md">
                <Button variant="light" color="red" onClick={() => handler()}>
                    Cancel
                </Button>
                <Button type="submit" variant="light" color="green" loading={isLoading}>
                    {buttonText}
                </Button>
            </Group>
        </form>
    );
};

export default RoleViewEditor;
