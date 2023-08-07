import { Button, Paper, Text, Title, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { parseTime } from '../../tools/timeUtil';
import setNotification from '../errors/error-notification';
import ModalUpdate from '../playlists/update';
import { useForm } from '@mantine/form';
import Content from './content';
import { useNavigate } from 'react-router-dom';

const Playlist = (item) => {
    const id = window.location.href.split('/').slice(-1)[0];
    const [playlist, setPlaylist] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const toggleUpdate = () => setShowUpdate(!showUpdate);

    const toggleActivate = () => {
        setIsLoading(true);
        (isActive ? API.disactivate : API.activate)(id)
            .then((res) => {
                if (res.status === 200) {
                    setIsActive(!isActive);
                    setNotification(false, `Playlist currently ${isActive ? 'inactive' : 'active'}`);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setNotification(true, err);
                setIsLoading(false);
            });
    };

    const form = useForm({
        initialValues: {
            files: [],
        },
    });

    useEffect(() => {
        let duration = form.values.files.reduce((acc, file) => {
            acc += file.seconds;
            return acc;
        }, 0);
        setDuration(duration);
    }, [form.values]);

    const updatePlaylist = (playlist) => {
        setPlaylist(playlist);
    };

    useEffect(() => {
        if (JSON.stringify(item) !== '{}') {
            setPlaylist(item);
        } else {
            API.getPlaylist(id)
                .then((res) => {
                    if (res.status === 200) {
                        setPlaylist(res.data);
                        form.setFieldValue('files', res.data.files);
                    }
                })
                .catch((err) => {
                    setNotification(true, err);
                    if (err.response.status === 404) {
                        navigate('/playlists');
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <Group position="apart" mt="md">
                <Title m="md" order={2}>
                    {playlist?.name}
                </Title>
                <Text>
                    Playlist duration:{' '}
                    <Text span fw={700}>
                        {parseTime(duration)}
                    </Text>
                </Text>
                <Group>
                    <Button
                        variant="light"
                        mt="sm"
                        color={isActive ? 'red' : 'green'}
                        onClick={toggleActivate}
                        loading={isLoading}
                    >
                        {isActive ? 'Stop' : 'Activate'}
                    </Button>
                    <Button variant="light" mt="sm" onClick={toggleUpdate}>
                        Edit
                    </Button>
                </Group>
            </Group>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Content form={form} playlistId={id} />
            </Paper>
            <ModalUpdate
                opened={showUpdate}
                handler={toggleUpdate}
                item={playlist}
                updatePlaylist={(playlist) => updatePlaylist(playlist)}
            />
        </>
    );
};

export default Playlist;
