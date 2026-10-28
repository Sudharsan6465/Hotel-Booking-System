import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Rooms from "./pages/public/Rooms";
import RoomDetails from "./pages/customer/RoomDetails";
import MyBookings from "./pages/customer/MyBookings";
import Payment from "./pages/customer/Payment";
import Reviews from "./pages/customer/Reviews";
import Booking from "./pages/booking/Booking";
import MyAccount from "./pages/account/MyAccount";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminBookingDetails from "./pages/admin/AdminBookingDetails";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminUsers from "./pages/admin/AdminUsers";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AdminRoute from "./pages/auth/AdminRoute";
import Register from "./pages/auth/Register";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/rooms" element={<Rooms />} />

        <Route path="/rooms/:roomId" element={<RoomDetails />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />}/>

          <Route path="/booking/:roomId" element={<Booking />} />

          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/payment" element={<Payment />} />

          <Route path="/reviews" element={<Reviews />} />

          <Route path="/account" element={<MyAccount />} />

        </Route>

        <Route element={<AdminRoute />}>

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin/bookings" element={<AdminBookings />} />

          <Route path="/admin/bookings/:bookingId" element={<AdminBookingDetails />} />

          <Route path="/admin/rooms" element={<AdminRooms />} />

          <Route path="/admin/users" element={<AdminUsers />} />

        </Route>

        <Route path="*" element={<Home />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;