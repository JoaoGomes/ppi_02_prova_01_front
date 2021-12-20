import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

const Custo = props =>{
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
                .catch((error) => {
                    console.log(error);
                })
            }
        })
    }

    listaCusto() {
        return this.state.custos.map(custoatual => {
          return <Custo custo={custoatual} key={custoatual._id}/>;
        })
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
                    <tbody>
                        { this.listaCusto() }
                    </tbody>
                </table>
            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>

            </div>
        )
    }
}