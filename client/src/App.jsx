
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import SignupPage from './components/Pages/Sing';
import LoginPage from './components/Pages/Login';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/Dashboard/UserDashboard';
import Logout from './components/Pages/Logout';
// import AdminTable from './components/Admin/UserAdmin';
import Sidebar from './components/Admin/Salider';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        {/* Admin Router  */}
         <Route path="/admin" element={<Sidebar />}>
         </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



