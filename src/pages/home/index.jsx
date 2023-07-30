import Logo from '../../assets/logo.png';
import { Avatar, Center, Text } from '@mantine/core';

const Home = () => (
    <>
        <Center mt="xl" mb="md">
            <Avatar src={Logo} size={300} />
        </Center>
        <Text align="center" fw={500} fz="xl">
            Configure playlist to display on remote display(s) !
        </Text>
    </>
);

export default Home;
