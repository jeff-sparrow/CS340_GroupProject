import React, { useState } from 'react';

const UpdateRaceForm = ({ races, backendURL, refreshRaces }) => {
    const [formData, setFormData] = useState({
        update_race_id: '',
        update_race_name: '',
        update_race_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/races/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Race updated successfully.");
                refreshRaces();
            } else {
                console.error("Error updating race.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Update a Race</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_race_id">Select Race: </label>
            <select
                name="update_race_id"
                id="update_race_id"
                value={formData.update_race_id}
                onChange={handleChange}
            >
                <option value="">Select a Race</option>
                {races.map(race => (
                    <option key={race.raceID} value={race.raceID}>
                        {race.raceID} - {race.name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_race_name">Race Name: </label>
            <input
                type="text"
                name="update_race_name"
                id="update_race_name"
                value={formData.update_race_name}
                onChange={handleChange}
            />

            <label htmlFor="update_race_date">Race Date: </label>
            <input
                type="date"
                name="update_race_date"
                id="update_race_date"
                value={formData.update_race_date}
                onChange={handleChange}
            />

            <input type="submit" value="Update Race" />
        </form>
        </>
    );
};

export default UpdateRaceForm;