import { Link } from 'react-router'


function Races() {
  

  return (
    <>
      <p>This page will show all the races in the database.
        Each race will have an edit button and a detail view button. 
        There will be one button for creating a new race.
      </p>
      <Link className='link' to='/Races/Create'>Create Race</Link>
      <Link className='link' to='/Races/Edit/42'>Edit Race</Link>
      <Link className='link' to='/Races/42'>Race Detail View</Link>
    </>
  )
}

export default Races