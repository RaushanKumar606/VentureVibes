
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
import FlightPage from './components/Booking/Filght/FlightPage';
import TrainPage from './components/Booking/Trains/TrainPage';
import BusPage from './components/Booking/Bus/BusPage';
import HotelPage from './components/Booking/Hotels/HotelPage';
import { useAuth } from './components/Hooks/ContextApi/ContextApi';


function App() {
  const {loading,data} = useAuth
  console.log(loading);
  console.log(data)
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
        <Route path="/train" element={<TrainPage />} />
        <Route path="/flight" element={<FlightPage />} />
        <Route path="/bus" element={<BusPage/>}/>
        <Route path="/hotel" element={<HotelPage/>}/>
       
        {/* Admin Router  */}
         {/* <Route path="/admin" element={<Sidebar />}>
         </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;



