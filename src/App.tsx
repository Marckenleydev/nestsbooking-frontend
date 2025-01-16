import './App.css';
import {  Route, Routes, BrowserRouter as Router } from 'react-router-dom'; // Correct import for routing
import Layout from './Layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
 // Ensure Home component is correctly imported

function App() {
  return (
    <Router> {/* Use BrowserRouter for routing */}
      <Routes>
        <Route path="/" element={<Layout><span>Home Page</span></Layout>} />
        <Route path="/*" element={<Layout><span>Serach Page</span></Layout>} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/signin" element={<Layout><SignIn/></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
