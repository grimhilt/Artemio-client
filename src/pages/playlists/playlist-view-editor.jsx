import { Button, TextInput, Group, Stack } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useEffect, useState } from 'react';
import setNotification from '../errors/error-notification';
import RoleSelector from './role-selector';

const PlaylistViewEditor = ({ item, handler, buttonText, APICall }) => {
    const handleClose = (playlist) => {
        form.reset();
        handler(playlist);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [rolesView, setRolesView] = useState(item?.view.map((role) => role.id.toString()) ?? []);
    const [rolesEdit, setRolesEdit] = useState(item?.edit.map((role) => role.id.toString()) ?? []);

    useEffect(() => {
        if (item) {
            setRolesView(item?.view.map((role) => role.id.toString()) ?? []);
            setRolesEdit(item?.edit.map((role) => role.id.toString()) ?? []);
        }
        return () => {};
    }, [item]);

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
                // todo permissions update
                item.name = form.values.name;
                handleClose(item);
            } else {
                const view = rolesView.map((roleId) => parseInt(roleId));
                const edit = rolesEdit.map((roleId) => parseInt(roleId));
                const res = await APICall({ name: form.values.name, view: view, edit: edit });
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
            <Stack>
                <RoleSelector
                    defaultRoles={item?.view}
                    label="View Permission"
                    value={rolesView}
                    setValue={setRolesView}
                />
                <RoleSelector
                    defaultRoles={item?.edit}
                    label="Edit Permission"
                    value={rolesEdit}
                    setValue={setRolesEdit}
                />
            </Stack>
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
