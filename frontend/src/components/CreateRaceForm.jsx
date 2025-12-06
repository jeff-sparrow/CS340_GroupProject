import React, { useState } from 'react';

const CreateRaceForm = ({ backendURL, refreshRaces }) => {
    const [formData, setFormData] = useState({
        create_race_name: '',
        create_race_date: ''
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
            const response = await fetch(`${backendURL}/races/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Race created successfully.");
                refreshRaces();
                setFormData({ create_race_name: '', create_race_date: '' });
            } else {
                console.error("Error creating race.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Create a Race</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_race_name">Race Name: </label>
            <input
                type="text"
                name="create_race_name"
                id="create_race_name"
                value={formData.create_race_name}
                onChange={handleChange}
            />

            <label htmlFor="create_race_date">Race Date: </label>
            <input
                type="date"
                name="create_race_date"
                id="create_race_date"
                value={formData.create_race_date}
                onChange={handleChange}
            />

            <input type="submit" value="Create Race" />
        </form>
        </>
    );
};

export default CreateRaceForm;