import { Link } from "react-router"


function Supplies() {
  

  return (
    <>
      <p>This page will show all the supplies in the database. There 
        will also be one button next to each supply item to delete it and
        button to edit it.
      </p>
      <Link className='link' to='/Supplies/Create'>Create supply item</Link>
      <Link className='link' to='/Supplies/Edit/42'>Edit supply item</Link>
    </>
  )
}

export default Supplies