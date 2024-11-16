import React, { useState, useEffect } from 'react';
import AddModal from '../Modals/AddModal';
import UpdateModal from '../Modals/UpdateModal';
import DeleteModal from '../Modals/DeleteModal';

const ShowList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const getData = async () => {
        const response = await fetch("https://672819eb270bd0b975546065.mockapi.io/api/v1/students");
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAdd = (newStudent) => {
        setStudents([...students, newStudent]);
        setShowAddModal(false);
    };

    const handleUpdate = (updatedStudent) => {
        setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
        setShowUpdateModal(false);
    };

    const openDeleteModal = (id) => {
        setStudentToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (studentToDelete) {
            fetch(`https://672819eb270bd0b975546065.mockapi.io/api/v1/students/${studentToDelete}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (response.ok) {
                        setStudents(students.filter(student => student.id !== studentToDelete));
                        setStudentToDelete(null);
                        setShowDeleteModal(false);
                    } else {
                        console.error("Failed to delete student");
                    }
                })
                .catch(error => console.error("Error deleting student:", error));
        }
    };

    const openUpdateModal = (student) => {
        setSelectedStudent(student);
        setShowUpdateModal(true);
    };

    return (
        <div className="container mt-5">
            <h1>Student List</h1>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Data</button>
            <div className="mt-4">
                {students.map(student => (
                    <div key={student.id} className="d-flex justify-content-between align-items-center border p-2 mb-2">
                        <span>ID: {student.id}, Name: {student.name}, Age: {student.age}, Major: {student.major}</span>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => openUpdateModal(student)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(student.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onSave={handleAdd} />}
            {showUpdateModal && selectedStudent && <UpdateModal onClose={() => setShowUpdateModal(false)} onSave={handleUpdate} student={selectedStudent} />}
            {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} />}
        </div>
    );
};

export default ShowList;
