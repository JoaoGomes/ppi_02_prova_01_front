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
            <h1>Página inicial do sistema</h1>
            <h2>Planilha de custos digitais - Cooperativa Santa Clara</h2>
            <p>Botão de logout</p>
            <button onClick={handleLogout}>Logout</button>
            <p>Rotas - Cooperado</p>
            <label><Link className="btn btn-success" to="/perfil">Perfil</Link></label><br/>
            <label><Link className="btn btn-success" to="/custo/create">Adicionar custo</Link></label><br/>
            <label><Link className="btn btn-success" to="/custo/deletar">Remover custo</Link></label><br/>
            <label><Link className="btn btn-success" to="/login/cooperado">Producão (inativo)</Link></label><br/>
            <label><Link className="btn btn-success" to="/login/cooperado">Relatórios (inativo)</Link></label><br/>
            <label><Link className="btn btn-success" to="/teste/create">TESTE CREATE</Link></label><br/>
            <label><Link className="btn btn-success" to="/teste/create/produtor">TESTE Produtor</Link></label><br/>
            <label><Link className="btn btn-success" to="/custo/all">TESTE Mostrar Custos</Link></label><br/>
        </div>
    );
};

export default HomeCooperado;