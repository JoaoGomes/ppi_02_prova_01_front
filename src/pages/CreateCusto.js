import React, { useReducer, useState, componentDidMount } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const id_dono_atual = JSON.parse(localStorage.getItem(`@App:id`));
console.log(`Id do dono: ${id_dono_atual}`);

const initialState = {
    nome: '',
    valor: '',
    status: 'false',
    id_dono: localStorage.getItem(`@App:id`),
}

function reducer (state, {field, value}){
    return {
        ...state, 
        [field]: value
    }
}

function CreateCost () {
    const [state, dispatch] = useReducer (reducer, initialState);
    const [teste, setState] = useState();

    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    const {nome, valor, status} = state;

    function handleSubmit (event) {
        event.preventDefault();
        event.onUpdateItem = () =>{
            this.setState(state => {
                const finalState = state.id_dono.map((id_dono) =>{
                    return id_dono_atual;
                })
            })
        };

        console.log(`Estado atual: ${state.id_dono}`);
        axios({
            url: 'http://localhost:3333/custo/create',
            method: 'POST',
            data: state
        })
        .then(res=>console.log(res));
    }

    return (
        <div>
            <form className="form-title">
                REGISTRO DE CUSTO
            </form>
            <form onSubmit={handleSubmit} className="form-box">
                <label>
                    Nome: 
                    <input  type='text' name='nome' defaultValue={nome} onChange={onChange} />
                </label>
                <label>
                    Valor:
                    <input type='number' name='valor' defaultValue={valor} onChange={onChange} />
                </label>
                <label>
                    Pagamento:
                    <select className="status" name='status' defaultValue={false} onChange={onChange}>
                        <option value="false">Não efetuado</option>
                        <option value="true">Efetuado</option>
                    </select>

                </label>

                <Link push to="/" className="btn btn-success" type="submit" onClick={handleSubmit} >
                    Adicionar
                </Link>

            </form>

            <div className='blogpost'>
                {/*this.displayBlogPost(this.state.posts)*/}
                <p>Temos que colocar algo aqui</p>
            </div>
            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>

        </div>
    );
};

export default CreateCost;