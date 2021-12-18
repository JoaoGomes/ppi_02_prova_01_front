import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';

const SignRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/Login" component={Login} />
            <Route path="/" component={Main} />
        </Routes>
        </BrowserRouter>
    );
};

export default SignRoutes;