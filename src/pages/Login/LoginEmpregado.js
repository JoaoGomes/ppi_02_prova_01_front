import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../componentes/context/Auth';

const initialState = {
    id: '',
    senha: '',
}

function reducer (state, {field, value}){
    return {
        ...state, 
        [field]: value
    }
}

function FormLoginEmpregado () {

    const context = useAuth();

    const [state, dispatch] = useReducer (reducer, initialState);
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    const {id, senha} = state;

    function handleSubmit (event) {
        event.preventDefault();
        context.Login(state);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}  className="form-box">
                <h1 className="form-title">Login - Empregados</h1>
                <label>Id
                    <input  type='text' name='id' defaultValue={id} onChange={onChange} />
                </label>
                <label>Senha: 
                    <input  type='password' name='senha' defaultValue={senha} onChange={onChange} />
                </label>
                <Link type="submit" onClick={handleSubmit} className="btn btn-success" to="/">
                    Acessar
                </Link>
            </form>
            <Link className="btn mainMenuBtn" to="/">Página inicial</Link>
        </div>
    );
};

export default FormLoginEmpregado;