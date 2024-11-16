import React, { useState } from 'react';

const UpdateModal = ({ onClose, onSave, student }) => {
    const [name, setName] = useState(student.name);
    const [age, setAge] = useState(student.age);
    const [major, setMajor] = useState(student.major);

    const handleSave = () => {
        const updatedStudent = { ...student, name, age, major };
        fetch(`https://672819eb270bd0b975546065.mockapi.io/api/v1/students/${student.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStudent),
        })
            .then(response => response.json())
            .then(data => onSave(data));
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Student</h5>
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

export default UpdateModal;
