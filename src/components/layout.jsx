import { AppShell } from '@mantine/core';
import HeaderSearch from './header';
import AppRouter from './app-router';
import { BrowserRouter } from 'react-router-dom';

const Layout = () => {
    return (
        <BrowserRouter>
            <AppShell mx="md" header={<HeaderSearch />}>
                <AppRouter />
            </AppShell>
        </BrowserRouter>
    );
};

export default Layout;
