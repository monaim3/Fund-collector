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
import History from './Pages/History/History';
import Payment from './Pages/Payment/Payment';
import PaymentDetails from './Pages/PaymentDetails/PaymentDetails';
import Vote from './Pages/Vote/Vote';
import VoteDetails from './Pages/VoteDetails/VoteDetails';

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
          <Route path="history" element={<History />} />
           <Route path='event/:id' element={<EventDetails />} />
           <Route path='payment' element={<Payment />} />
          <Route path="payment/:method" element={<PaymentDetails />} />
          <Route path="vote" element={<Vote />} />
           <Route path='vote/:id' element={<VoteDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer richColors position="top-right" />
    </Router>
  );
}

export default App;
