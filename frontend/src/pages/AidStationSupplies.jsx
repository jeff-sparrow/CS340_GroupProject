
import React, { useState, useEffect } from 'react';
import AidStationSupplyRow from '../components/AidStationSupplyRow';

function AidStationSupplies({ backendURL }) {
    const [assupplies, setAidStationSupplies] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/aid-station-supplies`);
            const data = await res.json();
            setAidStationSupplies(data);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Aid Station Supplies</h1>
            <table>
                <thead>
                <tr>
                    <th>Station</th>
                    <th>Supply Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {assupplies.map((v) => (
                    <AidStationSupplyRow
                    key={v.stationSupplyID}
                    rowObject={v}
                    backendURL={backendURL}
                    refreshData={getData}
                    />
                ))}
                </tbody>
            </table>
        </>
    );
}

export default AidStationSupplies;