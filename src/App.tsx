import './App.css';
import {  Route, Routes,  Navigate } from 'react-router-dom'; // Correct import for routing
import Layout from './Layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';

import ProtectedRoute from './auth/ProtectedRoute';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';


function App() {

  return (
  
      <Routes>
         <Route element={<ProtectedRoute/>}>
         <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>} />
         <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>} />
         <Route path="/hotel/:hotelId/booking" element={<Layout><Booking/></Layout>} />
         <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>} />
         <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>}/>
         </Route>
        
         <Route path="/search" element={<Layout><Search /></Layout>}/>
         <Route path="/detail/:hotelId" element={<Layout><Detail /></Layout>}/>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/signin" element={<Layout><SignIn/></Layout>} />
      </Routes>
   
  );
}

export default App;
