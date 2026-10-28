import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAllBookings,
  updateBookingStatus,
} from "../../api/adminApi";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllBookings();

      setBookings(data || []);
    } catch (err) {
      console.error("Admin booking error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const statistics = useMemo(() => {
    const total = bookings.length;

    const pending = bookings.filter(
      (booking) => booking.status === "PENDING"
    ).length;

    const approved = bookings.filter(
      (booking) => booking.status === "APPROVED"
    ).length;

    const cancelled = bookings.filter(
      (booking) => booking.status === "CANCELLED"
    ).length;

    const revenue = bookings
      .filter(
        (booking) =>
          booking.status !== "CANCELLED"
      )
      .reduce(
        (sum, booking) =>
          sum + Number(booking.totalPrice || 0),
        0
      );

    return {
      total,
      pending,
      approved,
      cancelled,
      revenue,
    };
  }, [bookings]);

  const handleStatusUpdate = async (
    bookingId,
    status
  ) => {
    try {
      setUpdatingId(bookingId);
      setError("");

      const updatedBooking =
        await updateBookingStatus(
          bookingId,
          status
        );

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.bookingId === bookingId
            ? updatedBooking
            : booking
        )
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to update booking status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusClass = (status) => {
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

      case "PENDING":
      default:
        return "admin-status pending";
    }
  };

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 6);

  return (
    <div className="admin-page">

      <aside
        className={`admin-sidebar ${
          mobileMenuOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-brand">

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

        </div>

        <div className="admin-panel-label">
          ADMINISTRATION
        </div>

        <nav className="admin-navigation">

          <Link
            to="/admin"
            className="admin-nav-item active"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <CalendarDays size={18} />

            <span>
              Dashboard
            </span>
          </Link>

          <Link
            to="/admin/bookings"
            className="admin-nav-item"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <Clock3 size={18} />

            <span>
              Bookings
            </span>
          </Link>

          <Link
            to="/admin/rooms"
            className="admin-nav-item"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <BedDouble size={18} />

            <span>
              Rooms
            </span>
          </Link>

          <Link
            to="/admin/users"
            className="admin-nav-item"
            onClick={() =>
              setMobileMenuOpen(false)
            }
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

      {mobileMenuOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />
      )}

      <main className="admin-main">

        <header className="admin-topbar">

          <button
            className="admin-mobile-menu"
            onClick={() =>
              setMobileMenuOpen(true)
            }
          >
            <Menu size={21} />
          </button>

          <div>

            <span className="admin-eyebrow">
              HAVEN / ADMINISTRATION
            </span>

            <h1>
              Good morning,{" "}
              <em>
                {user?.userName || "Admin"}.
              </em>
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

        <section className="admin-intro">

          <div>

            <span>
              OVERVIEW
            </span>

            <h2>
              Your Haven,
              <br />
              <em>
                at a glance.
              </em>
            </h2>

          </div>

          <p>
            Monitor reservations, manage your
            rooms and keep track of the Haven
            guest experience from one place.
          </p>

        </section>

        {error && (
          <div className="admin-error">

            <span>
              {error}
            </span>

            <button
              onClick={loadBookings}
            >
              TRY AGAIN
            </button>

          </div>
        )}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon">
              <CalendarDays size={20} />
            </div>

            <span>
              TOTAL BOOKINGS
            </span>

            <strong>
              {loading
                ? "—"
                : statistics.total}
            </strong>

            <small>
              All reservations
            </small>

          </div>

          <div className="admin-stat-card highlight">

            <div className="stat-icon">
              <Clock3 size={20} />
            </div>

            <span>
              PENDING
            </span>

            <strong>
              {loading
                ? "—"
                : statistics.pending}
            </strong>

            <small>
              Require attention
            </small>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon">
              <Check size={20} />
            </div>

            <span>
              APPROVED
            </span>

            <strong>
              {loading
                ? "—"
                : statistics.approved}
            </strong>

            <small>
              Active reservations
            </small>

          </div>

          <div className="admin-stat-card dark">

            <div className="stat-icon">
              <ArrowUpRight size={20} />
            </div>

            <span>
              REVENUE
            </span>

            <strong>
              ₹
              {loading
                ? "—"
                : statistics.revenue.toLocaleString(
                    "en-IN"
                  )}
            </strong>

            <small>
              Non-cancelled bookings
            </small>

          </div>

        </section>

        <section className="admin-bookings-section">

          <div className="admin-section-header">

            <div>

              <span>
                RESERVATIONS
              </span>

              <h2>
                Recent bookings.
              </h2>

            </div>

            <Link to="/admin/bookings">

              VIEW ALL

              <ArrowUpRight size={15} />

            </Link>

          </div>

          {loading ? (

            <div className="admin-loading">
              Loading reservations...
            </div>

          ) : recentBookings.length === 0 ? (

            <div className="admin-empty">
              No bookings found.
            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>
                      BOOKING
                    </th>

                    <th>
                      GUEST
                    </th>

                    <th>
                      ROOM
                    </th>

                    <th>
                      STAY
                    </th>

                    <th>
                      AMOUNT
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentBookings.map(
                    (booking) => (

                      <tr
                        key={
                          booking.bookingId
                        }
                      >

                        <td>

                          <strong>
                            #
                            {
                              booking.bookingId
                            }
                          </strong>

                        </td>

                        <td>

                          <div className="guest-cell">

                            <div className="guest-avatar">

                              {booking.userName
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "G"}

                            </div>

                            <span>
                              {
                                booking.userName
                              }
                            </span>

                          </div>

                        </td>

                        <td>
                          {
                            booking.roomNumber
                          }
                        </td>

                        <td>

                          <div className="stay-cell">

                            <strong>
                              {formatDate(
                                booking.checkinDate
                              )}
                            </strong>

                            <span>
                              to
                            </span>

                            <strong>
                              {formatDate(
                                booking.checkoutDate
                              )}
                            </strong>

                          </div>

                        </td>

                        <td>

                          <strong className="amount">

                            ₹
                            {Number(
                              booking.totalPrice ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </td>

                        <td>

                          <span
                            className={statusClass(
                              booking.status
                            )}
                          >
                            {
                              booking.status
                            }
                          </span>

                        </td>

                        <td>

                          {booking.status ===
                          "PENDING" ? (

                            <div className="booking-actions">

                              <button
                                title="Approve booking"
                                disabled={
                                  updatingId ===
                                  booking.bookingId
                                }
                                onClick={() =>
                                  handleStatusUpdate(
                                    booking.bookingId,
                                    "APPROVED"
                                  )
                                }
                                className="confirm-action"
                              >

                                <Check
                                  size={15}
                                />

                              </button>

                              <button
                                title="Cancel booking"
                                disabled={
                                  updatingId ===
                                  booking.bookingId
                                }
                                onClick={() =>
                                  handleStatusUpdate(
                                    booking.bookingId,
                                    "CANCELLED"
                                  )
                                }
                                className="cancel-action"
                              >

                                <X
                                  size={15}
                                />

                              </button>

                            </div>

                          ) : (

                            <Link
                              to={`/admin/bookings/${booking.bookingId}`}
                              className="view-action"
                            >

                              <ChevronRight
                                size={17}
                              />

                            </Link>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        <section className="admin-management">

          <Link
            to="/admin/bookings"
            className="management-card"
          >

            <CalendarDays size={24} />

            <div>

              <span>
                MANAGEMENT
              </span>

              <h3>
                All reservations
              </h3>

              <p>
                Review and manage every
                guest booking.
              </p>

            </div>

            <ArrowUpRight size={20} />

          </Link>

          <Link
            to="/admin/rooms"
            className="management-card"
          >

            <BedDouble size={24} />

            <div>

              <span>
                MANAGEMENT
              </span>

              <h3>
                Room inventory
              </h3>

              <p>
                Manage Haven rooms,
                availability and pricing.
              </p>

            </div>

            <ArrowUpRight size={20} />

          </Link>

          <Link
            to="/admin/users"
            className="management-card"
          >

            <Users size={24} />

            <div>

              <span>
                MANAGEMENT
              </span>

              <h3>
                Guests
              </h3>

              <p>
                View registered Haven
                customers.
              </p>

            </div>

            <ArrowUpRight size={20} />

          </Link>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;