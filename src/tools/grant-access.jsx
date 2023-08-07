import { useAuth } from './auth-provider';
import Authentication from '../pages/auth';

export const Perm = {
    CREATE_ROLE: 0,
    CREATE_PLAYLIST: 1,
    VIEW_PLAYLIST: 2,
    OWN_PLAYLIST: 3,
    EDIT_PLAYLIST: 4,
};

const checkPerm = (perm, user) => {
    console.log(user);
    switch (perm) {
        case Perm.CREATE_ROLE:
            return false;
        case Perm.CREATE_PLAYLIST:
            return user.roles.findIndex((role) => role.can_create_playlist) !== -1;
        default:
            return false;
    }
};

const GrantAccess = ({ role, roles, children }) => {
    const { user } = useAuth();
    if (role && checkPerm(role, user)) {
        return children;
    } else if (roles && roles.includes(user)) {
        return children;
    }
    return null;
};

export const LoginRequired = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Authentication redirect={children} />;
    else return children;
};

export default GrantAccess;
