import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  UserRound,
  Users,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getBookingsByUser } from "../../api/bookingApi";

import "./Dashboard.css";

const heroImages = [
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2200&q=90",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=90",
];

const roomImage =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=90";

function Dashboard() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentHero, setCurrentHero] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadBookings = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getBookingsByUser(user.userId);
        setBookings(data || []);
      } catch (err) {
        console.error("Dashboard booking error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your reservations."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [user?.userId]);


  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings
    .filter((booking) => {
      const checkIn = new Date(
        `${booking.checkinDate}T00:00:00`
      );

      return (
        checkIn >= today &&
        booking.status !== "CANCELLED"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.checkinDate) -
        new Date(b.checkinDate)
    );

  const nextBooking = upcomingBookings[0] || null;


  const getStatusClass = (status) => {
    if (status === "CONFIRMED") {
      return "status-confirmed";
    }

    if (status === "CANCELLED") {
      return "status-cancelled";
    }

    return "status-pending";
  };

  const previousHero = () => {
    setCurrentHero((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const nextHero = () => {
    setCurrentHero(
      (prev) => (prev + 1) % heroImages.length
    );
  };

  return (
    <div className="dashboard">

      <section className="dashboard-hero">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt="Luxury Haven hotel"
            className={`hero-image ${
              index === currentHero
                ? "hero-image-active"
                : ""
            }`}
          />
        ))}
        <div className="hero-overlay" />

        <header className="dashboard-navbar">

          <div className="dashboard-navbar-inner">

            <Link to="/" className="haven-logo">

              <div className="haven-logo-box">
                H
              </div>

              <div>
                <div className="haven-name">
                  HAVEN
                </div>

                <div className="haven-subtitle">
                  HOTEL & RESIDENCES
                </div>
              </div>

            </Link>

            <nav className="dashboard-nav">

              <Link to="/rooms">
                STAYS
              </Link>

              <a href="#experiences">
                EXPERIENCES
              </a>

              <a href="#about">
                ABOUT
              </a>

            </nav>

            <div className="dashboard-user">

              <UserRound size={17} />

              <span>
                {user?.userName || "Guest"}
              </span>

            </div>

          </div>

        </header>

        <div className="hero-content">

          <div className="hero-small-title">
            HAVEN / YOUR STAY
          </div>

          <h1>
            Welcome back,
            <br />

            <span>
              {user?.userName || "Guest"}.
            </span>
          </h1>

          <p>
            Everything you need for your stay,
            reservations and Haven experience,
            all in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/rooms"
              className="hero-primary-button"
            >
              EXPLORE ROOMS
              <ArrowUpRight size={16} />
            </Link>

            <Link
              to="/my-bookings"
              className="hero-secondary-button"
            >
              MY RESERVATIONS
            </Link>

          </div>

        </div>

        <div className="hero-controls">

          <button onClick={previousHero}>
            <ArrowLeft size={16} />
          </button>


          <div className="hero-dots">

            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentHero(index)
                }
                className={
                  index === currentHero
                    ? "hero-dot active"
                    : "hero-dot"
                }
              />
            ))}

          </div>


          <button onClick={nextHero}>
            <ArrowRight size={16} />
          </button>

        </div>

      </section>

      <main className="dashboard-main">

        <section className="quick-actions">

          <Link
            to="/rooms"
            className="action-card"
          >

            <BedDouble
              size={26}
              strokeWidth={1.3}
            />

            <div className="action-content">

              <span>
                EXPLORE
              </span>

              <h2>
                Find a room
              </h2>

              <p>
                Discover our collection of beautifully
                designed rooms and suites.
              </p>

            </div>

            <ArrowUpRight
              className="action-arrow"
              size={20}
            />

          </Link>

          <Link
            to="/my-bookings"
            className="action-card"
          >

            <CalendarDays
              size={26}
              strokeWidth={1.3}
            />

            <div className="action-content">

              <span>
                RESERVATIONS
              </span>

              <h2>
                My bookings
              </h2>

              <p>
                View, manage and track your
                Haven reservations.
              </p>

            </div>

            <ArrowUpRight
              className="action-arrow"
              size={20}
            />

          </Link>

          <Link
            to="/account"
            className="action-card"
          >

            <UserRound
              size={26}
              strokeWidth={1.3}
            />

            <div className="action-content">

              <span>
                PROFILE
              </span>

              <h2>
                My account
              </h2>

              <p>
                Manage your profile and
                personal information.
              </p>

            </div>

            <ArrowUpRight
              className="action-arrow"
              size={20}
            />

          </Link>

        </section>

        <section className="next-stay-section">

          <div className="section-heading">

            <div>

              <span>
                YOUR NEXT STAY
              </span>

              <h2>
                Your reservation.
              </h2>

            </div>

            <Link to="/my-bookings">
              VIEW ALL
              <ArrowUpRight size={15} />
            </Link>

          </div>

          {loading && (
            <div className="message-box">
              Loading your reservation...
            </div>
          )}

          {!loading && error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            !nextBooking && (

              <div className="empty-booking">

                <h3>
                  Nothing booked yet.
                </h3>

                <p>
                  Discover our rooms and
                  plan your next Haven stay.
                </p>

                <Link to="/rooms">
                  EXPLORE ROOMS
                  <ArrowUpRight size={16} />
                </Link>

              </div>
            )}

          {!loading &&
            !error &&
            nextBooking && (

              <div className="reservation-card">

                <div className="reservation-image">

                  <img
                    src={roomImage}
                    alt="Luxury Haven room"
                  />

                  <div className="reservation-image-overlay" />

                  <div className="room-image-label">

                    <span>
                      YOUR ROOM
                    </span>

                    <strong>
                      {nextBooking.roomNumber}
                    </strong>

                  </div>

                </div>

                <div className="reservation-details">

                  <div className="reservation-top">

                    <div>

                      <span>
                        ROOM
                      </span>

                      <h3>
                        {nextBooking.roomNumber}
                      </h3>

                      <p>
                        Booking #{nextBooking.bookingId}
                      </p>

                    </div>

                    <div
                      className={`booking-status ${getStatusClass(
                        nextBooking.status
                      )}`}
                    >
                      {nextBooking.status}
                    </div>

                  </div>


                  <div className="reservation-info">

                    <div>

                      <CalendarDays size={18} />

                      <span>
                        CHECK IN
                      </span>

                      <strong>
                        {formatDate(
                          nextBooking.checkinDate
                        )}
                      </strong>

                    </div>


                    <div>

                      <CalendarDays size={18} />

                      <span>
                        CHECK OUT
                      </span>

                      <strong>
                        {formatDate(
                          nextBooking.checkoutDate
                        )}
                      </strong>

                    </div>


                    <div>

                      <Users size={18} />

                      <span>
                        GUESTS
                      </span>

                      <strong>
                        {nextBooking.numberofGuests}{" "}
                        {nextBooking.numberofGuests === 1
                          ? "Guest"
                          : "Guests"}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>
            )}

        </section>

        {!loading &&
          !error &&
          bookings.length > 0 && (

            <section className="lower-dashboard">

              {nextBooking && (

                <div className="total-stay">

                  <div className="circle-decoration" />

                  <span>
                    TOTAL STAY
                  </span>

                  <h2>
                    ₹
                    {Number(
                      nextBooking.totalPrice || 0
                    ).toLocaleString("en-IN")}
                  </h2>

                  <p>
                    For your current reservation
                  </p>

                  <Link to="/my-bookings">
                    VIEW RESERVATION
                    <ArrowUpRight size={16} />
                  </Link>

                </div>
              )}

              <div className="history">

                <div className="history-heading">

                  <div>

                    <span>
                      HISTORY
                    </span>

                    <h2>
                      Recent reservations.
                    </h2>

                  </div>

                  <Link to="/my-bookings">
                    VIEW ALL
                    <ArrowUpRight size={15} />
                  </Link>

                </div>


                <div className="history-list">

                  {bookings
                    .slice(0, 4)
                    .map((booking) => (

                      <div
                        className="history-item"
                        key={booking.bookingId}
                      >

                        <div>

                          <span>
                            BOOKING
                          </span>

                          <strong>
                            #{booking.bookingId}
                          </strong>

                        </div>


                        <div>

                          <span>
                            ROOM
                          </span>

                          <strong>
                            {booking.roomNumber}
                          </strong>

                        </div>


                        <div>

                          <span>
                            STAY
                          </span>

                          <strong>
                            {formatDate(
                              booking.checkinDate
                            )}
                            {" — "}
                            {formatDate(
                              booking.checkoutDate
                            )}
                          </strong>

                        </div>


                        <div
                          className={`history-status ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </div>

                      </div>

                    ))}

                </div>

              </div>

            </section>
          )}

      </main>

      <footer className="dashboard-footer">

        <span>
          HAVEN HOTEL & RESIDENCES
        </span>

        <p>
          A place to stay. A place to remember.
        </p>

      </footer>

    </div>
  );
}

export default Dashboard;