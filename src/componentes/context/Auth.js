import { useState, createContext, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function Login(data) {
        const response = await api.post('/login', {
            id: data.id, senha: data.senha
        });
        console.log(response);
        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

        localStorage.setItem('@App:user', JSON.stringify(response.data.user));
        localStorage.setItem('@App:id', JSON.stringify(response.data.id));
        localStorage.setItem('@App:accessToken', response.data.accessToken);

        //setUser(localStorage.getItem('@App:user'));
        //api.defaults.headers.Authorization = `Bearer ${localStorage.getItem('@App:token')}`;
    }

    function Logout() {
        setUser(null);
        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:id');
        localStorage.removeItem('@App:accessToken');
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedId = localStorage.getItem('@App:id');
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