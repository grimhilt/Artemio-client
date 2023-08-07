import Logo from '../assets/logo.png';
import { Avatar, createStyles, Header, Group, rem, UnstyledButton, Title, ActionIcon, Tooltip } from '@mantine/core';
import SwitchToggle from './toggle-colorscheme';
import { IconUserCheck, IconUserOff } from '@tabler/icons-react';
import { logout, useAuth } from '../tools/auth-provider';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

const links = [
    { label: 'Playlists', link: '/playlists' },
    { label: 'Files', link: '/files' },
    { label: 'Planning', link: '/planning' },
];

const HeaderSearch = () => {
    const { classes } = useStyles();
    const { user } = useAuth();
    const navigate = useNavigate();

    const items = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.link} onClick={() => navigate(link.link)}>
            <Title order={4}>{link.label}</Title>
        </UnstyledButton>
    ));

    return (
        <Header height={56} className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Avatar src={Logo} size={30} />
                    <UnstyledButton onClick={() => navigate('/')} className={classes.link}>
                        <Title order={1}>Signage</Title>
                    </UnstyledButton>
                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <SwitchToggle />
                    <Tooltip label={user ? 'Logout' : 'Connect'} withArrow>
                        <ActionIcon variant="light" size="lg" onClick={logout}>
                            {user ? (
                                <IconUserCheck size="1.2rem" stroke={1.5} />
                            ) : (
                                <IconUserOff size="1.2rem" stroke={1.5} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </div>
        </Header>
    );
};

export default HeaderSearch;
