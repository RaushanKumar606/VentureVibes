
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'; 
import SignupPage from './components/Pages/Sing';
import LoginPage from './components/Pages/Login';
import Logout from './components/Pages/Logout'
import NotFoundPage from './components/Pages/Error';
import HomePages from './components/Home/HomePages';
import ForgetEmail from './components/Pages/ForgetEmail';
import ToursPages from './components/Tours/ToursPages';
import FlightPages from './components/Booking/Flight/FlightPages';
import TrainPage from './components/Booking/Trains/TrainPage';
import BusPage from './components/Booking/Bus/BusPage';
import HotelPage from './components/Booking/Hotels/HotelPage';
import SingleTure from './components/Tours/SingleTure';
import AdminPage from './components/Admin/AdminPage';
import AdminUser from './components/AdminPages/AdminUser';
import AdminUserEdit from './components/AdminPages/AdminUserEdit';
// import  Dashboard  from './components/Pages/Profile';
import AdminHotel from './components/AdminPages/AdminHotel';
import AdminBus from './components/AdminPages/AdminBus';
import AdminFlight from './components/AdminPages/AdminFlight';
import AdminTour from './components/AdminPages/AdminTour';
import AdminPostHotel from './components/AdminPages/AdminPostHotel';
import AdminPostTour from './components/AdminPages/AdminPostTour';
import AdminPostFlight from './components/AdminPages/AdminPostFlight';
import AdminPostBus from './components/AdminPages/AdminPostBus';
import AdminHotelUpdate from './components/AdminPages/AdminHotelUpdate';
import AdminTourUpdate from './components/AdminPages/AdminTourUpdate';
import AdminBusUpdate from './components/AdminPages/AdminBusUpdate';
import AdminFlightUpdate from './components/AdminPages/AdminFlightUpdate';
import UserData from './components/UserDashboard/UserData';
import UserProfile from './components/UserProfile/UserProfile'
import ChangePassword from './components/UserProfile/ChangePassword';
import UserEditProfile from './components/UserProfile/UserEditProfile';
import UserBooking from './components/UserProfile/UserBooking';
import UserInvoice from './components/UserProfile/UserInvoice';
import UserReview from './components/UserProfile/UserReview';
import UserWishList from './components/UserProfile/UserWishList';
import UserSetting from './components/UserProfile/UserSetting';
import AdminBooking from './components/AdminPages/AdminBooking';
import AdminDash from './components/AdminPages/AdminDash';
import BookingList from './components/UserProfile/BookingList';
function App() {
 
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
       <Routes>
        <Route path="/" element={<HomePages/>} />
        <Route path="/bookingList" element={<BookingList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/email" element={<ForgetEmail />} />
        {/* <Route path="/changePass" element={<ChangePassword />} /> */}
        <Route path="/tours" element={<ToursPages />} />
        <Route path="/tours/:id" element={<SingleTure />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/flight" element={<FlightPages />} />
        <Route path="/bus" element={<BusPage/>}/>
        <Route path="/hotel" element={<HotelPage/>}/>
       
        {/* Admin Router  */}
        <Route  path= '/admin' element={<AdminPage/>}>
        <Route path="/admin/dashboard" element={<AdminDash />} />
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
        <Route path="/admin/booking" element={<AdminBooking/>}/>

        </Route>
        {/* ✅ User Dashboard Panel */}
        <Route path="/user" element={<UserData/>}>
        <Route path="dashboard" element={<UserProfile/>} />
        <Route path="change-password" element={<ChangePassword/>} />
        <Route path="edit-profile" element={<UserEditProfile/>} />
        <Route path="bookings" element={<UserBooking/>} />
        <Route path="invoice" element={<UserInvoice/>} />
        <Route path="review" element={<UserReview/>} />
        <Route path="wishlist" element={<UserWishList/>} />
        <Route path="setting" element={<UserSetting/>} />
        </Route>
    
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;



