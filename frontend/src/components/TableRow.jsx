import React from 'react';
// import DeleteRaceForm from './DeleteRaceForm';

// const TableRow = ({ rowObject, backendURL, refreshRaces }) => {
//   return (
//     <tr>
//       {Object.values(rowObject).map((value, idx) => (
//         <td key={idx}>{value}</td>
//       ))}
//       <DeleteRaceForm
//         rowObject={rowObject}
//         backendURL={backendURL}
//         refreshRaces={refreshRaces}
//       />
//     </tr>
//   );
// };

// export default TableRow;

import DeleteRaceForm from './DeleteRaceForm';

const TableRow = ({ rowObject, backendURL, refreshRaces }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteRaceForm
                rowObject={rowObject}
                backendURL={backendURL}
                refreshRaces={refreshRaces}
            />
        </tr>
    );
};

export default TableRow;