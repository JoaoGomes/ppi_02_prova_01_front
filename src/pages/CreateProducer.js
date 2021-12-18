import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { ToastContainer, toast, Slide } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


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

function CreateProducer () {
    const [state, dispatch] = useReducer (reducer, initialState);
    //const history = useNavigate();
    //const notify = () => toast("Wow so easy!");
    
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    const {nome, senha} = state;

    function handleSubmit (event) {
        
        event.preventDefault();
        console.log(state);
        axios({
            url: 'http://localhost:3000/create',
            method: 'POST',
            data: state
        })
        .then(res=>console.log(res));
        event.target.reset();
    }

    return (
        <div>
            <form className="form-title">
                    REGISTRO DO PRODUTOR
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
            <Link to="/" className="btn mainMenuBtn" >Menu principal</Link>
        </div>
    );
};

export default CreateProducer;