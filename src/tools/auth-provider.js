import { createContext, useState, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return;
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromStorage());

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
    API.logout();
};

const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthProvider, logout, useAuth };
