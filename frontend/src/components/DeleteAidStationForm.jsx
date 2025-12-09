// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

const DeleteAidStationForm = ({ rowObject, backendURL, refreshAidStations }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_station_id: rowObject.stationID,
            delete_station_name: rowObject.stationName,
        };

        try {
            const response = await fetch(backendURL + '/aid-stations/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Aid Station deleted successfully.");
                refreshAidStations();
            } else {
                console.error("Error deleting Aid Station.");
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

export default DeleteAidStationForm;
