import React, { useState } from 'react';
import api from '../../../api/api';
import Navbar from '../../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../../components/Alert';

const Add = () => {
    const [formState, setFormState] = useState({
        name: ''
    });
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post('/people', { name: formState.name });
            navigate('/');
        } catch (error) {
            setAlert({ show: true, message: 'Erro ao cadastrar pessoa, tente novamente.', variant: 'danger' });
        }
    };

    const handleChange = (event) => {
        setFormState({
            ...formState,
            name: event.target.value
        });
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Link to="/"> Voltar</Link>
            </div>
            <div className="container p-5 border rounded mt-2">
                <h2>Cadastrar Pessoa</h2>
                <Alert show={alert.show} message={alert.message} variant={alert.variant} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" value={formState.name} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        </>
    );
}

export default Add;