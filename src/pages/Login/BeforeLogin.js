import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BeforeLogin = () => {

    return (
        <div>
            <h1>Planilha de custos digitais - Cooperativa Santa Clara</h1>
            <h2>Escolha seu login</h2>
            <label>
                <Link to="/login/Cooperado">
                    <Button>
                        <p>Login Cooperado</p>
                    </Button>
                </Link>
            </label>
            <label>
                <Link to="/login/Empregado">
                    <Button>
                        <p>Login Empregado</p>
                    </Button>
                </Link>
            </label><br/>
        </div>
    );
};

export default BeforeLogin;