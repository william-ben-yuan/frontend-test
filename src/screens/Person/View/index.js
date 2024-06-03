import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Modal from '../../../components/Modal/Contact/Delete';

const View = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [deletingContact, setDeletingContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    const fetchPerson = async () => {
        const response = await api.get(`/people/${id}`);
        setPerson(response.data);
        setContacts(response.data.contacts);
    };

    useEffect(() => {
        fetchPerson();
    }, [id]);

    if (!person) {
        return <div>Carregando...</div>;
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/contacts/${id}`);
            setContacts(contacts.filter(contacts => contacts.id !== id));
            setAlert({ show: true, message: 'Contato excluída com sucesso!', variant: 'success' });
            fetchPerson();
        } catch (error) {
            setAlert({ show: true, message: 'Erro ao excluir contato, tente novamente.', variant: 'danger' });
        }
        setShowModal(false);
    };

    const openModal = (person) => {
        setDeletingContact(person);
        setShowModal(true);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Link to="/"> Voltar</Link>
            </div>
            <div className="container p-5 border rounded mt-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>{person.name}</h2>
                    <Link to={`/create-contact/${person.id}`} className="btn btn-primary mb-3">Cadastrar Contato</Link>
                </div>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Contato</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {person.contacts && person.contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.type}</td>
                                <td>{contact.contact}</td>
                                <td>
                                    <Link to={`/edit-contact/${contact.id}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-danger ms-2" onClick={() => openModal(contact)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal showModal={showModal} closeModal={() => setShowModal(false)} confirmAction={handleDelete} contact={deletingContact} />
            </div>
        </>
    );
};

export default View;