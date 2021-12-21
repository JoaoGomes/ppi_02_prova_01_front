import axios from "axios";
import React, { Component, useRef } from "react";
import { Link } from 'react-router-dom';

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
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: '',
            producoes: [],
            nome: '',
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
        axios.delete('http://localhost:3333/producao/'+id)
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
            quantidade: this.state.quantidade,
            valor: this.state.valor,
            status: this.state.status,
            id_dono: this.state.id_dono,
        }

        axios({
            url: 'http://localhost:3333/producao/create',
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
        axios.get('http://localhost:3333/produtores/all')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              produtores: response.data.map(produtor => produtor.nome),
              nome: response.data[0].nome
            }) 
          }
        })
        .catch((error) => {
          console.log(error);
        })
        this.updatePage();
        this.resetValues();
    }

    updatePage = () => {
        axios.get('http://localhost:3333/producao/all')
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
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: '',
          });
    }

    listaProducao = (producoes) => {
        if(!producoes.length) return null;
        return producoes.map((producaoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{producaoatual.quantidade}</td>
                    <td>{producaoatual.valor}</td>
                    <td>{producaoatual.status ? (<div>Pago</div>) : (<div>Não pago</div>)}</td>
                    <td>{producaoatual.id_dono}</td>
                    <td><button>Editar (Não funcionando!)</button></td>
                    <td><button onClick={() => {this.deleteProducao(producaoatual._id)}}>Deletar</button></td>
                </tr>
            </tbody>
        ));
      }

    render() {
        return (
            <div>
            <h1>Produção</h1>
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

            <h2>Cadastrar Nova Produção</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Produtor: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        DefaultValue={this.state.id_dono}
                        onChange={this.onChangeCooperado}
                        />
                    </div>

                    <div className="form-group"> 
                    <label>Quantidade: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.quantidade}
                        onChange={this.onChangeQuantidade}
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
                    <label>Pagamento: </label>
                        <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                            <option value="false">Não efetuado</option>
                            <option value="true">Efetuado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Adicionar produção" className="btn btn-primary" />
                    </div>
                </form>

            <Link to="/login/Empregado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}