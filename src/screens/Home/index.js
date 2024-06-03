import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Person/Delete';
import Alert from '../../components/Alert';

const Home = () => {
    const [people, setPeople] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const [deletingPerson, setDeletingPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await api.get('/people');
            setPeople(response.data);
        };

        fetchPeople();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/people/${id}`);
            setPeople(people.filter(person => person.id !== id));
            setAlert({ show: true, message: 'Pessoa excluída com sucesso!', variant: 'success' });
        } catch (error) {
            setAlert({ show: true, message: 'Erro ao excluir pessoa, tente novamente.', variant: 'danger' });
        }
        setShowModal(false);
    };

    const openModal = (person) => {
        setDeletingPerson(person);
        setShowModal(true);
    };

    return (
        <>
            <Navbar />
            <div className="container p-5 border rounded mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Lista de pessoas</h2>
                    <Link to="/create" className="btn btn-primary mb-3">Cadastrar Pessoa</Link>
                </div>
                <Alert show={alert.show} message={alert.message} variant={alert.variant} />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Contatos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(person => (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>
                                    <ul>
                                        {person.contact && person.contacts.map(contact => (
                                            <li key={contact.id}>{contact.value}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <Link to={`/edit/${person.id}`} className="btn btn-warning">Editar</Link>
                                    <Link to={`/contacts/${person.id}`} className="btn btn-info ms-2">Contatos</Link>
                                    <button onClick={() => openModal(person)} className="btn btn-danger ms-2">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal showModal={showModal} closeModal={() => setShowModal(false)} confirmAction={handleDelete} person={deletingPerson} />
            </div>
        </>
    );
}

export default Home;