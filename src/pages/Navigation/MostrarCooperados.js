import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class MostrarCooperados extends Component {
    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeSenha = this.onChangeSenha.bind(this);
        this.deleteCooperado = this.deleteCooperado.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            senha: '',
            produtores: [],
        }
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeSenha(e) {
        this.setState({
            senha: e.target.value
        });
    }

    deleteCooperado(id) {
        axios.delete('http://localhost:3333/produtores/'+id)
        .then(() => {
            this.updatePage();
        })
        .catch(() => { console.log("Erro ao deletar cooperado.")});
    
        this.setState({
          produtores: this.state.produtores.filter(el => el._id !== id)
        })
      }

    onSubmit(e) {
        e.preventDefault();
        const produtor = {
            nome: this.state.nome,
            senha: this.state.senha,
        }

        axios({
            url: 'http://localhost:3333/produtores/create',
            method: 'POST',
            data: produtor
        })
        .then(() => {
            this.updatePage();
            this.resetValues();
        })
        .catch(() => { console.log("Erro ao criar cooperado.")});

        this.setState({
            nome: '',
            senha: '',
        })
    }

    componentDidMount = () => {
        this.updatePage();
        this.resetValues();
    }

    updatePage = () => {
        axios.get('http://localhost:3333/produtores/all')
        .then(response => {
            if(response.data.length > 0){
                this.setState({ produtores: response.data
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    resetValues = () =>{
        this.setState({
            nome: '',
            senha: '',
          });
    }

    listaCooperados = (produtores) => {
        if(!produtores.length) return null;
        return produtores.map((produtoratual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{produtoratual.nome}</td>
                    <td>{produtoratual._id}</td>
                    <td><button>Editar (Não funcionando!)</button></td>
                    <td><button onClick={() => {this.deleteCooperado(produtoratual._id)}}>Deletar</button></td>
                </tr>
            </tbody>
        ));
      }

    render() {
        return (
            <div>
            <h1>Cooperados</h1>
            <h2>Cadastrar Novo Cooperado</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Nome: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Senha: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.senha}
                        onChange={this.onChangeSenha}
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Adicionar cooperado" className="btn btn-primary" />
                    </div>
                </form>

                <h2>Lista de cooperados</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nome</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                        {this.listaCooperados(this.state.produtores)}
                </table>


                <Link to="/login/Empregado">
                    <Button>
                        <p>Menu principal</p>
                    </Button>
                </Link>

            </div>
        )
    }
}