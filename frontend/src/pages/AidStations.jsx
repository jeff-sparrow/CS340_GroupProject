
import React, { useState, useEffect } from 'react';
import AidStationRow from '../components/AidStationRow';

function AidStations({ backendURL, refreshTrigger }) {
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

    useEffect(() => {
        getData();
    }, [refreshTrigger]);

    return (
        <>
            <h1>Aid Stations</h1>
            <table>
                <thead>
                    <tr>
                        <th>Station ID</th>
                        <th>Race </th>
                        <th>Station Name</th>
                        <th>Mile Marker</th>
                        <th>Elevation</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th></th>  
                    </tr>
                </thead>
                <tbody>
                    {stations.map((station, index) => (
                        <AidStationRow 
                            key={index} 
                            rowObject={station} 
                            backendURL={backendURL} 
                            refreshAidStations={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AidStations;