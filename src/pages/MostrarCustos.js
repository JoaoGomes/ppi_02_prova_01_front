import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class MostrarCustos extends Component {
    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.deleteCusto = this.deleteCusto.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            custos: [],
        }
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeValor(e) {
        this.setState({
            valor: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    deleteCusto(id) {
        axios.delete('http://localhost:3333/custo/'+id)
        .then(() => {
            this.updatePage();
        })
        .catch(() => { console.log("Erro ao deletar custo.")});
    
        this.setState({
          custos: this.state.custos.filter(el => el._id !== id)
        })
      }

    onSubmit(e) {
        e.preventDefault();
        const custo = {
            nome: this.state.nome,
            valor: this.state.valor,
            status: this.state.status,
            id_dono: this.state.id_dono,
        }

        axios({
            url: 'http://localhost:3333/custo/create',
            method: 'POST',
            data: custo
        })
        .then(() => {
            this.updatePage();
        })
        .catch(() => { console.log("Erro ao criar custo.")});

        this.setState({
            nome: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
        })
    }

    componentDidMount = () => {
        this.updatePage();
    }

    updatePage = () => {
        axios.get('http://localhost:3333/custo/all')
        .then(response => {
            if(response.data.length > 0){
                this.setState({ custos: response.data
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    listaCusto = (custos) => {
        if(!custos.length) return null;
        return custos.map((custoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{custoatual.nome}</td>
                    <td>{custoatual.valor}</td>
                    <td>{custoatual.status ? (<div>Pago</div>) : (<div>Não pago</div>)}</td>
                    <td><button>Editar (Não funcionando!)</button></td>
                    <td><button onClick={() => {this.deleteCusto(custoatual._id)}}>Deletar</button></td>
                </tr>
            </tbody>
        ));
      }

    render() {
        return (
            <div>
            <h3>Custos</h3>
            <h2>Lista de custos</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Status de Pagamento</th>
                        </tr>
                    </thead>
                        {this.listaCusto(this.state.custos)}
                </table>

            <h2>Cadastrar Novo Custo</h2>
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
                    <label>Valor: </label>
                    <input  type="number"
                        required
                        className="form-control"
                        value={this.state.valor}
                        onChange={this.onChangeValor}
                        />
                    </div>
                    <div className="form-group">
                    Pagamento:
                        <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                            <option value="false">Não efetuado</option>
                            <option value="true">Efetuado</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Adicionar custo" className="btn btn-primary" />
                    </div>
                </form>

            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}