import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import moment from "moment";
import { Button } from 'react-bootstrap';

export default class AdicionarProducao extends Component {
    constructor(props) {
        super(props);

        this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeCooperado = this.onChangeCooperado.bind(this);
        this.deleteProducao = this.deleteProducao.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            nome: 'PRODUÇÃO',
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: '',
            id_cadastrador: localStorage.getItem(`@App:id`),
            credito: 'true',
            data: moment.utc().format(),
            producoes: [],
            produtores: []
        }
    }
    
    onChangeQuantidade(e) {
        this.setState({
            quantidade: e.target.value
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

    onChangeCooperado(e) {
        this.setState({
            id_dono: e.target.value
        });
    }


    deleteProducao(id) {
        axios.delete('http://localhost:3333/unificado/'+id)
        .then(() => {
            this.updatePage();
        })
        .catch(() => { console.log("Erro ao deletar produção.")});
    
        this.setState({
          custos: this.state.producoes.filter(el => el._id !== id)
        })
      }

    onSubmit(e) {
        e.preventDefault();
        const producao = {
            nome: this.state.nome,
            quantidade: this.state.quantidade,
            valor: this.state.valor,
            status: this.state.status,
            id_dono: this.state.id_dono,
            id_cadastrador: this.state.id_cadastrador,
            credito: this.state.credito,
            data: this.state.data,
        }

        axios({
            url: 'http://localhost:3333/unificado/create',
            method: 'POST',
            data: producao
        })
        .then(() => {
            this.updatePage();
            this.resetValues();
        })
        .catch(() => { console.log("Erro ao adicionar produção.")});

        this.setState({
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: ''
        })
    }

    componentDidMount = () => {
        this.updatePage();
        this.resetValues();
    }

    updatePage = () => {
        axios.get('http://localhost:3333/unificado/producao/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({ producoes: response.data
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    resetValues = () =>{
        this.setState({
            id_dono: '',
            quantidade: '',
            valor: '',
            status: 'false',
          });
    }

    listaProducao = (producoes) => {
        if(!producoes.length) return null;
        console.log(producoes);
        return producoes.map((producaoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{producaoatual.quantidade} litros</td>
                    <td>R$ {producaoatual.valor}</td>
                    <td>{producaoatual.status ? (<div>Pago</div>) : (<div  style={{color: "red"}}>Não pago</div>)}</td>
                    <td>{producaoatual.id_dono}</td>
                    <td><button>Editar (Não funcionando!)</button></td>
                    <td><button onClick={() => {this.deleteProducao(producaoatual._id)}}>Deletar</button></td>
                </tr>
            </tbody>
        ));
      }


      resumoProducao = (producoes) => {
        const totalQuantidade = producoes.reduce((total, item) => total = total + item.quantidade, 0);
        const totalValor =  producoes.reduce((total, item) => total = total + item.valor, 0);

        return (
            <tbody>
                <tr>
                    <td>{totalQuantidade} litros</td>
                    <td>R$ {totalValor}</td>
                </tr>
            </tbody>
        )
      }

    render() {
        return (
            <div>
            <h1>Produção</h1>
            <h2>Cadastrar Nova Produção</h2>
                <form onSubmit={this.onSubmit}>
                    <table className="table-cost">
                        <thead>
                            <th>Produtor</th>
                            <th>Quantidade (litros)</th>
                            <th>Valor (R$)</th>
                            <th>Pagamento</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input  type="text"
                                        required
                                        className="form-control"
                                        onChange={this.onChangeCooperado}
                                        />
                                </td>
                                <td>
                                    <input  type="text"
                                        required
                                        className="form-control"
                                        value={this.state.quantidade}
                                        onChange={this.onChangeQuantidade}
                                        />
                                </td>
                                <td>
                                    <input  type="number"
                                        required
                                        className="form-control"
                                        value={this.state.valor}
                                        onChange={this.onChangeValor}
                                        />
                                </td>
                                <td>
                                    <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                                        <option value="false">Não efetuado</option>
                                        <option value="true">Efetuado</option>
                                    </select>
                                </td>
                                <div className="form-group">
                                    <input type="submit" value="Adicionar produção" className="btn btn-primary" />
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <h2>Lista de Produções</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Status de Pagamento</th>
                            <th>Id do Produtor</th>
                        </tr>
                    </thead>
                        {this.listaProducao(this.state.producoes)}
                </table>

                <h2>Balanço</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Quantidade total </th>
                            <th>Valor total</th>
                        </tr>
                    </thead>
                        {this.resumoProducao(this.state.producoes)}
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