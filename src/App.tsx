import './App.css';
import {  Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'; // Correct import for routing
import Layout from './Layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';

import ProtectedRoute from './auth/ProtectedRoute';


function App() {

  return (
  
      <Routes>
         <Route element={<ProtectedRoute/>}>
         
         </Route>
         <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>} />
       
        <Route path="/" element={<Layout><span>Home Page</span></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/signin" element={<Layout><SignIn/></Layout>} />
      </Routes>
   
  );
}

export default App;
