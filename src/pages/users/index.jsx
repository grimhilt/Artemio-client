import { useEffect, useState } from 'react';
import NavbarSignage from '../../components/navbar';
import API from '../../services/api';
import setNotification from '../errors/error-notification';
import ModalCreateUser from './create';
import { Button } from '@mantine/core';
import GrantAccess, { Perm } from '../../tools/grant-access';
import UserTable from './users-table';

const Users = () => {
    const [showCreate, setShowCreate] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);

    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        API.listUsers()
            .then((res) => {
                if (res.status === 200) {
                    if (users.length === 0) setUsers(res.data);
                    else setUsers((prev) => [...prev, ...res.data]);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });
        API.listRoles()
            .then((res) => {
                if (res.status === 200) {
                    if (roles.length === 0) setRoles(res.data);
                    else setRoles((prev) => [...prev, ...res.data]);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [search, setSearch] = useState('');

    const addUser = (user) => {
        setUsers((prev) => [...prev, user]);
    };

    const navbar = {
        title: 'Users',
        search: search,
        handlerChange: (e) => setSearch(e.target.value),
        buttonCreate: (
            <GrantAccess role={Perm.CREATE_ROLE} children={<Button onClick={toggleModalCreate}>New User</Button>} />
        ),
    };

    return (
        <>
            <NavbarSignage data={navbar} />
            <UserTable
                data={users}
                // updateItem={setItem} // todo
                onDelete={(id) => setUsers(users.filter((item) => item.id != id))}
                updateHandler={toggleModalUpdate}
            />
            <ModalCreateUser opened={showCreate} handler={toggleModalCreate} addUser={(user) => addUser(user)} APICall={API.createUser} />
        </>
    );
};

export default Users;
