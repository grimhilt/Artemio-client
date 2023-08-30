import { Card, Grid, Text, Image, Button, Center } from '@mantine/core';
import { useState } from 'react';

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
                    <Image
                        src={"/api/files/"+file.id}
                        alt={file.name}
                        height={100}
                        fit="cover"
                        radius="md"
                        withPlaceholder
                    />
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
