import { useAuth } from './auth-provider';

const GrantAccess = ({ roles, children }) => {
    const { role } = useAuth();
    return roles.includes(role) ? children : null;
};

export default GrantAccess;
