import React from 'react';
import DeleteVolunteerForm from './DeleteVolunteerForm';

const VolunteerRow = ({ rowObject, backendURL, refreshData }) => (
    <tr>
        {Object.values(rowObject).map((v, idx) => <td key={idx}>{v}</td>)}
        <td>
            <DeleteVolunteerForm rowObject={rowObject} backendURL={backendURL} refreshData={refreshData} />
        </td>
    </tr>
);

export default VolunteerRow;