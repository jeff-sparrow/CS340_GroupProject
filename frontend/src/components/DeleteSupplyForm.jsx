import React from 'react';

const DeleteSupplyForm = ({ rowObject, backendURL, refreshData }) => {
    const handleDelete = async () => {
        if (!window.confirm(`Delete supply ${rowObject.name}?`)) return;
        try {
            const res = await fetch(`${backendURL}/supplies/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ supplyID: rowObject.supplyID })
            });
            if (res.ok) refreshData();
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteSupplyForm;