// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

const DeleteAidStationSupplyForm = ({ rowObject, backendURL, refreshASS }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_stationSupply_id: rowObject.stationSupplyID,
        };

        try {
            const response = await fetch(backendURL + '/aid-station-supplies/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Aid Station Supply deleted successfully.");
                refreshASS();
            } else {
                console.error("Error deleting Aid Station Supply.");
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

export default DeleteAidStationSupplyForm;
