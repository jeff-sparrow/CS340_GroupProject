
const DeleteVolunteerForm = ({ rowObject, backendURL, refreshVolunteers }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_volunteer_id: rowObject.volunteerID,
            delete_volunteer_name: rowObject.volunteerName,
        };

        try {
            const response = await fetch(backendURL + '/volunteers/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Volunteer deleted successfully.");
                refreshVolunteers();
            } else {
                console.error("Error deleting Volunteer.");
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

export default DeleteVolunteerForm;