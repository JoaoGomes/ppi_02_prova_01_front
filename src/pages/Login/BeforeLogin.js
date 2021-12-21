import React from 'react';
import { Link } from 'react-router-dom';

const BeforeLogin = () => {

    return (
        <div>
            <h1>Planilha de custos digitais - Cooperativa Santa Clara</h1>
            <h2>Escolha seu login</h2>
            <label><Link className="btn btn-success" to="/login/cooperado">Login Cooperado</Link></label><br/>
            <label><Link className="btn btn-success" to="/login/empregado">Login Empregado</Link></label><br/>
        </div>
    );
};

export default BeforeLogin;