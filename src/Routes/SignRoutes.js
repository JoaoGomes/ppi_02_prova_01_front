import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginCooperado from '../pages/Login/LoginCooperado';
import LoginEmpregado from '../pages/Login/LoginEmpregado';
import BeforeLogin from '../pages/Login/BeforeLogin';

const SignRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BeforeLogin />} />
                <Route path="/login/cooperado" element={<LoginCooperado />} />
                <Route path="/login/empregado" element={<LoginEmpregado />} />
            </Routes>
        </BrowserRouter>
    );
};

export default SignRoutes;