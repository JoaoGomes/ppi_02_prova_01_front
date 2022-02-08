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
            <h2>Produtor {localStorage.getItem(`@App:user`)}</h2>
            <br/>
            <button>Editar (inativo!)</button>
            <br/>
            <button onClick={handleLogout}>Logout</button>
            <br/>
            <Link to="/login/cooperado" className="btn mainMenuBtn" >Menu principal</Link>
        </div>
    );
}

export default Produtor;