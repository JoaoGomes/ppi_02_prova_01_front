import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

async function Access_user(data){
    
    // Necessário uso de try-catch para caso senha informada seja errada
    try{
        await axios({
            url: 'http://localhost:3333/login',
            method: 'POST',
            data: data
        })
        .then(res=>{
            localStorage.setItem('@App:user', JSON.stringify(res.data.user));
            localStorage.setItem('@App:accessToken', res.data.accessToken);
                
            api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
        });
    } catch (error){ 
        console.log(error)
    }

}

export default Access_user;