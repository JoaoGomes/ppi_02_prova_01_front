import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'react-bootstrap';

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
                    <td>{unificadoatual.credito ? (<div>R$ {unificadoatual.valor}</div>) : (<div  style={{textAlign: "center"}}> - </div>)}</td>
                    <td>{unificadoatual.credito ? (<div  style={{textAlign: "center"}}> - </div>) : (<div  style={{color: "red"}}>R$ -{unificadoatual.valor}</div>)}</td>
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

        const totalFinal = totalRecebido - totalPago;

        return (
            <tbody>
                <tr>
                    <td>{unificados.length}</td>
                    <td>R$ {totalRecebido}</td>
                    <td>{totalPago === 0 ? (<p>R$ {totalPago}</p>) : (<p  style={{color: "red"}}>R$ -{totalPago}</p>)}</td>
                    <td>{totalFinal > -0.01 ? (<p>R$ {totalFinal}</p>) : (<p  style={{color: "red"}}>R$ {totalFinal}</p>)}</td>
                </tr>
            </tbody>
        )
      }

    render() {
        return (
            <div>
            <h1>Relatórios</h1>
            <h2>Selecione período do relatório</h2>
            <div>
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
                    <button onClick={(e) => this.updatePage(moment.utc().diff(moment((document.getElementById('tempo1').value), 'YYYY_MM_DD'), 'days'), 
                                                            moment.utc().diff(moment((document.getElementById('tempo2').value), 'YYYY_MM_DD'), 'days'))}>
                        Selecionar</button>
                    </div>
                </form> 
            </div>

            <h2>Listagem de eventos</h2>
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <th>Evento</th>
                        <th>Crédito</th>
                        <th>Débito</th>
                        <th>Data</th>
                    </thead>
                        {this.listaUnificado(this.state.unificados)}
                </table>

                <h2>Balanço</h2>
                <table className="table">
                    <thead className="thead-light">
                        <th>Total</th>
                        <th>Crédito</th>
                        <th>Débito</th>
                        <th>Balanço</th>
                    </thead>
                        {this.resumoUnificados(this.state.unificados)}    
                </table>

                <div>
                <Link to="/login/Cooperado">
                    <Button>
                        <p>Menu principal</p>
                    </Button>
                </Link>
                </div>
            </div>
            </div>
        )
    }
}