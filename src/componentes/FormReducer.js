import React, { useReducer } from 'react';

const initialState = {
    name: '',
    password: ''
}

function reducer (state, {field, value}) {
    return {
        ...state,
        [field]: value
    }
}

function UserFormReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }
    const { name, password } = state;

    function handleSubmit (event) {
        event.preventDefault();
        console.log('Um nome foi enviado: ' + name);
        console.log('Uma senha foi enviada: ' + password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome: 
                <input type='text' name='name' value = {name} onChange={onChange} />
            </label><br/>
            <label>
                Senha:
                <input type='password' name='password' value = {password} onChange={onChange} />
            </label><br/>
            <input type='submit' value="Enviar" />
        </form>
    );
}

export default UserFormReducer;