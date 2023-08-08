import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import setNotification from '../errors/error-notification';
import API from '../../services/api';

const RoleSelector = ({ label, value, setValue }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState();
    useEffect(() => {
        API.roles
            .search(search)
            .then((res) => {
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        const role = res.data[i];
                        if (!data.find((r) => r.id === role.id)) {
                            role.label = role.name;
                            role.value = role.id.toString();
                            setData((prev) => [...prev, role]);
                        }
                    }
                } else {
                    setNotification(true, res);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });
    }, [search]);

    // useEffect(() => {
    //     setData([
    //         { value: 'React', label: 'React' },
    //         { value: 'Angular', label: 'Angular' },
    //         { value: 'Svelte', label: 'Svelte' },
    //     ]);
    // }, []);

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
