import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Alert from '../../../components/Alert';

const Edit = () => {
    const params = useParams();
    const [person, setPerson] = useState({ name: '' });
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerson = async () => {
            const response = await api.get(`/people/${params.id}`);
            setPerson(response.data);
        };
        fetchPerson();
    }, [params.id]);

    const handleChange = (event) => {
        setPerson({
            ...person,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/people/${params.id}`, person);
            navigate('/');
        } catch (error) {
            setAlert({ show: true, message: 'Erro ao atualizar pessoa, tente novamente.', variant: 'danger' });
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Link to="/"> Voltar</Link>
            </div>
            <div className="container p-5 border rounded mt-2">
                <h2>Editar Pessoa</h2>
                <Alert show={alert.show} message={alert.message} variant={alert.variant} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" name="name" value={person.name} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </form>
            </div>
        </>
    );
}

export default Edit;