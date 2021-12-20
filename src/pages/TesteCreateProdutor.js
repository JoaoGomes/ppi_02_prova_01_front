import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class TesteCreateProdutor extends Component {
    constructor(props, context) {
        super(props, context);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeSenha = this.onChangeSenha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            senha: '',
        }
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeSenha(e) {
        this.setState({
            senha: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const produtor = {
            nome: this.state.nome,
            senha: this.state.senha,
        }

        console.log(produtor);

        axios({
            url: 'http://localhost:3333/create',
            method: 'POST',
            data: produtor
        })
        .then(res=>console.log(res.data));

        this.setState({
            nome: '',
            senha: '' 
        })
    }

    render() {
        return (
            <div>
                <h3>Create New Produtor Log</h3>
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
                    <label>Senha: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.senha}
                        onChange={this.onChangeSenha}
                        />
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