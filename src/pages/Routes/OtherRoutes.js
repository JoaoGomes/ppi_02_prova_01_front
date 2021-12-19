import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';

const OtherRoutes =() => {
    return (
        <BrowserRouter>
            <Route path="/" element={<Home/>}/>
        </BrowserRouter>
    );
};

export default OtherRoutes;