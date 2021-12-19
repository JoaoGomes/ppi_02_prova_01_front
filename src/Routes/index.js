import React, { useContext } from 'react';
import { useAuth } from '../componentes/context/Auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const Rotas = () => {
    const { signed } = useAuth();
    return signed ? <OtherRoutes/> : <SignRoutes />;
};

export default Rotas;