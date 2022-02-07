import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Componentes/Context/Auth';


function Produtor() {
    const { Logout } = useAuth();

    async function handleLogout() {
        Logout();
    }

    return (
        <div>
            <h1>Perfil do usuário</h1>
            <h2>{localStorage.getItem(`@App:user`)}</h2>
            <p>Botão de logout</p>
            <button onClick={handleLogout}>Logout</button>
            <button>Editar</button>
            <Link to="/login/cooperado" className="btn mainMenuBtn" >Menu principal</Link>
        </div>
    );
}

export default Produtor;