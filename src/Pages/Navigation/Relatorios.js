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

    updatePage = (tempo1, tempo2) => {
        axios.get('http://localhost:3333/unificado/'+ localStorage.getItem(`@App:id`) 
                                                    + '/' + moment.utc().add(-tempo1, 'days').format() 
                                                    + '/' + moment.utc().add(-tempo2, 'days').format())
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
    }

    componentDidMount = () => {
        this.updatePage(0,0);
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
                        <button onClick={(e) => this.updatePage(30,0)}>30 dias</button>
                        <button onClick={(e) => this.updatePage(60,0)}>60 dias</button>
                        <button onClick={(e) => this.updatePage(90,0)}>90 dias</button>
                    </div>
                    <div>
                        <label>Período </label>
                        <input type="date"
                            className="form-control"
                            id='tempo1' />
                        <input type="date"
                            className="form-control"
                            id='tempo2' />
                    </div>
                    <div className="form-group">
                    <button onClick={(e) => this.updatePage(moment.utc().diff(moment((document.getElementById('tempo1').value), 'YYYY_MM_DD'), 'days'), 
                                                            moment.utc().diff(moment((document.getElementById('tempo2').value), 'YYYY_MM_DD'), 'days'))}>
                        Selecionar</button>
                    
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