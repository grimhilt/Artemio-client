import { Card, Grid, Text, Button, Center } from '@mantine/core';
import { useState } from 'react';
import MediaPlayer from './media-player';

const SelectorItem = ({ file, clickHandler }) => {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
        clickHandler(file);
    };
    
    return (
        <Grid.Col span={1} key={file.id}>
            <Card shadow="sm">
                <Card.Section>
                    <MediaPlayer file={file} />
                </Card.Section>
                <Center>
                    <Text order={4} mt="md">
                        {file.name}
                    </Text>
                </Center>
                <Button mt="sm" color={selected ? 'red' : 'blue'} fullWidth variant="light" onClick={handleClick}>
                    {selected ? 'Unselect' : 'Select'}
                </Button>
            </Card>
        </Grid.Col>
    );
};

export default SelectorItem;
