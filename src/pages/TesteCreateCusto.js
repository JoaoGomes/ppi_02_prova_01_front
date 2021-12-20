import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';


export default class TesteCreate extends Component {
    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
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

    onSubmit(e) {
        e.preventDefault();
        const custo = {
            nome: this.state.nome,
            valor: this.state.valor,
            status: this.state.status,
            id_dono: this.state.id_dono,
        }

        axios({
            url: 'http://localhost:3333/custo/create',
            method: 'POST',
            data: custo
        })
        .then(res=>console.log(res.data));

        this.setState({
            nome: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
        })
    }

    render() {
        return (
            <div>
            <h3>Custos</h3>
            <h2>Cadastrar Novo Custo</h2>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                <label>Nome: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.nome}
                    onChange={this.onChangeNome}
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
                Pagamento:
                    <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                        <option value="false">Não efetuado</option>
                        <option value="true">Efetuado</option>
                    </select>
                </div>
                <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>

            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>

            </div>
        )
    }
}