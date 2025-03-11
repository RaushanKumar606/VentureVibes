
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'; 
import SignupPage from './components/Pages/Sing';
import LoginPage from './components/Pages/Login';
import Logout from './components/Pages/Logout'
import NotFoundPage from './components/Pages/Error';
import HomePages from './components/Home/HomePages';
import ForgetEmail from './components/Pages/ForgetEmail';
import ChangePassword from './components/Pages/ChangePassword';
import ToursPages from './components/Tours/ToursPages';
import FlightPages from './components/Booking/Flight/FlightPages';
import TrainPage from './components/Booking/Trains/TrainPage';
import BusPage from './components/Booking/Bus/BusPage';
import HotelPage from './components/Booking/Hotels/HotelPage';
import SingleTure from './components/Tours/SingleTure';
import AdminPage from './components/Admin/AdminPage';
import AdminUser from './components/Pages/AdminUser';
import AdminUserEdit from './components/Pages/AdminUserEdit';
import  Dashboard  from './components/Pages/dashboard';
import AdminHotel from './components/Pages/AdminHotel';
import AdminBus from './components/Pages/AdminBus';
import AdminFlight from './components/Pages/AdminFlight';
import AdminTour from './components/Pages/AdminTour';
import AdminPostHotel from './components/Pages/AdminPostHotel';
import AdminPostTour from './components/Pages/AdminPostTour';
import AdminPostFlight from './components/Pages/AdminPostFlight';
import AdminPostBus from './components/Pages/AdminPostBus';
import AdminHotelUpdate from './components/Pages/AdminHotelUpdate';
import AdminTourUpdate from './components/Pages/AdminTourUpdate';
import AdminBusUpdate from './components/Pages/AdminBusUpdate';
import AdminFlightUpdate from './components/Pages/AdminFlightUpdate';

function App() {
 
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
       <Routes>
         {/* <Route path="/" element={<UserDashboard />} /> */}
        {/* Define the routes */}
        <Route path="/" element={<HomePages/>} />
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/email" element={<ForgetEmail />} />
        <Route path="/changePass" element={<ChangePassword />} />
        <Route path="/tours" element={<ToursPages />} />
        <Route path="/tours/:id" element={<SingleTure />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/flight" element={<FlightPages />} />
        <Route path="/bus" element={<BusPage/>}/>
        <Route path="/hotel" element={<HotelPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        
        {/* Admin Router  */}
        <Route  path= '/admin' element={<AdminPage/>}>
        <Route path="users" element={<AdminUser/>} />
        <Route path="/admin/users/:id/edit" element={<AdminUserEdit/>}/>
        <Route path="/admin/hotels" element={<AdminHotel/>}/>
        <Route path="/admin/Bus" element={<AdminBus/>}/>
        <Route path="/admin/flights" element={<AdminFlight/>}/>
        <Route path="/admin/tours" element={<AdminTour/>}/>
        {/* Admin post Router */}
        <Route path="/admin/create-tour" element={<AdminPostTour/>}/>
        <Route path="/admin/create-hotel" element={<AdminPostHotel/>}/>
        <Route path="/admin/create-flight" element={<AdminPostFlight/>}/>
        <Route path="/admin/create-bus" element={<AdminPostBus/>}/>
        <Route path="/admin/hotel/:id/edit" element={<AdminHotelUpdate/>}/>
        <Route path="/admin/tour/:id/edit" element={<AdminTourUpdate/>}/>
        <Route path="/admin/bus/:id/edit" element={<AdminBusUpdate/>}/>
        <Route path="/admin/flight/:id/edit" element={<AdminFlightUpdate/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



