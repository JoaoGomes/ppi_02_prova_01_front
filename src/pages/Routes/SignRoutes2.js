import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About';
import Producer from '../Producer';
import Deletar from '../Deletar';
import CreateProducer from '../CreateProducer';

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