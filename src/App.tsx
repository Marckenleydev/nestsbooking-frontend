import './App.css';
import {  Route, Routes,  Navigate } from 'react-router-dom'; // Correct import for routing
import Layout from './Layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';

import ProtectedRoute from './auth/ProtectedRoute';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';


function App() {

  return (
  
      <Routes>
         <Route element={<ProtectedRoute/>}>
         <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>} />
         <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>} />
         <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>} />
         </Route>
        
       
        <Route path="/" element={<Layout><span>Home Page</span></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/signin" element={<Layout><SignIn/></Layout>} />
      </Routes>
   
  );
}

export default App;
