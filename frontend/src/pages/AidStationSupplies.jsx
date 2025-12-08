
import React, { useState, useEffect } from 'react';
import AidStationSupplyRow from '../components/AidStationSupplyRow';
import CreateASSupplyForm from '../components/CreateASSupplyForm';
import UpdateASSupplyForm from '../components/UpdateASSupplyForm';

function AidStationSupplies({ backendURL, refreshTrigger }) {
    const [assupplies, setAidStationSupplies] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/aid-station-supplies`);
            const data = await res.json();
            setAidStationSupplies(data);
        } catch (error) {
            console.error('Error fetching Aid Station Supplies', error);
        }
    }

    useEffect(() => {
        getData();
    }, [refreshTrigger]);

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
                    refreshASS={getData}
                    />
                ))}
                </tbody>
            </table>

            <CreateASSupplyForm backendURL={backendURL} refreshASS={getData} />
            <UpdateASSupplyForm backendURL={backendURL} refreshASS={getData} />
        </>
    );
}

export default AidStationSupplies;