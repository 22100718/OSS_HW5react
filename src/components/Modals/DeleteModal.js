import React from 'react';

const DeleteModal = ({ onClose, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>Are you sure you want to delete this student?</h4>
                <p>This action cannot be undone.</p>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
