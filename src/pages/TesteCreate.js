import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class TesteCreate extends Component {
    constructor(props, context) {
        super(props, context);

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

    componentDidMount(){
        axios.get('http://localhost:3333/custo/all')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    custos: response.data.map(custo => custo.nome)
                })
            }
        })
        /*
            this.setState({
            custos: ['test cost'],
            nome: "test cost" 
        })*/
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
            <h3>Create New Cost Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                <label>Nome: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.nome}
                    onChange={this.onChangeNome}>
                    {
                        this.state.custos.map(function(custo) {
                        return <option 
                            key={custo}
                            value={custo}>{custo}
                            </option>;
                        })
                    }
                </select>
                </div>
                <div className="form-group"> 
                <label>Valor: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.valor}
                    onChange={this.onChangeValor}
                    />
                </div>
                <div className="form-group">
                <label>Status:  </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
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