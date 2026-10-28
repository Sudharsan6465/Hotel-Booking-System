import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  LogOut,
  User,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getBookingById,
  updateBookingStatus,
} from "../../api/adminApi";

function AdminBookingDetails() {
  const { bookingId } = useParams();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    const loadBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBookingById(bookingId);

        setBooking(data);

      } catch (err) {
        console.error("BOOKING DETAILS ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId]);

  const handleStatusUpdate = async (status) => {

    let message;

    if (status === "APPROVED") {
      message =
        "Are you sure you want to approve this booking?";
    } else {
      message =
        "Are you sure you want to cancel this booking?";
    }

    if (!window.confirm(message)) {
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const updated = await updateBookingStatus(
        bookingId,
        status
      );

      setBooking(updated);

    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to update booking."
      );

    } finally {
      setUpdating(false);
    }
  };


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    );
  };

  const getStatusClass = (status) => {
    switch (status) {

      case "APPROVED":
        return "admin-status confirmed";

      case "CANCELLED":
        return "admin-status cancelled";

      case "REJECTED":
        return "admin-status cancelled";

      case "CHECKED_IN":
        return "admin-status confirmed";

      case "CHECKED_OUT":
        return "admin-status confirmed";

      default:
        return "admin-status pending";
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <main className="admin-main">

          <div className="admin-loading">
            Loading booking details...
          </div>

        </main>
      </div>
    );
  }


  if (!booking) {
    return (
      <div className="admin-page">

        <main className="admin-main">

          <Link
            to="/admin/bookings"
            className="mb-8 inline-flex items-center gap-2 text-xs text-aubergine"
          >
            <ArrowLeft size={15} />

            Back to bookings
          </Link>


          <div className="admin-empty">

            <h2 className="font-serif text-3xl">
              Booking not found.
            </h2>

            <p className="mt-3 text-sm text-muted">
              {error ||
                "The requested booking could not be found."}
            </p>

          </div>

        </main>

      </div>
    );
  }


  return (
    <div className="admin-page">

      <aside className="admin-sidebar">

        <Link
          to="/admin"
          className="admin-brand"
        >

          <div className="admin-logo">
            H
          </div>

          <div>

            <div className="admin-brand-name">
              HAVEN
            </div>

            <div className="admin-brand-subtitle">
              HOTEL & RESIDENCES
            </div>

          </div>

        </Link>

        <div className="admin-panel-label">
          ADMINISTRATION
        </div>

        <nav className="admin-navigation">

          <Link
            to="/admin"
            className="admin-nav-item"
          >

            <CalendarDays size={18} />

            <span>
              Dashboard
            </span>

          </Link>


          <Link
            to="/admin/bookings"
            className="admin-nav-item active"
          >

            <Clock3 size={18} />

            <span>
              Bookings
            </span>

          </Link>


          <Link
            to="/admin/rooms"
            className="admin-nav-item"
          >

            <CalendarDays size={18} />

            <span>
              Rooms
            </span>

          </Link>


          <Link
            to="/admin/users"
            className="admin-nav-item"
          >

            <Users size={18} />

            <span>
              Users
            </span>

          </Link>

        </nav>

        <div className="admin-sidebar-bottom">

          <div className="admin-user">

            <div className="admin-user-avatar">

              {user?.userName
                ?.charAt(0)
                ?.toUpperCase() || "A"}

            </div>


            <div>

              <strong>
                {user?.userName ||
                  "Administrator"}
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>


          <button
            className="admin-logout"
            onClick={handleLogout}
          >

            <LogOut size={17} />

            <span>
              Sign out
            </span>

          </button>

        </div>

      </aside>
      <main className="admin-main">

        <header className="admin-topbar">

          <div>

            <span className="admin-eyebrow">
              HAVEN / RESERVATIONS / #
              {booking.bookingId}
            </span>

            <h1>
              Booking
              <em> details.</em>
            </h1>

          </div>


          <div className="admin-topbar-right">

            <span className="admin-role">
              ADMIN
            </span>


            <button
              onClick={handleLogout}
              className="topbar-logout"
            >

              <LogOut size={16} />

            </button>

          </div>

        </header>

        <div className="mt-10">

          <Link
            to="/admin/bookings"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.16em] text-muted transition hover:text-aubergine"
          >

            <ArrowLeft size={15} />

            BACK TO BOOKINGS

          </Link>

        </div>

        <section className="mt-10 flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] tracking-[0.3em] text-champagne">
              RESERVATION
            </p>


            <h2 className="mt-4 font-serif text-5xl sm:text-6xl">

              #{booking.bookingId}

            </h2>


            <p className="mt-4 text-sm text-muted">

              Created{" "}

              {booking.createdAt
                ? new Date(
                    booking.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "—"}

            </p>

          </div>


          <div>

            <span
              className={getStatusClass(
                booking.status
              )}
            >

              {booking.status}

            </span>

          </div>

        </section>

        {error && (

          <div className="admin-error mt-8">

            <span>
              {error}
            </span>

          </div>

        )}

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="border border-border bg-white p-8">

            <User
              size={22}
              strokeWidth={1.3}
            />

            <p className="mt-8 text-[9px] tracking-[0.2em] text-muted">
              GUEST
            </p>


            <h3 className="mt-3 font-serif text-3xl">

              {booking.userName ||
                "Guest"}

            </h3>


            <p className="mt-3 text-sm text-muted">
              Registered Haven guest
            </p>

          </div>


          <div className="border border-border bg-white p-8">

            <CalendarDays
              size={22}
              strokeWidth={1.3}
            />

            <p className="mt-8 text-[9px] tracking-[0.2em] text-muted">
              ROOM
            </p>


            <h3 className="mt-3 font-serif text-3xl">

              {booking.roomNumber ||
                "—"}

            </h3>


            <p className="mt-3 text-sm text-muted">
              Assigned room
            </p>

          </div>

          <div className="border border-border bg-white p-8">

            <Users
              size={22}
              strokeWidth={1.3}
            />

            <p className="mt-8 text-[9px] tracking-[0.2em] text-muted">
              GUESTS
            </p>


            <h3 className="mt-3 font-serif text-3xl">

              {booking.numberofGuests ||
                "—"}

            </h3>


            <p className="mt-3 text-sm text-muted">
              Number of guests
            </p>

          </div>

        </section>

        <section className="mt-6 border border-border bg-white">


          <div className="border-b border-border px-8 py-6">

            <p className="text-[9px] tracking-[0.22em] text-champagne">
              STAY INFORMATION
            </p>


            <h3 className="mt-2 font-serif text-3xl">
              Your reservation.
            </h3>

          </div>


          <div className="grid md:grid-cols-2">

            <div className="border-b border-border p-8 md:border-r">

              <p className="text-[9px] tracking-[0.18em] text-muted">
                CHECK IN
              </p>


              <p className="mt-4 font-serif text-3xl">

                {formatDate(
                  booking.checkinDate
                )}

              </p>

            </div>

            <div className="border-b border-border p-8">

              <p className="text-[9px] tracking-[0.18em] text-muted">
                CHECK OUT
              </p>


              <p className="mt-4 font-serif text-3xl">

                {formatDate(
                  booking.checkoutDate
                )}

              </p>

            </div>

            <div className="p-8 md:border-r">

              <p className="text-[9px] tracking-[0.18em] text-muted">
                TOTAL PRICE
              </p>


              <p className="mt-4 font-serif text-3xl text-aubergine">

                {formatCurrency(
                  booking.totalPrice
                )}

              </p>

            </div>

            <div className="p-8">

              <p className="text-[9px] tracking-[0.18em] text-muted">
                BOOKED ON
              </p>


              <p className="mt-4 text-sm">

                {booking.createdAt
                  ? new Date(
                      booking.createdAt
                    ).toLocaleString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "—"}

              </p>

            </div>

          </div>

        </section>

        {booking.status ===
          "PENDING" && (

          <section className="mt-8 border border-champagne/40 bg-[#fffaf2] p-8">

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">


              <div>

                <p className="text-[9px] tracking-[0.2em] text-champagne">
                  ACTION REQUIRED
                </p>


                <h3 className="mt-3 font-serif text-3xl">
                  This reservation is pending.
                </h3>


                <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                  Review the reservation details
                  before approving or cancelling
                  the guest's stay.
                </p>

              </div>


              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  disabled={updating}
                  onClick={() =>
                    handleStatusUpdate(
                      "APPROVED"
                    )
                  }
                  className="group flex items-center justify-center gap-3 bg-aubergine px-7 py-4 text-[10px] tracking-[0.18em] text-champagne transition hover:bg-[#3b2541] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <Check size={16} />

                  {updating
                    ? "UPDATING..."
                    : "APPROVE BOOKING"}

                  {!updating && (

                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  )}

                </button>

                <button
                  disabled={updating}
                  onClick={() =>
                    handleStatusUpdate(
                      "CANCELLED"
                    )
                  }
                  className="flex items-center justify-center gap-2 border border-red-200 bg-white px-7 py-4 text-[10px] tracking-[0.18em] text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <X size={16} />

                  CANCEL BOOKING

                </button>

              </div>

            </div>

          </section>

        )}

        {booking.status ===
          "APPROVED" && (

          <section className="mt-8 border border-green-200 bg-green-50 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">

                <Check size={20} />

              </div>


              <div>

                <p className="text-[9px] tracking-[0.2em] text-green-700">
                  RESERVATION APPROVED
                </p>


                <p className="mt-2 text-sm text-green-800">
                  This reservation has been
                  approved successfully.
                </p>

              </div>

            </div>

          </section>

        )}


        {booking.status ===
          "REJECTED" && (

          <section className="mt-8 border border-red-200 bg-red-50 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-700">

                <X size={20} />

              </div>


              <div>

                <p className="text-[9px] tracking-[0.2em] text-red-700">
                  RESERVATION REJECTED
                </p>


                <p className="mt-2 text-sm text-red-800">
                  This reservation has been rejected.
                </p>

              </div>

            </div>

          </section>

        )}

        {booking.status ===
          "CANCELLED" && (

          <section className="mt-8 border border-red-200 bg-red-50 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-700">

                <X size={20} />

              </div>


              <div>

                <p className="text-[9px] tracking-[0.2em] text-red-700">
                  RESERVATION CANCELLED
                </p>


                <p className="mt-2 text-sm text-red-800">
                  This reservation has been cancelled.
                </p>

              </div>

            </div>

          </section>

        )}


        {booking.status ===
          "CHECKED_IN" && (

          <section className="mt-8 border border-blue-200 bg-blue-50 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">

                <Check size={20} />

              </div>


              <div>

                <p className="text-[9px] tracking-[0.2em] text-blue-700">
                  GUEST CHECKED IN
                </p>


                <p className="mt-2 text-sm text-blue-800">
                  The guest has checked into
                  this reservation.
                </p>

              </div>

            </div>

          </section>

        )}


        {booking.status ===
          "CHECKED_OUT" && (

          <section className="mt-8 border border-gray-200 bg-gray-50 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700">

                <Check size={20} />

              </div>


              <div>

                <p className="text-[9px] tracking-[0.2em] text-gray-700">
                  GUEST CHECKED OUT
                </p>


                <p className="mt-2 text-sm text-gray-800">
                  The guest has completed
                  this stay.
                </p>

              </div>

            </div>

          </section>

        )}


        <footer className="mt-24 border-t border-border pt-8 pb-10">

          <div className="flex flex-col justify-between gap-4 sm:flex-row">

            <p className="text-[9px] tracking-[0.3em] text-muted">
              HAVEN HOTEL & RESIDENCES
            </p>


            <p className="text-xs text-muted">
              Reservation #{booking.bookingId}
            </p>

          </div>

        </footer>

      </main>

    </div>
  );
}

export default AdminBookingDetails;