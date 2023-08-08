import Layout from './components/layout';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { AuthProvider } from './tools/auth-provider';
import { Notifications } from '@mantine/notifications';
import { useColorSchemeToggle } from './tools/color-scheme-toggle';
import { ModalsProvider } from '@mantine/modals';

const App = () => {
    const [colorScheme, toggleColorScheme] = useColorSchemeToggle();
    return (
        <>
            <AuthProvider>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <ModalsProvider>
                        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
                            <Notifications />
                            <Layout />
                        </MantineProvider>
                    </ModalsProvider>
                </ColorSchemeProvider>
            </AuthProvider>
        </>
    );
};
// todo theme for modal provider
export default App;
