import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import DeleteRaceForm from '../components/DeleteRaceForm';
import CreateRaceForm from '../components/CreateRaceForm';
import UpdateRaceForm from '../components/UpdateRaceForm';

function Races({ backendURL, refreshTrigger }) {
    const [races, setRaces] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/races`);
            const data = await response.json();
            setRaces(data);
        } catch (error) {
            console.error('Error fetching races:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [refreshTrigger]); // <-- re-fetch when reset happens

    return (
        <>
            <h1>Races</h1>


            <table>
                <thead>
                    <tr>
                        {races.length > 0 && Object.keys(races[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map((race, index) => (
                        <TableRow
                            key={index}
                            rowObject={race}
                            backendURL={backendURL}
                            refreshRaces={getData}
                        />
                    ))}
                </tbody>
            </table>
                        
            {/* <CreateRaceForm backendURL={backendURL} refreshRaces={getData} />
            <UpdateRaceForm races={races} backendURL={backendURL} refreshRaces={getData} /> */}
        </>
    );
}

export default Races;