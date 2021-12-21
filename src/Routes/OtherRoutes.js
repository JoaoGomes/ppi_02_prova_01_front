import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeCooperado from '../pages/Home/HomeCooperado';
import HomeEmpregado from '../pages/Home/HomeEmpregado';
import About from '../pages/About';
import Produtor from '../pages/Produtor';
import CreateProdutor from '../pages/CreateProdutor';
import DeletarProdutor from '../pages/DeletarProdutor';

import DeletarCusto from '../pages/DeletarCusto';
import DeletarProducao from '../pages/DeletarProducao';
import TesteCreateCusto from '../pages/TesteCreateCusto';
import TesteCreateProdutor from '../pages/TesteCreateProdutor';

import MostrarCustos from '../pages/MostrarCustos';
import MostrarProducao from '../pages/MostrarProducao';
import AdicionarProducao from '../pages/AdicionarProducao';
import MostrarCooperados from '../pages/MostrarCooperados';
import MostrarEmpregados from '../pages/Home/MostrarEmpregados';


const OtherRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login/cooperado" element={<HomeCooperado/>} />
                <Route path="/login/empregado" element={<HomeEmpregado/>} />
                <Route path="/perfil" element={<Produtor />} />
                <Route path="/about" element={<About/>} />
                <Route path="/producer" element={<Produtor/>} /> 

                <Route path="/deletar" element={<DeletarProdutor/>} />
                <Route path="/custo/deletar" element={<DeletarCusto/>} />

                <Route path="/producao/deletar" element={<DeletarProducao/>} />
                <Route path="/teste/create" element={<TesteCreateCusto />} />
                <Route path="/teste/create/produtor" element={<TesteCreateProdutor />} />

                <Route path="/custo/all" element={<MostrarCustos />} />
                <Route path="/producao/all" element={<MostrarProducao />} />
                <Route path="/producao/create" element={<AdicionarProducao/>} />
                <Route path="/produtores/cadastro" element={<MostrarCooperados />} />
                <Route path="/empregados/cadastro" element={<MostrarEmpregados />} />

            </Routes>
        </BrowserRouter>
    );
};

export default OtherRoutes;