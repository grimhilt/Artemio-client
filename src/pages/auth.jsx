import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Container, Group, Button } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useAuth } from '../tools/auth-provider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import setNotification from './errors/error-notification';
import API from '../services/api';

const Authentication = ({ redirect }) => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (user) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const form = useForm({
        initialValues: {
            login: '',
            password: '',
            remember: false,
        },
        validate: {
            login: isNotEmpty('Login is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        setIsLoading(true);
        API.login(form.values)
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    if (redirect) {
                        setLoggedIn(true);
                    } else {
                        navigate('/');
                    }
                } else {
                    setNotification(true, res);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setNotification(true, err);
                setIsLoading(false);
            });
    };

    if (loggedIn) return redirect;

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Connect to signage
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleLogin}>
                    <TextInput label="Login" placeholder="Your login" {...form.getInputProps('login')} withAsterisk />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        {...form.getInputProps('password')}
                        withAsterisk
                    />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor size="sm" href="">
                            Forgot password(s)?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" type="submit" loading={isLoading}>
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Authentication;
