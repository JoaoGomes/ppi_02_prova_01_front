import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginCooperado from '../Pages/Login/LoginCooperado';
import LoginEmpregado from '../Pages/Login/LoginEmpregado';
import BeforeLogin from '../Pages/Login/BeforeLogin';

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