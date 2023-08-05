import { createContext, useState, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user'));

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth';
    API.logout();
};

const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthProvider, logout, useAuth };
