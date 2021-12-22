import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Componentes/Context/Auth';

const HomeEmpregado = () => {
    const { Logout } = useAuth();

    async function handleLogout() {
        Logout();
    }

    return (
        <div>
            <h1>Planilha de custos digitais - Cooperativa Santa Clara</h1>
                <h2>Rotas - Empregado</h2>
                <label><Link className="btn btn-success" to="/producao/create">Produção</Link></label><br/>
                <label><Link className="btn btn-success" to="/produtores/cadastro">Cooperados</Link></label><br/>
                <label><Link className="btn btn-success" to="/empregados/cadastro">Empregados</Link></label><br/>
                <h2>Logout</h2>
                <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomeEmpregado;