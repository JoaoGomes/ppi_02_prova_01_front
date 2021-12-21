import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

const Custo = props => {
    <tr>
        <td>{props.custo.nome}</td>
        <td>{props.custo.valor}</td>
        <td>{props.custo.status}</td>
        <td>{props.custo.id_dono}</td>
  </tr>
}

export default class MostrarCustos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            custos: [],
        }
    }

    componentDidMount(){
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
            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>

            </div>
        )
    }
}