import React, { useState, useEffect } from 'react';
import SupplyRow from '../components/SupplyRow';

function Supplies({ backendURL }) {
    const [supplies, setSupplies] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/supplies`);
            const data = await res.json();
            setSupplies(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => getData(), []);

    return (
        <>
            <h1>Supplies</h1>
            <table>
                <thead>
                    <tr>
                        {supplies.length > 0 && Object.keys(supplies[0]).map((key, idx) => <th key={idx}>{key}</th>)}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {supplies.map((s, idx) => (
                        <SupplyRow key={idx} rowObject={s} backendURL={backendURL} refreshData={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Supplies;