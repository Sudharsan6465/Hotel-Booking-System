import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LogOut,
  Menu,
  Users,
  XCircle,
  CreditCard,
} from "lucide-react";

import { getBookingsByUser, cancelBooking } from "../../api/bookingApi";
import { getPaymentByBooking } from "../../api/paymentApi";
import { useAuth } from "../../context/AuthContext";


function MyBookings() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  const [bookings, setBookings] = useState([]);

  const [paymentStatus, setPaymentStatus] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [cancellingId, setCancellingId] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const loadBookings = async () => {

    if (!user?.userId) {
      return;
    }


    try {

      setLoading(true);

      setError("");

      const data = await getBookingsByUser(
        user.userId
      );


      setBookings(data || []);


      const paymentResults = {};

      await Promise.all(

        (data || []).map(async (booking) => {

          try {

            const payment =
              await getPaymentByBooking(
                booking.bookingId
              );


            paymentResults[
              booking.bookingId
            ] = payment;

          } catch (err) {

            if (
              err.response?.status !== 404
            ) {

              console.error(
                `Payment check failed for booking ${booking.bookingId}`,
                err
              );

            }

          }

        })

      );


      setPaymentStatus(
        paymentResults
      );

    } catch (err) {

      console.error(
        "BOOKING LOAD ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to load your bookings."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadBookings();

  }, [user?.userId]);


  const formatDate = (date) => {

    if (!date) {
      return "-";
    }


    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  const formatPrice = (price) => {

    return Number(price || 0).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    );

  };


  const handleCancel = async (bookingId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this booking?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setCancellingId(bookingId);

      setError("");


      await cancelBooking(bookingId);


      setBookings((current) =>
        current.map((booking) =>
          booking.bookingId === bookingId
            ? {
                ...booking,
                status: "CANCELLED",
              }
            : booking
        )
      );

    } catch (err) {

      console.error(
        "CANCEL BOOKING ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to cancel booking."
      );

    } finally {

      setCancellingId(null);

    }

  };


  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  const renderStatus = (status) => {

    if (status === "APPROVED") {

      return (

        <span className="inline-flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-2 text-[8px] tracking-[0.15em] text-green-700">

          <CheckCircle2 size={13} />

          APPROVED

        </span>

      );

    }


    if (status === "PENDING") {

      return (

        <span className="inline-flex items-center gap-2 border border-amber-200 bg-amber-50 px-3 py-2 text-[8px] tracking-[0.15em] text-amber-700">

          <Clock3 size={13} />

          PENDING

        </span>

      );

    }


    if (status === "REJECTED") {

      return (

        <span className="inline-flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-2 text-[8px] tracking-[0.15em] text-red-700">

          <XCircle size={13} />

          REJECTED

        </span>

      );

    }


    if (status === "CANCELLED") {

      return (

        <span className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-2 text-[8px] tracking-[0.15em] text-gray-600">

          <XCircle size={13} />

          CANCELLED

        </span>

      );

    }


    if (status === "CHECKED_IN") {

      return (

        <span className="inline-flex items-center gap-2 bg-aubergine px-3 py-2 text-[8px] tracking-[0.15em] text-champagne">

          CHECKED IN

        </span>

      );

    }


    if (status === "CHECKED_OUT") {

      return (

        <span className="inline-flex items-center gap-2 border border-border bg-ivory px-3 py-2 text-[8px] tracking-[0.15em] text-muted">

          CHECKED OUT

        </span>

      );

    }


    return (

      <span className="border border-border px-3 py-2 text-[8px] tracking-[0.15em] text-muted">

        {status}

      </span>

    );

  };


  if (!user) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">

        <div className="text-center">

          <h1 className="font-serif text-4xl text-aubergine">

            Please sign in.

          </h1>


          <p className="mt-4 text-sm text-muted">

            Sign in to view your reservations.

          </p>


          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 bg-aubergine px-6 py-4 text-[10px] tracking-[0.2em] text-champagne"
          >

            SIGN IN

            <ArrowUpRight size={15} />

          </Link>

        </div>

      </main>

    );

  }


  return (

    <div className="min-h-screen bg-ivory">


      <header className="border-b border-border bg-ivory">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">


          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center border border-champagne">

              <span className="font-serif text-lg text-aubergine">
                H
              </span>

            </div>


            <div>

              <p className="text-sm tracking-[0.28em] text-aubergine">
                HAVEN
              </p>


              <p className="mt-1 text-[8px] tracking-[0.3em] text-muted">
                HOTEL & RESIDENCES
              </p>

            </div>

          </Link>


          <nav className="hidden items-center gap-8 md:flex">

            <Link
              to="/dashboard"
              className="text-xs text-muted transition hover:text-aubergine"
            >
              Dashboard
            </Link>


            <Link
              to="/rooms"
              className="text-xs text-muted transition hover:text-aubergine"
            >
              Stays
            </Link>


            <Link
              to="/my-bookings"
              className="text-xs font-medium text-aubergine"
            >
              My Bookings
            </Link>

          </nav>


          <div className="hidden items-center gap-5 md:flex">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center bg-aubergine font-serif text-sm text-champagne">

                {user.userName
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}

              </div>


              <div>

                <p className="text-xs font-medium text-aubergine">
                  {user.userName}
                </p>

                <p className="text-[8px] tracking-[0.12em] text-muted">
                  GUEST
                </p>

              </div>

            </div>


            <button
              onClick={handleLogout}
              className="text-muted transition hover:text-aubergine"
              title="Sign out"
            >

              <LogOut size={17} />

            </button>

          </div>


          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="text-aubergine md:hidden"
          >

            {mobileMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}

          </button>

        </div>


        {mobileMenuOpen && (

          <div className="border-t border-border bg-white px-6 py-5 md:hidden">

            <div className="flex flex-col gap-5">

              <Link
                to="/dashboard"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-sm text-aubergine"
              >
                Dashboard
              </Link>


              <Link
                to="/rooms"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-sm text-aubergine"
              >
                Stays
              </Link>


              <Link
                to="/my-bookings"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-sm text-aubergine"
              >
                My Bookings
              </Link>


              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-left text-sm text-muted"
              >

                <LogOut size={16} />

                Sign out

              </button>

            </div>

          </div>

        )}

      </header>


      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">


        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="mb-10 flex items-center gap-2 text-[9px] tracking-[0.18em] text-muted transition hover:text-aubergine"
        >

          <ArrowLeft size={15} />

          BACK TO DASHBOARD

        </button>


        <section className="flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] tracking-[0.3em] text-champagne">
              YOUR HAVEN
            </p>


            <h1 className="mt-4 font-serif text-5xl leading-tight text-aubergine sm:text-6xl">

              My
              <br />

              <em>
                bookings.
              </em>

            </h1>


            <p className="mt-5 max-w-lg text-sm leading-7 text-muted">

              View your reservations, manage
              your upcoming stays, and complete
              payment for approved bookings.

            </p>

          </div>


          <Link
            to="/rooms"
            className="group inline-flex items-center justify-center gap-2 self-start bg-aubergine px-6 py-4 text-[10px] tracking-[0.2em] text-champagne transition hover:bg-[#3b2541] md:self-auto"
          >

            EXPLORE STAYS

            <ArrowUpRight
              size={15}
              className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
            />

          </Link>

        </section>


        {error && (

          <div className="mt-8 flex items-center justify-between border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

            <span>
              {error}
            </span>


            <button
              onClick={() => setError("")}
            >

              <X size={17} />

            </button>

          </div>

        )}


        <section className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">


          <div className="bg-white p-7">

            <p className="text-[9px] tracking-[0.18em] text-muted">
              TOTAL BOOKINGS
            </p>


            <p className="mt-3 font-serif text-4xl text-aubergine">
              {bookings.length}
            </p>

          </div>


          <div className="bg-white p-7">

            <p className="text-[9px] tracking-[0.18em] text-muted">
              UPCOMING
            </p>


            <p className="mt-3 font-serif text-4xl text-aubergine">

              {
                bookings.filter(
                  (booking) =>
                    booking.status ===
                      "PENDING" ||
                    booking.status ===
                      "APPROVED"
                ).length
              }

            </p>

          </div>


          <div className="bg-white p-7">

            <p className="text-[9px] tracking-[0.18em] text-muted">
              PAID
            </p>


            <p className="mt-3 font-serif text-4xl text-aubergine">

              {
                bookings.filter(
                  (booking) =>
                    paymentStatus[
                      booking.bookingId
                    ]?.paymentStatus ===
                    "SUCCESS"
                ).length
              }

            </p>

          </div>

        </section>


        {loading && (

          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border border-t-aubergine" />

              <p className="mt-5 text-[9px] tracking-[0.2em] text-muted">
                LOADING YOUR RESERVATIONS
              </p>

            </div>

          </div>

        )}


        {!loading &&
          bookings.length === 0 && (

            <section className="mt-10 border border-border bg-white px-6 py-20 text-center">

              <CalendarDays
                size={40}
                className="mx-auto text-muted"
                strokeWidth={1.2}
              />


              <p className="mt-6 text-[10px] tracking-[0.25em] text-champagne">
                NO RESERVATIONS
              </p>


              <h2 className="mt-4 font-serif text-4xl text-aubergine">
                Your next escape
                <br />
                <em>
                  starts here.
                </em>
              </h2>


              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted">

                You don't have any bookings yet.
                Explore our rooms and find your
                perfect stay.

              </p>


              <Link
                to="/rooms"
                className="group mx-auto mt-8 inline-flex items-center gap-2 bg-aubergine px-7 py-4 text-[10px] tracking-[0.2em] text-champagne"
              >

                EXPLORE ROOMS

                <ArrowUpRight
                  size={15}
                  className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              </Link>

            </section>

          )}


        {!loading &&
          bookings.length > 0 && (

            <section className="mt-10 space-y-6">

              {bookings.map((booking) => {

                const payment =
                  paymentStatus[
                    booking.bookingId
                  ];


                const isPaid =
                  payment?.paymentStatus ===
                  "SUCCESS";


                const canPay =
                  booking.status ===
                    "APPROVED" &&
                  !isPaid;


                const canCancel =
                  booking.status ===
                    "PENDING" ||
                  booking.status ===
                    "APPROVED";


                return (

                  <article
                    key={booking.bookingId}
                    className="overflow-hidden border border-border bg-white"
                  >

                    <div className="flex flex-col justify-between gap-5 border-b border-border bg-ivory px-6 py-5 sm:flex-row sm:items-center sm:px-8">

                      <div>

                        <p className="text-[9px] tracking-[0.2em] text-muted">
                          RESERVATION #{booking.bookingId}
                        </p>


                        <h2 className="mt-2 font-serif text-3xl text-aubergine">
                          Room {booking.roomNumber}
                        </h2>

                      </div>


                      <div>

                        {renderStatus(
                          booking.status
                        )}

                      </div>

                    </div>


                    <div className="grid lg:grid-cols-[300px_1fr_0.38fr]">


                      <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">

                        <img
                          src={
                            booking.roomImage ||
                            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85"
                          }
                          alt={`Luxury room ${booking.roomNumber}`}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/70 via-transparent to-transparent" />


                        <div className="absolute bottom-5 left-5">

                          <p className="text-[8px] tracking-[0.25em] text-champagne">

                            HAVEN STAY

                          </p>


                          <p className="mt-1 font-serif text-2xl text-white">

                            Room {booking.roomNumber}

                          </p>

                        </div>

                      </div>


                      <div className="p-6 sm:p-8">


                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">


                          <div>

                            <div className="flex items-center gap-2">

                              <CalendarDays
                                size={15}
                                className="text-champagne"
                              />

                              <p className="text-[9px] tracking-[0.15em] text-muted">

                                CHECK-IN

                              </p>

                            </div>


                            <p className="mt-3 text-sm text-aubergine">

                              {formatDate(booking.checkinDate)}

                            </p>

                          </div>


                          <div>

                            <div className="flex items-center gap-2">

                              <CalendarDays
                                size={15}
                                className="text-champagne"
                              />

                              <p className="text-[9px] tracking-[0.15em] text-muted">

                                CHECK-OUT

                              </p>

                            </div>


                            <p className="mt-3 text-sm text-aubergine">

                              {formatDate(booking.checkoutDate)}

                            </p>

                          </div>


                          <div>

                            <div className="flex items-center gap-2">

                              <Users
                                size={15}
                                className="text-champagne"
                              />

                              <p className="text-[9px] tracking-[0.15em] text-muted">

                                GUESTS

                              </p>

                            </div>


                            <p className="mt-3 text-sm text-aubergine">

                              {booking.numberofGuests}{" "}

                              {booking.numberofGuests === 1
                                ? "Guest"
                                : "Guests"}

                            </p>

                          </div>


                          <div>

                            <p className="text-[9px] tracking-[0.15em] text-muted">

                              TOTAL

                            </p>


                            <p className="mt-2 font-serif text-2xl text-aubergine">

                              {formatPrice(booking.totalPrice)}

                            </p>

                          </div>

                        </div>


                        {isPaid && (

                          <div className="mt-8 border-t border-border pt-6">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


                              <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 items-center justify-center border border-green-200 bg-green-50">

                                  <CheckCircle2
                                    size={17}
                                    className="text-green-600"
                                  />

                                </div>


                                <div>

                                  <p className="text-xs font-medium text-aubergine">

                                    Payment successful

                                  </p>


                                  <p className="mt-1 text-[10px] leading-5 text-muted">

                                    {payment.paymentMethod}

                                    {" · "}

                                    {payment.transactionId}

                                  </p>

                                </div>

                              </div>


                              <span className="text-[9px] tracking-[0.15em] text-green-700">

                                PAID

                              </span>

                            </div>

                          </div>

                        )}

                      </div>


                      <div className="flex flex-col justify-center gap-3 border-t border-border bg-ivory p-6 lg:border-l lg:border-t-0 sm:p-8">


                        {canPay && (

                          <button
                            onClick={() =>
                              navigate(
                                "/payment",
                                {
                                  state: {
                                    booking: booking,
                                  },
                                }
                              )
                            }
                            className="group flex w-full items-center justify-center gap-2 bg-aubergine px-5 py-4 text-[9px] tracking-[0.18em] text-champagne transition hover:bg-[#3b2541]"
                          >

                            <CreditCard size={15} />

                            PAY NOW

                            <ArrowUpRight
                              size={14}
                              className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                            />

                          </button>

                        )}


                        {isPaid && (

                          <div className="flex items-center justify-center gap-2 border border-green-200 bg-green-50 px-5 py-4 text-[9px] tracking-[0.15em] text-green-700">

                            <CheckCircle2 size={15} />

                            PAYMENT COMPLETE

                          </div>

                        )}


                        {booking.status === "PENDING" && (

                          <div className="flex items-center justify-center gap-2 border border-amber-200 bg-amber-50 px-5 py-4 text-center text-[9px] tracking-[0.12em] text-amber-700">

                            <Clock3 size={15} />

                            AWAITING APPROVAL

                          </div>

                        )}


                        {booking.status === "REJECTED" && (

                          <div className="flex items-center justify-center gap-2 border border-red-200 bg-red-50 px-5 py-4 text-center text-[9px] tracking-[0.12em] text-red-700">

                            <XCircle size={15} />

                            BOOKING REJECTED

                          </div>

                        )}


                        {canCancel && (

                          <button
                            disabled={
                              cancellingId === booking.bookingId
                            }
                            onClick={() =>
                              handleCancel(
                                booking.bookingId
                              )
                            }
                            className="w-full border border-border px-5 py-3 text-[9px] tracking-[0.15em] text-muted transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {cancellingId === booking.bookingId
                              ? "CANCELLING..."
                              : "CANCEL BOOKING"}

                          </button>

                        )}

                      </div>

                    </div>

                  </article>

                );

              })}

            </section>

          )}

      </main>


      <footer className="border-t border-border">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 sm:flex-row lg:px-10">

          <p className="text-[9px] tracking-[0.3em] text-muted">
            HAVEN HOTEL & RESIDENCES
          </p>


          <p className="text-xs text-muted">
            Your reservations
          </p>

        </div>

      </footer>

    </div>

  );

}


export default MyBookings;