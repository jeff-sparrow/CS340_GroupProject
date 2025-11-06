import { Link } from "react-router"


function Supplies() {
  

  return (
    <>
      <p>This page will show all the supplies in the database</p>
      <Link className='link' to='/Supplies/Create'>Create supply item</Link>
      <Link className='link' to='/Supplies/Edit/42'>Edit supply item</Link>
    </>
  )
}

export default Supplies