import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const setNotification = (fail, message) => {
    if (typeof message === 'object') {
        message = message?.data?.message ?? message?.response?.data?.message ?? message.message ?? 'Error';
    }
    notifications.show({
        title: fail ? 'Error' : 'Success',
        message: message ?? 'Something went wrong',
        color: fail ? 'red' : 'green',
        icon: fail ? <IconX size="1.1rem" /> : <IconCheck size="1.1rem" />,
        autoClose: 5000,
    });
};

export default setNotification;
