// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React, { useState, useEffect } from 'react';
import VolunteerRow from '../components/VolunteerRow';

function Volunteers({ backendURL, refreshTrigger }) {
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
    }, [refreshTrigger]);

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
                    {volunteers.map((volunteer, index) => (
                        <VolunteerRow 
                            key={index} 
                            rowObject={volunteer} 
                            backendURL={backendURL} 
                            refreshVolunteers={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Volunteers;
