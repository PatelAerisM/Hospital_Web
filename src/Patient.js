import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Patient() {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                setPatients(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        // Filter patients based on search query
        const filtered = patients.filter(patient =>
            patient.NAME.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [patients, searchQuery]);

    function deletePatient(id) {
        axios.delete(`http://localhost:8081/patient/${id}`)
            .then(res => {
                console.log(res);
                setPatients(patients.filter(patient => patient.ID !== id));
            })
            .catch(err => console.log(err));
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='container'>
            <h2 className='my-4'>Patient List</h2>
            <div className="mb-3">
                <Link to='/create' className='btn btn-primary mb-3'>Add Patient</Link>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Description</th>
                        <th>Protocol</th>
                        <th>Physician</th>
                        <th>Body Part Examined</th>
                        <th>Description Of Scan</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(searchQuery ? filteredPatients : patients).map(patient => (
                        <tr key={patient.ID}>
                            <td>{patient.ID}</td>
                            <td>{patient.NAME}</td>
                            <td>{patient.Email}</td>
                            <td>{patient.age}</td>
                            <td>{patient.Gender}</td>
                            <td>{patient.Description}</td>
                            <td>{patient.Protocol}</td>
                            <td>{patient.Physician}</td>
                            <td>{patient.BodyPartExamined}</td>
                            <td>{patient.DescriptionOfScan}</td>
                            <td>{new Date(patient.Date).toLocaleDateString('en-GB')}</td> {/* Format date as dd-mm-yyyy */}
                            <td>
                                <Link to={`/update/${patient.ID}`} className='btn btn-sm btn-outline-primary me-2'>Edit</Link>
                                <button className='btn btn-sm btn-outline-danger me-2' onClick={() => deletePatient(patient.ID)}>Delete</button>
                                <Link to={`/view/${patient.ID}`} className='btn btn-sm btn-outline-primary me-2'>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Patient;
