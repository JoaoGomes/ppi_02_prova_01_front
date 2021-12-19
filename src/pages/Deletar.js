import React, {useReducer} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
}

function reducer (state, {field, value}){
    return {
        ...state, 
        [field]: value
    }
}

function Deletar () {
    const [state, dispatch] = useReducer (reducer, initialState);
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    const {id} = state;

    function handleSubmit (event) {
        event.preventDefault();
        axios({
            url: 'http://localhost:3333/produtores/' + id,
            method: 'DELETE',
        })
        .then(res=>console.log(res));
    }

    return (
        <div>
            <form className="form-title">
                REMOÇÃO DE CIDADE
            </form>
            <form onSubmit={handleSubmit} className="form-box">
                <label>Id: 
                    <input  type='text' name='id' defaultValue={id} onChange={onChange} />
                </label>
                <Link type="submit" onClick={handleSubmit} className="btn btn-success" push to="/">
                    Deletar
                </Link>
            </form>
            <Link className="btn mainMenuBtn" to="/">Menu principal</Link>
        </div>
    );
};

export default Deletar;