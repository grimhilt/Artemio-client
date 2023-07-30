import { Switch, Group, useMantineTheme, createStyles } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useColorSchemeToggle } from '../tools/color-scheme-toggle'

const useStyles = createStyles((theme) => ({
    group: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
}));

const SwitchToggle = () => {
    const { classes } = useStyles();
    const [ colorScheme, toggleColorScheme ] = useColorSchemeToggle();

    const theme = useMantineTheme()

    return (
        <Group position="center" my={30} className={classes.group}>
            <Switch
                checked={colorScheme === 'dark'}
                onChange={toggleColorScheme}
                size="lg"
                onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
                offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
            />
        </Group>
    );
};

export default SwitchToggle;
