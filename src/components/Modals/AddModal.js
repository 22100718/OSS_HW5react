import React, { useState } from 'react';

const AddModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [major, setMajor] = useState('');

    const handleSave = () => {
        const newStudent = { name, age, major };
        fetch("https://672819eb270bd0b975546065.mockapi.io/api/v1/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent),
        })
            .then(response => response.json())
            .then(data => onSave(data))
            .catch(error => console.error("Error adding student:", error));
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Student</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        <input type="number" className="form-control mb-2" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Major" value={major} onChange={e => setMajor(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModal;