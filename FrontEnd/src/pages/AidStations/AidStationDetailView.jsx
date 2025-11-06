import { Link } from "react-router"


function AidStationDetailView() {
  

  return (
    <>
      <p>This page will show specific details for one aid station, 
        including the many to many intersection tables for this specific aid 
        station that show which volunteers are assigned to it and which 
        supplies are present at it. There will be one button for creating
        a new volunteer-aid station assignment and another button 
        for creating a new supply-aid station assignment.
      </p>
      <Link className='link' to='/AidStations/42/AddVolunteer'>Create Volunteer Assignment</Link>
      <Link className='link' to='/AidStations/42/AddSupply'>Create Supply Assignment</Link>
    </>
  )
}

export default AidStationDetailView