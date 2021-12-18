import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Producer from '../pages/Producer';
import UserFormReducer from './FormReducer'; 

// Foram introduzidas algumas modificações no 'react-router-dom'
// Switch foi substituido por Routes
// ver https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/producer" element={<Producer/>} /> 
                <Route path="/cadastro" element={<UserFormReducer/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default WebRoutes;