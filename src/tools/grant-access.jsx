import { useAuth } from './auth-provider';
import Authentication from '../pages/auth';

export const Perm = {
    CREATE_ROLE: 0,
    CREATE_PLAYLIST: 1,
    VIEW_PLAYLIST: 2,
    OWN_PLAYLIST: 3,
    EDIT_PLAYLIST: 4,
};

const GrantAccess = ({ roles, children }) => {
    const { user } = useAuth();
    return roles.includes(user) ? children : null;
};

export const LoginRequired = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Authentication redirect={children} />;
    else return children;
};

export default GrantAccess;
