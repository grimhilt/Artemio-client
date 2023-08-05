import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user'));

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth';
};

const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthProvider, logout, useAuth };
