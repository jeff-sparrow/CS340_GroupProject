import React from 'react';

const DeleteVolunteerForm = ({ rowObject, backendURL, refreshData }) => {
    const handleDelete = async () => {
        if (!window.confirm(`Delete volunteer ${rowObject.fname} ${rowObject.lname}?`)) return;
        try {
            const res = await fetch(`${backendURL}/aid-station-volunteers/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ volunteerID: rowObject.volunteerID })
            });
            if (res.ok) refreshData();
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleDelete}>Remove</button>;
};

export default DeleteVolunteerForm;