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
        axios.get('http://localhost:3333/unificado/producao/'+ localStorage.getItem(`@App:id`))
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
                    <td>{index+1}</td>
                    <td>{producaoatual.quantidade} litros</td>
                    <td>R$ {producaoatual.valor}</td>
                    <td>{producaoatual.status ? (<div>Pago</div>) : (<div style={{color: "red"}}>Não pago</div>)}</td>
                </tr>
            </tbody>
        ));
      }

      resumoProducao = (producoes) => {
        const totalQuantidade = producoes.reduce((total, item) => total = total + item.quantidade, 0);

        const totalValor =  producoes.reduce((total, item) => total = total + item.valor, 0);

        const mediaLeite = totalValor/totalQuantidade;

        return (
            <tbody>
                <tr>
                    <td>{producoes.length}</td>
                    <td>{totalQuantidade} litros</td>
                    <td>{totalQuantidade/producoes.length} litros/entrega</td>
                    <td>R$ {totalValor}</td>
                    <td>R$ {totalValor/producoes.length}/entrega</td>
                    <td>R$ {mediaLeite.toFixed(2)}/litro</td>
                </tr>
            </tbody>
        )
      }

    render() {
        return (
            <div>
            <h1>Produção</h1>
            <h2>{localStorage.getItem(`@App:user`)}</h2>
                <table className="table">
                    <thead className="thead-light">
                            <th>Item</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Status de Pagamento</th>
                    </thead>
                        {this.listaProducao(this.state.producoes)}
                </table>

                <h2>Balanço</h2>
                <table className="table">
                    <thead className="thead-light">
                            <th>Itens</th>
                            <th>Quantidade total</th>
                            <th>Média de produção</th>
                            <th>Receita total</th>
                            <th>Média de receita</th>
                            <th>Preço médio do leite</th>
                    </thead>
                        {this.resumoProducao(this.state.producoes)}
                </table>

            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}