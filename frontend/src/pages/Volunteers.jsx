
import React, { useState, useEffect } from 'react';
import VolunteerRow from '../components/VolunteerRow';

function Volunteers({ backendURL }) {
    const [volunteers, setVolunteers] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/volunteers`);
            const data = await res.json();
            setVolunteers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Volunteers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Volunteer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th></th>                                                                                                                                          
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((v, idx) => (
                        <VolunteerRow key={idx} rowObject={v} backendURL={backendURL} refreshData={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Volunteers;