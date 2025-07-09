import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound/Notfound';
import Layout from './layout';
import { ToastContainer } from 'react-toastify';
import Account from './Pages/Account/Account';
import Event from './Pages/Event/Event';
import EventDetails from './Pages/EventDetails/EventDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="event" element={<Event />} />
           <Route path='event/:id' element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer richColors position="top-right" />
    </Router>
  );
}

export default App;
