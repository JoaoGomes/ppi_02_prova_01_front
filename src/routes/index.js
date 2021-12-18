import React from 'react';
import { useAuth } from '../componentes/context/Auth';
import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const WebRoutes = () => {
    const { signed } = useAuth();

    return signed ? <OtherRoutes /> : <SignRoutes /> ;
};

export default WebRoutes;