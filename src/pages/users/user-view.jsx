import { Paper, Stack, Checkbox, Text } from '@mantine/core';
import { Perm, checkPerm } from '../../tools/grant-access';

const UserView = ({ user }) => {
    return (
        <Stack spacing="sm">
            <Paper>
                <Text>{user?.login}</Text>
            </Paper>
            <Paper withBorder shadow="xs" p="md">
                <Stack spacing="sm">
                    <Checkbox label="Create user" checked={!checkPerm(Perm.CREATE_USER, user)} />
                    <Checkbox label="Create role" checked={!checkPerm(Perm.CREATE_ROLE, user)} />
                    <Checkbox label="Create playlist" checked={!checkPerm(Perm.CREATE_PLAYLIST, user)}/>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default UserView;
