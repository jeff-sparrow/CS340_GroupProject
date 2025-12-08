
import React from 'react';
import DeleteSupplyForm from './DeleteSupplyForm';

const SupplyRow = ({ rowObject, backendURL, refreshData }) => (
    <tr>
        {Object.values(rowObject).map((v, idx) => <td key={idx}>{v}</td>)}
        <td>
            <DeleteSupplyForm rowObject={rowObject} backendURL={backendURL} refreshData={refreshData} />
        </td>
    </tr>
);

export default SupplyRow;