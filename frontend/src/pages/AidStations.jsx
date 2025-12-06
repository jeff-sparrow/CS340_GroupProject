import React, { useState, useEffect } from 'react';
import AidStationRow from '../components/AidStationRow';

function AidStations({ backendURL }) {
    const [stations, setStations] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/aid-stations`);
            const data = await res.json();
            setStations(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => getData(), []);

    return (
        <>
            <h1>Aid Stations</h1>
            <table>
                <thead>
                    <tr>
                        {stations.length > 0 && Object.keys(stations[0]).map((key, idx) => <th key={idx}>{key}</th>)}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((s, idx) => (
                        <AidStationRow key={idx} rowObject={s} backendURL={backendURL} refreshData={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AidStations;