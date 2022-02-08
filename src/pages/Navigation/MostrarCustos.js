import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import '../../Componentes/Styles/table.styles.css';

export default class MostrarCustos extends Component {
    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.deleteCusto = this.deleteCusto.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            quantidade: '1',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            id_cadastrador: localStorage.getItem(`@App:id`),
            credito: 'false',
            data: '',
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

    onChangeData(e) {
        this.setState({
            data: e.target.value
        });
    }

    deleteCusto(id) {
        axios.delete('http://localhost:3333/unificado/'+id)
        .then(() => {
            this.updatePage();
        })
        .catch(() => { console.log("Erro ao deletar custo.")});
    
        this.setState({
          custos: this.state.custos.filter(el => el._id !== id)
        })
      }

    editaCusto(id) {
        axios.delete('http://localhost:3333/unificado/'+id)
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
            data: custo
        })
        .then(() => {
            this.updatePage();
            this.resetValues();
        })
        .catch(() => { console.log("Erro ao criar custo.")});

        this.setState({
            nome: '',
            quantidade: '1',
            valor: '',
            status: 'false',
            id_dono: JSON.parse(localStorage.getItem(`@App:id`)),
            id_cadastrador: JSON.parse(localStorage.getItem(`@App:id`)),
            credito: 'false',
            data: '',
        })
    }

    componentDidMount = () => {
        this.updatePage();
        this.resetValues();
    }

    updatePage = () => {
        axios.get('http://localhost:3333/unificado/custo/'+ localStorage.getItem(`@App:id`))
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

    resetValues = () =>{
        this.setState({
            nome: '',
            valor: '',
            status: 'false',
            data: '',
            id_dono: localStorage.getItem(`@App:id`),
          });
    }

    listaCusto = (custos) => {
        if(!custos.length) return null;
        return custos.map((custoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{custoatual.nome}</td>
                    <td>R$ {custoatual.valor}</td>
                    <td>{moment.utc(custoatual.data).format('DD/MM/YYYY')}</td>
                    <td>{custoatual.status ? (<div>Pago</div>) : (<div style={{color: "red"}}>Não pago</div>)}</td>
                    <td><button onClick={() => {this.deleteCusto(custoatual._id)}}>Deletar</button></td>
                </tr>
            </tbody>
        ));
      }

      resumoCustos = (custos) => {
        const totalPago = custos.reduce((total, item) => {
            if(item.status)
                total = total + item.valor;
            return total;
        }, 0);

        const totalNaoPago = custos.reduce((total, item) => {
            if(!item.status)
                total = total + item.valor;
            return total;
        }, 0);

        return (
            <tbody>
                <tr>
                    <td>{custos.length}</td>
                    <td>R$ {totalPago}</td>
                    <td style={{color: "red"}}>R$ -{totalNaoPago}</td>
                    <td>R$ {totalPago+totalNaoPago}</td>
                </tr>
            </tbody>
        )
      }

    render() {
        return (
            <div>
            <h1>Custos</h1>
            <h2>Lista de custos</h2>
                <table className="table">
                    <thead className="thead-light">
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Status de Pagamento</th>
                    </thead>
                        {this.listaCusto(this.state.custos)}
                </table>

            <h2>Balanço</h2>
                <table className="table">
                    <thead className="thead-light">
                        <th>Total de itens</th>
                        <th>Valores pagos</th>
                        <th>Valores não pagos</th>
                        <th>Total de custos</th>
                    </thead>
                        {this.resumoCustos(this.state.custos)}    
                </table>

            <h2>Cadastrar Novo Custo</h2>
                <form onSubmit={this.onSubmit}>
                    <table className="table-cost">
                        <thead>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Pagamento</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.nome}
                                        onChange={this.onChangeNome} />
                                </td>
                                <td>
                                    <input type="number"
                                        required
                                        className="form-control"
                                        value={this.state.valor}
                                        onChange={this.onChangeValor} />
                                </td>
                                <td>
                                    <input type="date"
                                        required
                                        className="form-control"
                                        placeholder="dd-mm-yyyy"
                                        value={this.state.data}
                                        onChange={this.onChangeData} />
                                </td>
                                <td>
                                    <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                                        <option value="false">Não efetuado</option>
                                        <option value="true">Efetuado</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="submit" value="Adicionar custo" className="btn btn-primary" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <div>
                <Link to="/login/Cooperado">
                    <Button>
                        <p>Menu principal</p>
                    </Button>
                </Link>
                </div>

            </div>
        )
    }
}