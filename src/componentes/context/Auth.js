import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function Login(data) {
        setUser(localStorage.getItem('@App:user'));
        api.defaults.headers.Authorization = `Bearer ${localStorage.getItem('@App:token')}`;
    }

    function Logout() {
        setUser(null);
        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:accessToken');
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');
        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);


    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
};