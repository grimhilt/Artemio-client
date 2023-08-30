import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import setNotification from '../errors/error-notification';
import API from '../../services/api';
import { Perm, checkPerm } from '../../tools/grant-access';
import { useAuth } from '../../tools/auth-provider';
import ModalCreateRole from './create';

const RoleSelector = ({ defaultRoles, label, value, setValue }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState();
    const [showCreateRole, setShowCreateRole] = useState(false);
    const toggleCreateRole = () => setShowCreateRole(!showCreateRole);
    const [query, setQuery] = useState('');

    const { user } = useAuth();
    const canCreateRole = checkPerm(Perm.CREATE_ROLE, user);

    const addRoles = (roles) => {
        if (!roles) return;
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            if (!data.find((r) => r.id === role.id)) {
                role.label = role.name;
                role.value = role.id.toString();
                setData((prev) => [...prev, role]);
            }
        }
    };

    useEffect(() => {
        API.roles
            .search(search)
            .then((res) => {
                if (res.status === 200) {
                    addRoles(res.data);
                } else {
                    setNotification(true, res);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });
        // eslint-disable-next-line
    }, [search]);

    useEffect(() => {
        addRoles(defaultRoles);
        // eslint-disable-next-line
    }, [defaultRoles]);

    return (
        <>
            <MultiSelect
                label={label}
                data={data}
                searchable
                searchValue={search}
                onSearchChange={setSearch}
                value={value}
                onChange={setValue}
                maxDropdownHeight={160}
                creatable={canCreateRole}
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                    setQuery(query);
                    setShowCreateRole(true);
                }}
            />
            {canCreateRole && (
                <ModalCreateRole
                    opened={showCreateRole}
                    item={{ name: query }}
                    addRole={(role) => addRoles([role])}
                    handler={toggleCreateRole}
                />
            )}
        </>
    );
};

export default RoleSelector;
