import React from 'react';
// import RemoveSupply from './RemoveSupply';

const AidStationSupplyRow = ({ rowObject, backendURL, refreshData }) => (
    <tr>
        {Object.values(rowObject).map((v, idx) => <td key={idx}>{v}</td>)}
        <td>
            {/* <DeleteSupplyForm rowObject={rowObject} backendURL={backendURL} refreshData={refreshData} /> */}
            test
        </td>
    </tr>
);

export default AidStationSupplyRow;