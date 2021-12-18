import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Producer from '../pages/Producer';
import Deletar from '../pages/Deletar';
import CreateProducer from '../pages/CreateProducer';

const OtherRoutes = () => {
    return (
        <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/producer" element={<Producer/>} /> 
                <Route path="/cadastro" element={<CreateProducer/>} />
                <Route path="/deletar" element={<Deletar/>} />
            </Routes>
        </div>
        </BrowserRouter>
    );
};

export default OtherRoutes;