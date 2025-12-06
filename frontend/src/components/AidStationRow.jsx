import React from 'react';
import DeleteAidStationForm from './DeleteAidStationForm';

const AidStationRow = ({ rowObject, backendURL, refreshData }) => (
    <tr>
        {Object.values(rowObject).map((v, idx) => <td key={idx}>{v}</td>)}
        <td>
            <DeleteAidStationForm rowObject={rowObject} backendURL={backendURL} refreshData={refreshData} />
        </td>
    </tr>
);

export default AidStationRow;