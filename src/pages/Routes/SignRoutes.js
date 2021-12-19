import { BrowserRouter, Route } from "react-router-dom";
import Login from "../Login/Login";

const SignRoutes = () => {
    return(
        <BrowserRouter>
            <Route path="/" element={<Login/>}/>
        </BrowserRouter>
    );
};

export default SignRoutes;