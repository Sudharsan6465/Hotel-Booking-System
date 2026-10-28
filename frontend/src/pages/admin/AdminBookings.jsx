import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  LogOut,
  Menu,
  Search,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAllBookings,
  updateBookingStatus,
} from "../../api/adminApi";

function AdminBookings() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [updatingId, setUpdatingId] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loadBookings = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getAllBookings();

      setBookings(data || []);

    } catch (err) {

      console.error(
        "ADMIN BOOKINGS ERROR:",
        err
      );

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
      (booking) =>
        booking.status === "PENDING"
    ).length;

    const approved = bookings.filter(
      (booking) =>
        booking.status === "APPROVED"
    ).length;

    const cancelled = bookings.filter(
      (booking) =>
        booking.status === "CANCELLED"
    ).length;

    return {
      total,
      pending,
      approved,
      cancelled,
    };

  }, [bookings]);

  const filteredBookings = useMemo(() => {

    const searchValue =
      search.trim().toLowerCase();

    return bookings.filter((booking) => {

      const matchesStatus =
        statusFilter === "ALL" ||
        booking.status === statusFilter;

      const matchesSearch =
        !searchValue ||

        String(
          booking.bookingId || ""
        )
          .toLowerCase()
          .includes(searchValue) ||

        String(
          booking.userName || ""
        )
          .toLowerCase()
          .includes(searchValue) ||

        String(
          booking.roomNumber || ""
        )
          .toLowerCase()
          .includes(searchValue);

      return (
        matchesStatus &&
        matchesSearch
      );

    });

  }, [
    bookings,
    search,
    statusFilter,
  ]);

  const handleStatusUpdate = async (
    bookingId,
    status
  ) => {

    const message =
      status === "APPROVED"
        ? "Approve this booking?"
        : "Cancel this booking?";

    const confirmed =
      window.confirm(message);

    if (!confirmed) {

      return;

    }

    try {

      setUpdatingId(bookingId);

      setError("");

      const updatedBooking =
        await updateBookingStatus(
          bookingId,
          status
        );

      setBookings(
        (currentBookings) =>
          currentBookings.map(
            (booking) =>
              booking.bookingId === bookingId
                ? updatedBooking
                : booking
          )
      );

    } catch (err) {

      console.error(
        "STATUS UPDATE ERROR:",
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

    if (!date) {

      return "—";

    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };

  const formatCurrency = (amount) => {

    return Number(
      amount || 0
    ).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    );

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

      default:

        return "admin-status pending";

    }

  };

  return (

    <div className="admin-page">

      <aside
        className={`admin-sidebar ${
          mobileMenuOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        <Link
          to="/admin"
          className="admin-brand"
          onClick={() =>
            setMobileMenuOpen(false)
          }
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
            className="admin-nav-item active"
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

            <CalendarDays size={18} />

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
              HAVEN / RESERVATIONS
            </span>

            <h1>
              Booking
              <em> management.</em>
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
              RESERVATIONS
            </span>

            <h2>

              Every stay,

              <br />

              <em>
                beautifully managed.
              </em>

            </h2>

          </div>

          <p>

            Review guest reservations,
            monitor booking status and
            keep every Haven stay running
            smoothly.

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

        <section className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">

          <button
            onClick={() =>
              setStatusFilter("ALL")
            }
            className={`bg-ivory p-6 text-left transition hover:bg-white ${
              statusFilter === "ALL"
                ? "border-t-2 border-aubergine"
                : ""
            }`}
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              ALL BOOKINGS
            </span>

            <strong className="mt-3 block font-serif text-4xl">
              {statistics.total}
            </strong>

          </button>

          <button
            onClick={() =>
              setStatusFilter("PENDING")
            }
            className={`bg-ivory p-6 text-left transition hover:bg-white ${
              statusFilter === "PENDING"
                ? "border-t-2 border-champagne"
                : ""
            }`}
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              PENDING
            </span>

            <strong className="mt-3 block font-serif text-4xl">
              {statistics.pending}
            </strong>

          </button>

          <button
            onClick={() =>
              setStatusFilter("APPROVED")
            }
            className={`bg-ivory p-6 text-left transition hover:bg-white ${
              statusFilter === "APPROVED"
                ? "border-t-2 border-green-600"
                : ""
            }`}
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              APPROVED
            </span>

            <strong className="mt-3 block font-serif text-4xl">
              {statistics.approved}
            </strong>

          </button>

          <button
            onClick={() =>
              setStatusFilter("CANCELLED")
            }
            className={`bg-ivory p-6 text-left transition hover:bg-white ${
              statusFilter === "CANCELLED"
                ? "border-t-2 border-red-500"
                : ""
            }`}
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              CANCELLED
            </span>

            <strong className="mt-3 block font-serif text-4xl">
              {statistics.cancelled}
            </strong>

          </button>

        </section>

        <section className="mt-8 flex flex-col gap-4 border border-border bg-white p-5 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">

            <Search
              size={17}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search booking, guest or room..."
              className="w-full border-0 border-b border-border bg-transparent py-3 pl-8 pr-3 text-sm text-ink outline-none transition focus:border-aubergine"
            />

          </div>

          <div className="flex items-center gap-3">

            <span className="text-[9px] tracking-[0.16em] text-muted">
              STATUS
            </span>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border border-border bg-ivory px-4 py-3 text-xs text-aubergine outline-none"
            >

              <option value="ALL">
                All bookings
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="CANCELLED">
                Cancelled
              </option>

            </select>

          </div>

        </section>

        <section className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <p className="text-[9px] tracking-[0.2em] text-muted">

              SHOWING{" "}

              {filteredBookings.length}

              {" "}OF{" "}

              {bookings.length}

              {" "}BOOKINGS

            </p>

            {statusFilter !== "ALL" && (

              <button
                onClick={() =>
                  setStatusFilter("ALL")
                }
                className="flex items-center gap-2 text-[9px] tracking-[0.15em] text-aubergine underline underline-offset-4"
              >

                CLEAR FILTER

                <X size={13} />

              </button>

            )}

          </div>

          {loading && (

            <div className="admin-loading">

              Loading reservations...

            </div>

          )}

          {!loading &&
            filteredBookings.length === 0 && (

              <div className="admin-empty">

                <Search
                  size={30}
                  className="mx-auto text-muted"
                  strokeWidth={1.2}
                />

                <h3 className="mt-5 font-serif text-3xl">
                  No bookings found.
                </h3>

                <p className="mt-3 text-sm text-muted">
                  Try changing your search or
                  status filter.
                </p>

              </div>

            )}

          {!loading &&
            filteredBookings.length > 0 && (

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
                        GUESTS
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

                    {filteredBookings.map(
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
                                  booking.userName ||
                                  "Guest"
                                }

                              </span>

                            </div>

                          </td>

                          <td>

                            {booking.roomNumber ||
                              "—"}

                          </td>

                          <td>

                            <div className="stay-cell">

                              <strong>

                                {
                                  formatDate(
                                    booking.checkinDate
                                  )
                                }

                              </strong>

                              <span>
                                to
                              </span>

                              <strong>

                                {
                                  formatDate(
                                    booking.checkoutDate
                                  )
                                }

                              </strong>

                            </div>

                          </td>

                          <td>

                            {
                              booking.numberofGuests ||
                              "—"
                            }

                          </td>

                          <td>

                            <strong className="amount">

                              {
                                formatCurrency(
                                  booking.totalPrice
                                )
                              }

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
                                title="View booking"
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

        <section className="mt-8 space-y-4 lg:hidden">

          {!loading &&
            filteredBookings.map(
              (booking) => (

                <div
                  key={`mobile-${booking.bookingId}`}
                  className="border border-border bg-white p-6"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[9px] tracking-[0.18em] text-muted">
                        BOOKING
                      </p>

                      <h3 className="mt-2 font-serif text-2xl">

                        #
                        {booking.bookingId}

                      </h3>

                    </div>

                    <span
                      className={statusClass(
                        booking.status
                      )}
                    >

                      {booking.status}

                    </span>

                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-6">

                    <div>

                      <p className="text-[9px] tracking-[0.15em] text-muted">
                        GUEST
                      </p>

                      <p className="mt-2 text-sm">

                        {booking.userName ||
                          "Guest"}

                      </p>

                    </div>

                    <div>

                      <p className="text-[9px] tracking-[0.15em] text-muted">
                        ROOM
                      </p>

                      <p className="mt-2 text-sm">

                        {booking.roomNumber ||
                          "—"}

                      </p>

                    </div>

                    <div>

                      <p className="text-[9px] tracking-[0.15em] text-muted">
                        CHECK IN
                      </p>

                      <p className="mt-2 text-sm">

                        {formatDate(
                          booking.checkinDate
                        )}

                      </p>

                    </div>

                    <div>

                      <p className="text-[9px] tracking-[0.15em] text-muted">
                        CHECK OUT
                      </p>

                      <p className="mt-2 text-sm">

                        {formatDate(
                          booking.checkoutDate
                        )}

                      </p>

                    </div>

                    <div>

                      <p className="text-[9px] tracking-[0.15em] text-muted">
                        GUESTS
                      </p>

                      <p className="mt-2 text-sm">

                        {
                          booking.numberofGuests ||
                          "—"
                        }

                      </p>

                    </div>

                    <div>

                      <p className="text-[9px] tracking-[0.15em] text-muted">
                        TOTAL
                      </p>

                      <p className="mt-2 font-serif text-xl">

                        {
                          formatCurrency(
                            booking.totalPrice
                          )
                        }

                      </p>

                    </div>

                  </div>

                  {booking.status ===
                    "PENDING" && (

                    <div className="mt-7 flex gap-3 border-t border-border pt-5">

                      <button
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
                        className="flex flex-1 items-center justify-center gap-2 bg-aubergine px-4 py-3 text-[9px] tracking-[0.15em] text-champagne transition hover:bg-[#3b2541] disabled:opacity-50"
                      >

                        <Check size={14} />

                        APPROVE

                      </button>

                      <button
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
                        className="flex flex-1 items-center justify-center gap-2 border border-red-200 px-4 py-3 text-[9px] tracking-[0.15em] text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                      >

                        <X size={14} />

                        CANCEL

                      </button>

                    </div>

                  )}

                </div>

              )
            )}

        </section>

        <footer className="mt-24 border-t border-border pt-8">

          <div className="flex flex-col justify-between gap-4 sm:flex-row">

            <p className="text-[9px] tracking-[0.3em] text-muted">
              HAVEN HOTEL & RESIDENCES
            </p>

            <p className="text-xs text-muted">
              Reservation Management
            </p>

          </div>

        </footer>

      </main>

    </div>

  );

}

export default AdminBookings;