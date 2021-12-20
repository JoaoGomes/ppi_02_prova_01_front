import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import HomeCooperado from '../pages/Home/HomeCooperado';
import HomeEmpregado from '../pages/Home/HomeEmpregado';
import About from '../pages/About';
import Producer from '../pages/Producer';
import Deletar from '../pages/Deletar';
import CreateProducer from '../pages/CreateProducer';
import CreateCost from '../pages/CreateCost';
import DeletarCusto from '../pages/DeletarCusto';
import CreateProduction from '../pages/CreateProduction';
import DeletarProducao from '../pages/DeletarProducao';


const OtherRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login/cooperado" element={<HomeCooperado/>} />
                <Route path="/login/empregado" element={<HomeEmpregado/>} />
                <Route path="/perfil" element={<Producer />} />
                <Route path="/about" element={<About/>} />
                <Route path="/producer" element={<Producer/>} /> 
                <Route path="/cadastro" element={<CreateProducer/>} />
                <Route path="/deletar" element={<Deletar/>} />
                <Route path="/custo/create" element={<CreateCost/>} />
                <Route path="/custo/deletar" element={<DeletarCusto/>} />
                <Route path="/producao/create" element={<CreateProduction/>} />
                <Route path="/producao/deletar" element={<DeletarProducao/>} />

            </Routes>
        </BrowserRouter>
    );
};

export default OtherRoutes;