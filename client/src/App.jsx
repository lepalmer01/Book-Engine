import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Mult from './components/Mult';

function App() {
  return (
    <>
      {/* <Mult /> */}
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;


//checkout assignement 20 & *26(app.jsx)
// Take proxy and create http link and wrap the main componenet and the provider (allows me to use backend and front end)
// Assignment 7-12 (mutations and queries) - everything has to match the backend