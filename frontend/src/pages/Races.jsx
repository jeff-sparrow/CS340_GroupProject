
import { useState, useEffect } from 'react';
import RacesRow from '../components/RacesRow';
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
    }, [refreshTrigger]); 

    return (
        <>
            <h1>Races</h1>

            <table>
                <thead>
                    <tr>
                        <th>Race ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Distance</th>
                        <th>Surface</th>                                                                                                
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {races.map((race, index) => (
                        <RacesRow
                            key={index}
                            rowObject={race}
                            backendURL={backendURL}
                            refreshRaces={getData}
                        />
                    ))}
                </tbody>
            </table>
                        
            <CreateRaceForm backendURL={backendURL} refreshRaces={getData} />
            <UpdateRaceForm races={races} backendURL={backendURL} refreshRaces={getData} />
        </>
    );
}

export default Races;