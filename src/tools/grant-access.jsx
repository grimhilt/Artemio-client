import { useAuth } from './auth-provider';
import Authentication from '../pages/auth';
import { useEffect } from 'react';

export const Perm = {
    CREATE_ROLE: 0,
    CREATE_PLAYLIST: 1,
    VIEW_PLAYLIST: 2,
    OWN_PLAYLIST: 3,
    EDIT_PLAYLIST: 4,
    ACTIVATE_PLAYLIST: 5,
};

const checkPerm = (perm, user, item = {}) => {
    console.log(user);
    console.log(item);
    switch (perm) {
        case Perm.CREATE_ROLE:
            return false;
        case Perm.CREATE_PLAYLIST:
            return user.roles.findIndex((role) => role.can_create_playlist) !== -1;
        case Perm.OWN_PLAYLIST:
            return item?.owner_id === user.id;
        default:
            return false;
    }
};

const GrantAccess = ({ role, roles, children, item }) => {
    const { user } = useAuth();
    if (role && checkPerm(role, user, item)) {
        return children;
    } else if (roles) {
        let flag = false;
        let i = 0;
        while (!flag && i < roles.length) {
            if (checkPerm(roles[i], user, item)) {
                flag = true;
            }
            i++;
        }
        if (flag) return children;
    }
    return null;
};

export const LoginRequired = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Authentication redirect={children} />;
    else return children;
};

export default GrantAccess;
