// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React from 'react';
import DeleteSupplyForm from './DeleteSupplyForm';

const SupplyRow = ({ rowObject, backendURL, refreshData }) => (
    <tr>e
        {Object.values(rowObject).map((v, idx) => <td key={idx}>{v}</td>)}
        <td>
            <DeleteSupplyForm rowObject={rowObject} 
                              backendURL={backendURL} 
                              refreshData={refreshData} />
        </td>
    </tr>
);

export default SupplyRow;
