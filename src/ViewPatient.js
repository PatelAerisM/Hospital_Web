import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ViewPatient.css';
import jsPDF from 'jspdf';

function ViewPatient() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/patient/${id}`)
            .then(res => setPatient(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleCopy = () => {
        navigator.clipboard.writeText(patient.ID)
            .then(() => alert("ID copied to clipboard!"))
            .catch(err => console.log('Something went wrong', err));
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const patientDetails = `
            ID: ${patient.ID}
            Name: ${patient.NAME}
            Email: ${patient.Email}
            Age: ${patient.age}
            Gender: ${patient.Gender}
            Description: ${patient.Description}
            Protocol: ${patient.Protocol}
            Physician: ${patient.Physician}
            Body Part Examined: ${patient.BodyPartExamined}
            Description of Scan: ${patient.DescriptionOfScan}
            Date: ${new Date(patient.Date).toLocaleDateString('en-GB')}
        `;
        doc.text(patientDetails, 10, 10);
        doc.save('patient_details.pdf');
    };

    if (!patient) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '60px', marginBottom: '55px' }} className='container'>
            <h2 className='my-4'>Patient Details</h2>
            <div className='patient-details'>
                <div className='detail-box'>
                    <strong>ID:</strong> {patient.ID}
                    <button onClick={handleCopy} className='copy-btn'>Copy</button>
                </div>
                <div className='detail-box'>
                    <strong>Name:</strong> {patient.NAME}
                </div>
                <div className='detail-box'>
                    <strong>Email:</strong> {patient.Email}
                </div>
                <div className='detail-box'>
                    <strong>Age:</strong> {patient.age}
                </div>
                <div className='detail-box'>
                    <strong>Gender:</strong> {patient.Gender}
                </div>
                <div className='detail-box'>
                    <strong>Description:</strong> {patient.Description}
                </div>
                <div className='detail-box'>
                    <strong>Protocol:</strong> {patient.Protocol}
                </div>
                <div className='detail-box'>
                    <strong>Physician:</strong> {patient.Physician}
                </div>
                <div className='detail-box'>
                    <strong>Body Part Examined:</strong> {patient.BodyPartExamined}
                </div>
                <div className='detail-box'>
                    <strong>Description of Scan:</strong> {patient.DescriptionOfScan}
                </div>
                <div className='detail-box'>
                    <strong>Date:</strong> {new Date(patient.Date).toLocaleDateString('en-GB')}
                </div>
            </div>
            <div className='button-group'>
                <Link to="/" className='btn btn-primary mr-2'>Back to Patient List</Link>
                <button onClick={handleGeneratePDF} className='btn btn-primary'>Generate PDF</button>
            </div>
        </div>
    );
}

export default ViewPatient;
