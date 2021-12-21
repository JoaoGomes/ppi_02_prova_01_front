import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class CreateProducao extends Component {
    constructor(props) {
        super(props);

        this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            producoes: [],
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
        })
        .catch(() => { console.log("Erro ao criar custo.")});

        this.setState({
            quantidade: '',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
        })
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

    render() {
        return (
            <div>
            <h3>Produção</h3>
                <h2>Cadastrar Nova Produção</h2>
                <form onSubmit={this.onSubmit}>
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
                    Pagamento:
                        <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                            <option value="false">Não efetuado</option>
                            <option value="true">Efetuado</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Adicionar produção" className="btn btn-primary" />
                    </div>
                </form>

            <Link to="/login/Cooperado" className="btn mainMenuBtn" >Menu principal</Link>
            </div>
        )
    }
}