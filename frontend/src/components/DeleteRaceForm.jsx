// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

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
