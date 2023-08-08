import { Button, Group, Modal, Stack, PasswordInput, Switch, Text, TextInput, Paper } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useState } from 'react';
import { Perm, checkPerm } from '../../tools/grant-access';
import { useAuth } from '../../tools/auth-provider';
import setNotification from '../errors/error-notification';

const ModalCreateUser = ({ opened, handler, addUser, APICall, item }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const handleClose = (item) => {
        if (item) {
            addUser(item);
        }
        handler();
    };

    const form = useForm({
        initialValues: {
            login: '',
            password: '',
            create_user: false,
            create_role: false,
            create_playlist: false,
        },
        validate: {
            login: isNotEmpty('Login is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            setIsLoading(true);
            if (item) {
                // await APICall(item?.id, { name: form.values.name });
                // item.name = form.values.name;
                handleClose(item);
            } else {
                let data = { login: form.values.login, password: form.values.password };
                data.permissions = 0;
                if (form.values.create_user) data.permissions += 1;
                if (form.values.create_role) data.permissions += 2;
                if (form.values.create_playlist) data.permissions += 4;
                const res = await APICall(data);
                handleClose(res.data);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setNotification(true, err);
        }
    };

    // todo parent role

    return (
        <Modal.Root opened={opened} onClose={handler}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Create User
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing="sm">
                            <Paper>
                                <TextInput
                                    label="Login"
                                    placeholder="User's login"
                                    {...form.getInputProps('login')}
                                    withAsterisk
                                />
                                <PasswordInput
                                    label="Password"
                                    placeholder="User's password"
                                    mt="md"
                                    {...form.getInputProps('password')}
                                    withAsterisk
                                />
                            </Paper>
                            <Paper withBorder shadow="xs" p="md">
                                <Stack spacing="sm">
                                    <Switch
                                        label="Create user"
                                        disabled={checkPerm(Perm.CREATE_USER, user)}
                                        {...form.getInputProps('create_user')}
                                    />
                                    <Switch
                                        label="Create role"
                                        disabled={checkPerm(Perm.CREATE_ROLE, user)}
                                        {...form.getInputProps('create_role')}
                                    />
                                    <Switch
                                        label="Create playlist"
                                        disabled={checkPerm(Perm.CREATE_PLAYLIST, user)}
                                        {...form.getInputProps('create_playlist')}
                                    />
                                </Stack>
                            </Paper>
                        </Stack>

                        <Group position="right" mt="md">
                            <Button variant="light" color="red" onClick={handler}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="light" color="green" loading={isLoading}>
                                Create
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreateUser;
