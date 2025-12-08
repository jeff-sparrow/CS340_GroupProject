
const DeleteRaceForm = ({ rowObject, backendURL, refreshRaces }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_race_id: rowObject.raceID,
            delete_race_name: rowObject.name,
        };

        try {
            const response = await fetch(backendURL + '/races/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Race deleted successfully.");
                refreshRaces();
            } else {
                console.error("Error deleting race.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <td>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Delete
                </button>

            </form>
        </td>

    );
};

export default DeleteRaceForm;