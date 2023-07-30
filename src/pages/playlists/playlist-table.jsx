import { Button, Center, Table, Paper, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const PlaylistTable = (props) => {
    const navigate = useNavigate();

    const rows = props.data.map((playlist) => (
        <tr key={playlist.id}>
            <td>{playlist.name}</td>
            <td><Button onClick={() => navigate(`/playlist/${playlist.id}`)}>Open</Button></td>
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

export default PlaylistTable;
