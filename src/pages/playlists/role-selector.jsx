import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import setNotification from '../errors/error-notification';
import API from '../../services/api';

const RoleSelector = ({ defaultRoles, label, value, setValue }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState();

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

    // creatable
    // getCreateLabel={(query) => `+ Create ${query}`}
    // onCreate={(query) => {
    //   const item = { value: query, label: query };
    //   setData((current) => [...current, item]);
    //   return item;
    // }}
    return (
        <MultiSelect
            label={label}
            data={data}
            searchable
            searchValue={search}
            onSearchChange={setSearch}
            value={value}
            onChange={setValue}
            maxDropdownHeight={160}
        />
    );
};

export default RoleSelector;
