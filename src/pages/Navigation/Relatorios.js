import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class MostrarRelatorios extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            id_cadastrador: localStorage.getItem(`@App:id`),
            credito: '',
            data: '',
            unificados: [],
        }
    }

    updatePage = () => {
        console.log(moment.utc().format());
        var today = moment.utc().format();
        var priorDate = moment.utc().add(-30, 'days').format();
        console.log(priorDate);

        axios.get('http://localhost:3333/unificado/'+ localStorage.getItem(`@App:id`) +'/'+ moment.utc().add(-90, 'days').format() + '/'+ moment.utc().format())
        .then(response => {
            if(response.data.length > 0){
                this.setState({ unificados: response.data
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const unificado = {
            nome: this.state.nome,
            valor: this.state.valor,
            status: this.state.status,
            data: this.state.data,
            id_dono: this.state.id_dono,
        }

        this.setState({
            nome: '',
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            id_cadastrador: localStorage.getItem(`@App:id`),
            credito: '',
            data: '',
        })
    }

    componentDidMount = () => {
        this.updatePage();
    }

    listaUnificado = (unificados) => {
        if(!unificados.length) return null;
        return unificados.map((unificadoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{unificadoatual.nome}</td>
                    <td>{unificadoatual.credito ? (<div>{unificadoatual.valor}</div>) : (<div> - </div>)}</td>
                    <td>{unificadoatual.credito ? (<div> - </div>) : (<div>{unificadoatual.valor}</div>)}</td>
                    <td>{moment.utc(unificadoatual.data).format('DD/MM/YYYY')}</td>
                </tr>
            </tbody>
        ));
      }

      resumoUnificados = (unificados) => {
        const totalRecebido = unificados.reduce((total, item) => {
            if(item.credito)
                total = total + item.valor;
            return total;
        }, 0);

        const totalPago = unificados.reduce((total, item) => {
            if(!item.credito)
                total = total + item.valor;
            return total;
        }, 0);

        return (
            <tbody>
                <tr>
                    <td>{unificados.length}</td>
                    <td>{totalRecebido}</td>
                    <td>{-totalPago}</td>
                    <td>{totalRecebido - totalPago}</td>
                </tr>
            </tbody>
        )
      }

    render() {
        return (
            <div>
            <h1>Relatórios</h1>
            <h2>Selecione período do relatório</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <input type="submit" value="30 dias" className="btn btn-primary" />
                        <input type="submit" value="60 dias" className="btn btn-primary" />
                        <input type="submit" value="90 dias" className="btn btn-primary" />
                        <label>Período </label>
                        <input type="date"
                            required
                            className="form-control"
                            value={this.state.data}
                            onChange={this.onChangeData} />
                            <input type="date"
                            required
                            className="form-control"
                            value={this.state.data}
                            onChange={this.onChangeData} />
                    <input type="submit" value="Selecionar" className="btn btn-primary" />
                    </div>
                </form> 
                
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Evento</th>
                            <th>Crédito</th>
                            <th>Débito</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                        {this.listaUnificado(this.state.unificados)}
                </table>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Total</th>
                            <th>Crédito</th>
                            <th>Débito</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                        {this.resumoUnificados(this.state.unificados)}    
                </table>

                <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}