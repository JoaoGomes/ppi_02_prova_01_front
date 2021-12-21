import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../componentes/context/Auth';

const HomeCooperado = () => {
    const { Logout } = useAuth();

    async function handleLogout() {
        Logout();
    }

    return (
        <div>
            <h1>Planilha de custos digitais - Cooperativa Santa Clara</h1>
            <container>
                <h2>Rotas - Cooperado</h2>
                <label><Link className="btn btn-success" to="/perfil">Perfil</Link></label><br/>
                <label><Link className="btn btn-success" to="/custo/all">Custos</Link></label><br/>
                <label><Link className="btn btn-success" to="/producao/all">Producão</Link></label><br/>
                <label><Link className="btn btn-success" to="/login/cooperado">Relatórios (inativo)</Link></label><br/>
                <h2>Logout</h2>
                <button onClick={handleLogout}>Logout</button>
            </container>
        </div>
    );
};

export default HomeCooperado;