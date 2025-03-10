
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'; 
import SignupPage from './components/Pages/Sing';
import LoginPage from './components/Pages/Login';
import UserDashboard from './components/Dashboard/UserDashboard';
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



function App() {
 
  return (
    <BrowserRouter>
       <Routes>
        {/* Define the routes */}
        <Route path="/" element={<HomePages/>} />
        <Route path="/dashboard" element={<UserDashboard />} />
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
        
        {/* Admin Router  */}
        <Route  path= '/admin' element={<AdminPage/>}>
        <Route path="users" element={<AdminUser/>} />
        <Route path="/admin/users/:id/edit" element={<AdminUserEdit/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



