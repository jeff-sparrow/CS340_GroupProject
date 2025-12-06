import React from 'react';

const DeleteAidStationForm = ({ rowObject, backendURL, refreshData }) => {
    const handleDelete = async () => {
        if (!window.confirm(`Delete aid station ${rowObject.name}?`)) return;
        try {
            const res = await fetch(`${backendURL}/aid-stations/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stationID: rowObject.stationID })
            });
            if (res.ok) refreshData();
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteAidStationForm;