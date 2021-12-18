import axios from 'axios';

function Delete(id){

    axios({
        url: 'http://localhost:3000/produtores/' + id,
        method: 'DELETE',
    })
    .then(res=>console.log(res));
    
}

export default Delete;