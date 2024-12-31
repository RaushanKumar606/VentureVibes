import  { useState } from "react"
import {NavLink,Outlet} from 'react-router-dom'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <h1>Trouvaille</h1>
        <ul>
         
          <li> <NavLink to='/admin/dashboard'>Dashboard</NavLink></li>
          <li> <NavLink to='/admin/users'>Users</NavLink></li>
          <li> <NavLink to='/admin/booking'>Bookings</NavLink></li>
          <li> <NavLink to='/admin/visa'>Visa</NavLink></li>
          <li> <NavLink to='/admin/offers'>Offers</NavLink></li>
          <li> <NavLink to='/admin/b2b'>B2B</NavLink></li>
          <li> <NavLink to='/admin/setting'>Setting</NavLink></li>
          <li> <NavLink to='/admin/generic-page'>Generic Pages</NavLink></li>
        </ul>
        <NavLink to='/admin/content-admin'><button>Contact Super Admin</button></NavLink>
      </div>
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <Outlet/>
    </>
  );
};

export default Sidebar;

