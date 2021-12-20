import React from 'react';
import { Link } from 'react-router-dom';

const BeforeLogin = () => {

    return (
        <div>
            <h1>Página inicial do sistema</h1>
            <h2>Planilha de custos digitais - Cooperativa Santa Clara</h2>
            <h3>Escolha seu login</h3>
            <label><Link className="btn btn-success" to="/login/cooperado">Login Cooperado</Link></label><br/>
            <label><Link className="btn btn-success" to="/login/empregado">Login Empregado</Link></label><br/>
        </div>
    );
};

export default BeforeLogin;