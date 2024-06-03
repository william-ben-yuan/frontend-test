import React, { useState } from 'react';
import api from '../../../api/api';
import Navbar from '../../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../../components/Alert';

const Create = () => {
    const [name, setName] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post('/people', { name });
            setName('');
            setAlert({ show: true, message: 'Pessoa cadastrada com sucesso!', variant: 'success' });
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setAlert({ show: true, message: 'Erro ao cadastrar pessoa, tente novamente.', variant: 'danger' });
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    return (
        <>
            <Navbar />
            <div className="container p-5 border rounded mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Cadastrar Pessoa</h2>
                    <Link to="/" className="btn btn-primary">Voltar</Link>
                </div>
                <Alert show={alert.show} message={alert.message} variant={alert.variant} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        </>
    );
}

export default Create;