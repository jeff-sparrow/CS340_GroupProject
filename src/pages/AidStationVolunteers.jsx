import React, { useState, useEffect } from 'react';
import AidStationVolunteerRow from '../components/AidStationVolunteerRow';

function AidStationVolunteers({ backendURL }) {
    const [asvolunteers, setAidStationVolunteers] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/aid-station-volunteers`);
            console.log('[AidStationVolunteers] backendURL:', backendURL);
            const data = await res.json();
            console.log('[AidStationVolunteers] length:', data.length, 'sample:', data[0]);
            setAidStationVolunteers(data);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Aid Station Volunteers</h1>
            <table>
                <thead>
                <tr>
                    <th>Station</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Role</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {asvolunteers.map((v) => (
                    <AidStationVolunteerRow
                    key={v.stationVolunteerID}
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

export default AidStationVolunteers;


