import { Title, Group, Input, Paper } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const NavbarSignage = ({ data }) => {
    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <Group position="apart">
                <Title order={1}>{data.title}</Title>
                <Group>
                    <Input
                        placeholder="Search"
                        value={data.search}
                        onChange={(event) => data.handlerChange(event)}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    {data?.buttonCreate}
                </Group>
            </Group>
        </Paper>
    );
};

export default NavbarSignage;
