import React from 'react';
import { useAuth } from '../componentes/context/Auth';
//import SignRoutes from './OtherRoutes';
//import OtherRoutes from './SignRoutes2';
//     return signed ? <OtherRoutes /> : <SignRoutes /> ;

import SignRoutes from '../Rroutes/SignRoutes';


const WebRoutes = () => {
    const { signed } = useAuth();

    return <SignRoutes />;
};

export default WebRoutes;