import { Button, Group, Modal, Stack, PasswordInput, Switch, Text, TextInput, Paper } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useState } from 'react';
import { Perm, checkPerm } from '../../tools/grant-access';
import { useAuth } from '../../tools/auth-provider';
import setNotification from '../errors/error-notification';
import { useEffect } from 'react';

const ModalUserEditor = ({ opened, handlerClose, handler, APICall, name, item }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const handleFinish = (e) => {
        if (e) {
            handler(e);
        }
        form.reset()
        handlerClose();
    };

    const form = useForm({
        initialValues: {
            login: item?.login ?? '',
            password: item?.password ?? '',
            create_user: checkPerm(Perm.CREATE_USER, item),
            create_role: checkPerm(Perm.CREATE_ROLE, item),
            create_playlist: checkPerm(Perm.CREATE_PLAYLIST, item),
        },
        validate: {
            login: isNotEmpty('Login is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    useEffect(() => {
        if (item) {
            form.setFieldValue('login', item?.login ?? '');
            form.setFieldValue('password', item?.password ?? '');
            form.setFieldValue('create_user', checkPerm(Perm.CREATE_USER, item));
            form.setFieldValue('create_role', checkPerm(Perm.CREATE_ROLE, item));
            form.setFieldValue('create_playlist', checkPerm(Perm.CREATE_PLAYLIST, item));
        }
        return () => {};
        // eslint-disable-next-line
    }, [item]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            setIsLoading(true);
            if (item) {
                // await APICall(item?.id, { name: form.values.name });
                // item.name = form.values.name;
                handleFinish(item);
            } else {
                let data = { login: form.values.login, password: form.values.password };
                data.permissions = 0;
                if (form.values.create_user) data.permissions += 1;
                if (form.values.create_role) data.permissions += 2;
                if (form.values.create_playlist) data.permissions += 4;
                const res = await APICall(data);
                handleFinish(res.data);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setNotification(true, err);
        }
    };

    // todo parent role

    return (
        <Modal.Root opened={opened} onClose={handlerClose}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            {name} User
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
                                        disabled={!checkPerm(Perm.CREATE_USER, user)}
                                        checked={form.getInputProps('create_user').value}
                                        onChange={(e) => form.setFieldValue('create_user', e.target.checked)}
                                    />
                                    <Switch
                                        label="Create role"
                                        disabled={!checkPerm(Perm.CREATE_ROLE, user)}
                                        checked={form.getInputProps('create_role').value}
                                        onChange={(e) => form.setFieldValue('create_role', e.target.checked)}
                                    />
                                    <Switch
                                        label="Create playlist"
                                        disabled={!checkPerm(Perm.CREATE_PLAYLIST, user)}
                                        checked={form.getInputProps('create_playlist').value}
                                        onChange={(e) => form.setFieldValue('create_playlist', e.target.checked)}
                                    />
                                </Stack>
                            </Paper>
                        </Stack>

                        <Group position="right" mt="md">
                            <Button variant="light" color="red" onClick={handlerClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="light" color="green" loading={isLoading}>
                                {name}
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalUserEditor;
