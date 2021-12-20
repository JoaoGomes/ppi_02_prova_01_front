import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    nome: '',
    senha: '',
}

function reducer (state, {field, value}){
    return {
        ...state, 
        [field]: value
    }
}

function CreateProdutor () {
    const [state, dispatch] = useReducer (reducer, initialState);
    
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    const {nome, senha} = state;

    function handleSubmit (event) {
        
        event.preventDefault();
        console.log(state);
        axios({
            url: 'http://localhost:3333/create',
            method: 'POST',
            data: state
        })
        .then(res=>console.log(res));
        event.target.reset();
    }

    return (
        <div>
            <form className="form-title">
                    REGISTRO DE PRODUTOR
            </form>
            <form onSubmit={handleSubmit} className="form-box">
                <label>
                    Nome: 
                    <input  type='text' name='nome' defaultValue={nome} onChange={onChange} />
                </label>
                <label>
                    Senha:
                    <input type='password' name='senha' defautlValue={senha} onChange={onChange} />
                </label>

                <Link push to="/" className="btn btn-success" type="submit" onClick={handleSubmit} >
                    Adicionar
                </Link>

            </form>
            <Link to="/login/empregado" className="btn mainMenuBtn" >Menu principal</Link>
        </div>
    );
};

export default CreateProdutor;