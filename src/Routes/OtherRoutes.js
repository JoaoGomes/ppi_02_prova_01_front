import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import HomeCooperado from '../pages/Home/HomeCooperado';
import HomeEmpregado from '../pages/Home/HomeEmpregado';
import About from '../pages/About';
import Produtor from '../pages/Produtor';
import CreateProdutor from '../pages/CreateProdutor';
import DeletarProdutor from '../pages/DeletarProdutor';

import DeletarCusto from '../pages/DeletarCusto';
import CreateProducao from '../pages/CreateProducao';
import DeletarProducao from '../pages/DeletarProducao';
import TesteCreateCusto from '../pages/TesteCreateCusto';
import TesteCreateProdutor from '../pages/TesteCreateProdutor';

import MostrarCustos from '../pages/MostrarCustos';
import MostrarProducao from '../pages/MostrarProducao';


const OtherRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login/cooperado" element={<HomeCooperado/>} />
                <Route path="/login/empregado" element={<HomeEmpregado/>} />
                <Route path="/perfil" element={<Produtor />} />
                <Route path="/about" element={<About/>} />
                <Route path="/producer" element={<Produtor/>} /> 
                <Route path="/cadastro" element={<CreateProdutor/>} />
                <Route path="/deletar" element={<DeletarProdutor/>} />
                <Route path="/custo/deletar" element={<DeletarCusto/>} />
                <Route path="/producao/create" element={<CreateProducao/>} />
                <Route path="/producao/deletar" element={<DeletarProducao/>} />
                <Route path="/teste/create" element={<TesteCreateCusto />} />
                <Route path="/teste/create/produtor" element={<TesteCreateProdutor />} />

                <Route path="/custo/all" element={<MostrarCustos />} />
                <Route path="/producao/all" element={<MostrarProducao />} />

            </Routes>
        </BrowserRouter>
    );
};

export default OtherRoutes;