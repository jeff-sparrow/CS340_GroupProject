const DeleteRaceForm = ({ rowObject, backendURL, refreshRaces }) => {
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const response = await fetch(`${backendURL}/races/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    delete_race_id: rowObject.raceID,
                    delete_race_name: rowObject.name
                }),
            });

            if (response.ok) {
                console.log(`Race "${rowObject.name}" deleted successfully.`);
                refreshRaces(); // Refresh table data
            } else {
                console.error("Error deleting race.");
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };

    return (
        <td>
            <form onSubmit={handleSubmit}>
                <button type="submit">Delete</button>
            </form>
        </td>
    );
};

export default DeleteRaceForm;
