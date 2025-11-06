import { Link } from "react-router"


function Volunteers() {
  

  return (
    <>
      <p>This page will show all the volunteers in the database</p>
      <Link className='link' to='/Volunteers/Create'>Create Volunteer</Link>
      <Link className='link' to='/Volunteers/Edit/42'>Edit Volunteer</Link>
    </>
  )
}

export default Volunteers