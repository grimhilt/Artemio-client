import Layout from './components/layout';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { AuthProvider } from './tools/auth-provider';
import { Notifications } from '@mantine/notifications';
import { useColorSchemeToggle } from './tools/color-scheme-toggle'

const App = () => {
    const [ colorScheme, toggleColorScheme ] = useColorSchemeToggle();
    return (
        <>
            <AuthProvider>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
                        <Notifications />
                        <Layout />
                    </MantineProvider>
                </ColorSchemeProvider>
            </AuthProvider>
        </>
    );
};

export default App;
