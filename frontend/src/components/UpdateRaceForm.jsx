
import React, { useState, useEffect } from 'react';

const UpdateRaceForm = ({ races, backendURL, refreshRaces }) => {
  const [formData, setFormData] = useState({
    update_race_id: '',
    update_race_name: '',
    update_race_date: '',
    update_race_distance: '',
    update_race_type: ''
  });


useEffect(() => {
  if (!formData.update_race_id) return;
  const race = races.find(r => String(r.raceID) === String(formData.update_race_id));
  if (race) {
    setFormData(prev => ({
      ...prev,
      update_race_name: race.name ?? '',
      update_race_date: race.date ? String(race.date).slice(0, 10) : '',
      update_race_distance: race.distance != null ? String(race.distance) : '',
      update_race_type: race.type ?? ''
    }));
  }
}, [formData.update_race_id, races]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.update_race_id) {
      console.error('Please select a race to update.');
      return;
    }

    const payload = {};
    if (formData.update_race_name?.trim()) payload.name = formData.update_race_name.trim();
    if (formData.update_race_date?.trim()) payload.date = formData.update_race_date.trim(); // expected format: YYYY-MM-DD
    if (formData.update_race_distance?.trim()) payload.distance = Number(formData.update_race_distance);
    if (formData.update_race_type?.trim()) payload.type = formData.update_race_type.trim();

    if (Object.keys(payload).length === 0) {
      console.warn('No changes to submit.');
      return;
    }

    try {
      const url = `${backendURL}/races/${formData.update_race_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        console.error('Error updating race.', response.status, errText);
        return;
      }

      console.log('Race updated successfully.');
      await refreshRaces();

      setFormData(prev => ({
        ...prev,
        update_race_name: '',
        update_race_date: '',
        update_race_distance: '',
        update_race_type: ''
      }));
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <>
      <h2>Update Race Details</h2>
      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="update_race_id">Select Race: </label>
        <select
          name="update_race_id"
          id="update_race_id"
          value={formData.update_race_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a Race</option>
          {races.map(race => (
            <option key={race.raceID} value={race.raceID}>
              {race.raceID} - {race.name}
            </option>
          ))}
        </select>

        <label htmlFor="update_race_date">Date: </label>
        <input
          type="date"
          name="update_race_date"
          id="update_race_date"
          placeholder="YYYY-MM-DD"
          value={formData.update_race_date}
          onChange={handleChange}
        />

        <label htmlFor="update_race_distance">Distance: </label>
        <input
          type="number"
          name="update_race_distance"
          id="update_race_distance"
          placeholder="(miles)"
          value={formData.update_race_distance}
          onChange={handleChange}
        />

        <label htmlFor="update_race_type">Surface: </label>
        <select
          name="update_race_type"
          id="update_race_type"
          value={formData.update_race_type}
          onChange={handleChange}
        >
          <option value="road">Road</option>
          <option value="trail">Trail</option>
        </select>

        <input type="submit" value="Update Race" />
      </form>
    </>
  );
};

export default UpdateRaceForm;
