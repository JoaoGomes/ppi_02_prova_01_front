import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeCooperado from '../Pages/Home/HomeCooperado';
import HomeEmpregado from '../Pages/Home/HomeEmpregado';
import Produtor from '../Pages/Navigation/PerfilProdutor';

import MostrarCustos from '../Pages/Navigation/MostrarCustos';
import EditarCustos from '../Pages/Navigation/EditarCustos';
import MostrarProducao from '../Pages/Navigation/MostrarProducao';
import AdicionarProducao from '../Pages/Navigation/AdicionarProducao';
import MostrarCooperados from '../Pages/Navigation/MostrarCooperados';
import MostrarEmpregados from '../Pages/Navigation/MostrarEmpregados';
import Relatorios from '../Pages/Navigation/Relatorios';


const OtherRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login/cooperado" element={<HomeCooperado/>} />
                <Route path="/login/empregado" element={<HomeEmpregado/>} />
                <Route path="/perfil" element={<Produtor />} />

                <Route path="/custo/all" element={<MostrarCustos />} />
                <Route path="/custo/editar" element={<EditarCustos />} />
                <Route path="/producao/all" element={<MostrarProducao />} />
                <Route path="/relatorios/all" element={<Relatorios />} />
                <Route path="/producao/create" element={<AdicionarProducao/>} />
                <Route path="/produtores/cadastro" element={<MostrarCooperados />} />
                <Route path="/empregados/cadastro" element={<MostrarEmpregados />} />
            </Routes>
        </BrowserRouter>
    );
};

export default OtherRoutes;