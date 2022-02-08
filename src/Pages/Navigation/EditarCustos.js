import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../Componentes/Styles/table.styles.css';

export default class EditarCusto extends Component {
    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.deleteCusto = this.deleteCusto.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            quantidade: '1',
            valor: '',
            status: 'false',
            id_dono: localStorage.getItem(`@App:id`),
            id_cadastrador: localStorage.getItem(`@App:id`),
            credito: 'false',
            data: '',
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

    onChangeData(e) {
        this.setState({
            data: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const custo = {
            nome: this.state.nome,
            quantidade: this.state.quantidade,
            valor: this.state.valor,
            status: this.state.status,
            id_dono: this.state.id_dono,
            id_cadastrador: this.state.id_cadastrador,
            credito: this.state.credito,
            data: this.state.data,
        }

        axios({
            url: 'http://localhost:3333/unificado/edit',
            method: 'POST',
            data: custo
        })
        .catch(() => { console.log("Erro ao editar custo.")});

        this.setState({
            nome: '',
            quantidade: '1',
            valor: '',
            status: 'false',
            id_dono: JSON.parse(localStorage.getItem(`@App:id`)),
            id_cadastrador: JSON.parse(localStorage.getItem(`@App:id`)),
            credito: 'false',
            data: '',
        })
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div>
            <h1>Editar custo</h1>
                <form onSubmit={this.onSubmit}>
                    <table className="table-cost">
                        <thead>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Pagamento</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.nome}
                                        onChange={this.onChangeNome} />
                                </td>
                                <td>
                                    <input type="number"
                                        required
                                        className="form-control"
                                        value={this.state.valor}
                                        onChange={this.onChangeValor} />
                                </td>
                                <td>
                                    <input type="date"
                                        required
                                        className="form-control"
                                        placeholder="dd-mm-yyyy"
                                        value={this.state.data}
                                        onChange={this.onChangeData} />
                                </td>
                                <td>
                                    <select className="status" name='status' defaultValue={false} onChange={this.onChangeStatus}>
                                        <option value="false">Não efetuado</option>
                                        <option value="true">Efetuado</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="submit" value="Editar custo" className="btn btn-primary" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <div>
                <Link to="/login/Cooperado">
                    <Button>
                        <p>Menu principal</p>
                    </Button>
                </Link>
                </div>

            </div>
        )
    }
}