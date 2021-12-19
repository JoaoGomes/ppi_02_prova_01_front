import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../componentes/context/Auth';

const Home = () => {
    const { Logout } = useAuth();

    async function handleLogout() {
        Logout();
    }

    return (
        <div>
            <h1>Página inicial do sistema</h1>
            <h2>Planilha de custos digitais - Cooperativa Santa Clara</h2>
            <p>Botão de logout</p>
            <button onClick={handleLogout}>Logout</button>
            <p>Outras rotas</p>
            <label><Link className="btn btn-success" to="/cadastro">Adicionar produtor</Link></label><br/>
            <label><Link className="btn btn-success" to="/deletar">Remover produtor</Link></label><br/>
            <label><Link className="btn btn-success" to="/custo/create">Adicionar custo</Link></label><br/>
            <label><Link className="btn btn-success" to="/custo/deletar">Remover custo</Link></label><br/>
            <label><Link className="btn btn-success" to="/producao/create">Adicionar produção</Link></label><br/>
            <label><Link className="btn btn-success" to="/producao/deletar">Remover produção</Link></label><br/>
        </div>
    );
};

export default Home;