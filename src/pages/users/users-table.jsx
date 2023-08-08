import { Button, Center, Table, Paper, ScrollArea, Group, Text } from '@mantine/core';
import { useState } from 'react';
import setNotification from '../errors/error-notification';
import API from '../../services/api';
import { modals } from '@mantine/modals';

const OpenConfirmationModal = (action) =>
    modals.openConfirmModal({
        title: 'Please confirm your action',
        children: <Text size="sm">Are you sure you want to delete this user ?</Text>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => {},
        onConfirm: () => action(),
    });

const Line = ({ user, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const deleteUser = () => {
        setIsLoading(true);
        API.deleteUser(user.id)
            .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    props.deleteUser(user.id);
                } else {
                    setNotification(true, res);
                }
            })
            .catch((err) => {
                setNotification(true, err);
                setIsLoading(false);
            });
    };
    return (
        <tr>
            <td>{user.login}</td>
            <td>
                <Group position="right">
                    <Button onClick={() => 1} color="green">
                        View
                    </Button>
                    <Button onClick={() => props.updateItem(user)}>Update</Button>
                    <Button onClick={() => OpenConfirmationModal(deleteUser)} color="red" loading={isLoading}>
                        Delete
                    </Button>
                </Group>
            </td>
        </tr>
    );
};

const UserTable = (props) => {
    const rows = props.data.map((user) => (
        <Line key={user.id} user={user} deleteUser={props.deleteUser} updateItem={props.updateItem} />
    ));

    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <ScrollArea.Autosize mah={700} offsetScrollbars>
                <Table>
                    <thead>
                        <tr>
                            <th>Login</th>
                            <th position="right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea.Autosize>
            <Center>
                <Button onClick={props.loadMore} mt="md">
                    Load More
                </Button>
            </Center>
        </Paper>
    );
};

export default UserTable;
