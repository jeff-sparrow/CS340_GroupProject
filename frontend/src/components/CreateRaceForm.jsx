// Citation:
// Date: 12/08/2025
// Adapted from: Iterative Copilot queries describing desired functionality
// Source URL: https://m365.cloud.microsoft/

import React, { useState } from 'react';

const CreateRaceForm = ({ backendURL, refreshRaces }) => {
    const [formData, setFormData] = useState({
        create_race_name: '',
        create_race_date: '',
        create_race_distance: '',
        create_race_type: 'road',
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
            const response = await fetch(`${backendURL}/races`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.create_race_name,
                date: formData.create_race_date,
                distance: formData.create_race_distance,
                type: formData.create_race_type,
            }),
});

            if (response.ok) {
                console.log("Race created successfully.");
                refreshRaces();
                setFormData({ create_race_name: '', 
                              create_race_date: '',
                              create_race_distance: '',
                              create_race_type: 'road'
                        });
            } else {
                console.error("Error creating race.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Create a New Race</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_race_name">Name: </label>
            <input
                type="text"
                name="create_race_name"
                id="create_race_name"
                placeholder='Race Name'
                value={formData.create_race_name}
                onChange={handleChange}
            />

            <label htmlFor="create_race_date">Date: </label>
            <input
                type="date"
                name="create_race_date"
                id="create_race_date"
                value={formData.create_race_date}
                onChange={handleChange}
            />

            <label htmlFor="create_race_distance">Distance: </label>
            <input
            type="number"
            name="create_race_distance"
            id="create_race_distance"
            placeholder='(miles)'
            value={formData.create_race_distance}
            onChange={handleChange}
            min="1"
            step="1"
            inputMode="numeric"
            required
            />

            <label htmlFor="create_race_type">Surface: </label>
            <select
            name="create_race_type"
            id="create_race_type"
            value={formData.create_race_type}
            onChange={handleChange}
            required
            >
            <option value="road">Road</option>
            <option value="trail">Trail</option>
            </select>


            <input type="submit" value="Create Race" />
        </form>
        </>
    );
};

export default CreateRaceForm;
