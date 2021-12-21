import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class MostrarProducao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            producoes: [],
        }
    }

    componentDidMount = () => {
        this.updatePage();
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

    listaProducao = (producoes) => {
        if(!producoes.length) return null;
        return producoes.map((producaoatual, index) => (
            <tbody key={index}>
                <tr>
                    <td>{producaoatual.quantidade}</td>
                    <td>{producaoatual.valor}</td>
                    <td>{producaoatual.status ? (<div>Pago</div>) : (<div>Não pago</div>)}</td>
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
                    <td>{totalQuantidade}</td>
                    <td>{totalValor}</td>
                </tr>
            </tbody>
        )
      }

    render() {
        return (
            <div>
            <h3>Custos</h3>
            <h2>Lista de custos</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Status de Pagamento</th>
                        </tr>
                    </thead>
                        {this.listaProducao(this.state.producoes)}
                </table>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Quantidade total</th>
                            <th>Valor total</th>
                        </tr>
                    </thead>
                        {this.resumoProducao(this.state.producoes)}
                </table>

            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}