import { useAuth } from './auth-provider';

const GrantAccess = ({ roles, children }) => {
    const { user } = useAuth();
    return roles.includes(user) ? children : null;
};

export default GrantAccess;
