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

//componentDidMount = () => {
//    this.getBlogPost();
//};

function reducer (state, {field, value}){
    return {
        ...state, 
        [field]: value
    }
}

function CreateCost () {
    const [state, dispatch] = useReducer (reducer, initialState);
    const [teste, setState] = useState();

    // const getBlogPost = () => {
    // axios({
    //     url: 'http://localhost:3333/custo/all',
    //     method: 'GET'
    // })
    // .then(res=>{
    //     setState({ posts: res.data});
    //     console.log(teste);})
    // .catch(()=>console.log("Problemas2"));
    // };

    // const displayBlogPost = (posts) => {
    //     if(!posts.length) return null;
    //     posts.map((post) => {
    //         <div>
    //             <h3>{post.nome}</h3>
    //             <p>{post.valor}</p>
    //         </div>
    //     })
    // }

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
        //setState(state => ({arrayvar: [...state.arrayvar, id_dono_atual]}));

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
                    Pago:
                    <input type='boolean' name='status' onChange={onChange}/>
                </label>

                <Link push to="/" className="btn btn-success" type="submit" onClick={handleSubmit} >
                    Adicionar
                </Link>

            </form>

            <div className='blogpost'>
                {/*this.displayBlogPost(this.state.posts)*/}
                <p>Temos que colocar algo aqui</p>
            </div>
            <Link to="/" className="btn mainMenuBtn" >Menu principal</Link>

        </div>
    );
};

export default CreateCost;