import { Link } from "react-router"


function Volunteers() {
  

  return (
    <>
      <p>This page will show all the volunteers in the database. There will
        be one button next to each volunteer to edit them and one button 
        next to each for deleting.
      </p>
      <Link className='link' to='/Volunteers/Create'>Create Volunteer</Link>
      <Link className='link' to='/Volunteers/Edit/42'>Edit Volunteer</Link>
    </>
  )
}

export default Volunteers