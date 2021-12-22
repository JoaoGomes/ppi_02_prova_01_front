import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class MostrarEmpregados extends Component {
    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeSenha = this.onChangeSenha.bind(this);
        this.deleteEmpregado = this.deleteEmpregado.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            senha: '',
            empregados: [],
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

    deleteEmpregado(id) {
        axios.delete('http://localhost:3333/empregados/'+id)
        .then(() => {
            this.updatePage();
        })
        .catch(() => { console.log("Erro ao deletar empregado.")});
    
        this.setState({
          empregados: this.state.empregados.filter(el => el._id !== id)
        })
      }

    onSubmit(e) {
        e.preventDefault();
        const empregado = {
            nome: this.state.nome,
            senha: this.state.senha,
        }

        axios({
            url: 'http://localhost:3333/empregados/create',
            method: 'POST',
            data: empregado
        })
        .then(() => {
            this.updatePage();
            this.resetValues();
        })
        .catch(() => { console.log("Erro ao criar empregado.")});

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
        axios.get('http://localhost:3333/empregados/all')
        .then(response => {
            if(response.data.length > 0){
                this.setState({ empregados: response.data
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

    listaEmpregados = (empregados) => {
        if(!empregados.length) return null;
        return empregados.map((empregadoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{empregadoatual.nome}</td>
                    <td>{empregadoatual._id}</td>
                    <td><button>Editar (Não funcionando!)</button></td>
                    <td><button onClick={() => {this.deleteEmpregado(empregadoatual._id)}}>Deletar</button></td>
                </tr>
            </tbody>
        ));
      }

    render() {
        return (
            <div>
            <h1>Empregados</h1>
            <h2>Cadastrar Novo Empregado</h2>
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
                    <input type="submit" value="Adicionar empregado" className="btn btn-primary" />
                    </div>
                </form>

                <h2>Lista de empregados</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nome</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                        {this.listaEmpregados(this.state.empregados)}
                </table>


            <Link to="/login/Empregado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}