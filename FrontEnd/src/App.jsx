import { Outlet, Link } from 'react-router'
import './App.css'

function App() {


  return (
    <div className='layout'>
      <div className='nav-banner'>
        <h1>Race Management Database</h1>
        <div className='nav-links'>
          <ul>
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/Races'>Races</Link></li>
            <li><Link className='link' to='/AidStations'>Aid Stations</Link></li>
            <li><Link className='link' to='/Volunteers'>Volunteers</Link></li>
            <li><Link className='link' to='/Supplies'>Supplies</Link></li>
          </ul>
        </div>
      </div>
      <div className='page-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default App