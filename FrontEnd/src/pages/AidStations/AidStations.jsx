import { Link } from "react-router"
function AidStations() {
  

  return (
    <>
      <p>This page will show all the Aid stations in the database.
        There will be one button to create a new aid station, and 
        there will be a button next to each aid station for edititng 
        it and a button next to each aid station for seeing the detialed 
        view. There will also be one button next to each aid station to 
        delete it.
      </p>
      <Link className='link' to='/AidStations/Create'>Create Aid Station</Link>
      <Link className='link' to='/AidStations/Edit/42'>Edit Aid Station</Link>
      <Link className='link' to='/AidStations/42'>Aid Station Detail View</Link>
    </>
  )
}

export default AidStations