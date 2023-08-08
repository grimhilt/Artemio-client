import { Button, Center, Table, Paper, ScrollArea, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const UserTable = (props) => {
    const rows = props.data.map((user) => (
        <tr key={user.id}>
            <td>{user.login}</td>
            <td>
                <Group>
                    <Button onClick={() => 1} color="green">View</Button>
                    <Button onClick={() => 1}>Update</Button>
                    <Button onClick={() => 1} color="red">Delete</Button>
                </Group>
            </td>
        </tr>
    ));

    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <ScrollArea.Autosize mah={700} offsetScrollbars>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
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
