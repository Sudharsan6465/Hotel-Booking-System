import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function MyAccount() {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();


  const [showLogoutMessage, setShowLogoutMessage] =
    useState(false);


  if (!user) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-aubergine px-6">

        <div className="text-center text-white">

          <p className="text-[10px] tracking-[0.3em] text-champagne">
            HAVEN HOTEL & RESIDENCES
          </p>

          <h1 className="mt-6 font-serif text-5xl">
            Please sign in.
          </h1>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-3 bg-champagne px-7 py-4 text-[10px] tracking-[0.2em] text-aubergine"
          >
            SIGN IN

            <ArrowUpRight size={15} />
          </Link>

        </div>

      </main>
    );

  }

  const handleLogout = () => {

    setShowLogoutMessage(true);

    logout();

    setTimeout(() => {

      navigate("/login");

    }, 700);

  };


  return (

    <main className="min-h-screen bg-[#f6f3ee]">

      <section className="relative overflow-hidden bg-aubergine">


        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90"
          alt="Luxury Haven interior"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />


        <div className="absolute inset-0 bg-aubergine/80" />

        <header className="relative z-10">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">


            <Link
              to="/dashboard"
              className="flex items-center gap-3 text-white"
            >

              <div className="flex h-11 w-11 items-center justify-center border border-champagne/70">

                <span className="font-serif text-xl text-champagne">
                  H
                </span>

              </div>

              <div>

                <p className="text-sm tracking-[0.3em]">
                  HAVEN
                </p>

                <p className="mt-1 text-[8px] tracking-[0.35em] text-white/40">
                  HOTEL & RESIDENCES
                </p>

              </div>

            </Link>


            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-[10px] tracking-[0.18em] text-white/60 transition hover:text-champagne"
            >

              <ArrowLeft size={15} />

              DASHBOARD

            </Link>

          </div>

        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28">

          <p className="text-[10px] tracking-[0.35em] text-champagne">

            PERSONAL SPACE

          </p>


          <h1 className="mt-6 font-serif text-6xl leading-none text-white sm:text-7xl">

            Your

            <br />

            <em className="text-champagne">
              Haven.
            </em>

          </h1>


          <p className="mt-7 max-w-xl text-sm leading-7 text-white/60">

            Manage your personal information,
            reservations and Haven experience
            from one place.

          </p>

        </div>

      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-24">

        <div className="mx-auto max-w-7xl">


          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            <div className="bg-white">

              <div className="border-b border-border p-8 sm:p-10">

                <div className="flex flex-col gap-7 sm:flex-row sm:items-center">


                  <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-aubergine">

                    <span className="font-serif text-3xl text-champagne">

                      {user.userName
                        ? user.userName
                            .charAt(0)
                            .toUpperCase()
                        : "H"}

                    </span>

                  </div>


                  <div>

                    <p className="text-[9px] tracking-[0.25em] text-champagne">

                      WELCOME BACK

                    </p>


                    <h2 className="mt-2 font-serif text-4xl text-aubergine">

                      {user.userName}

                    </h2>


                    <div className="mt-3 flex items-center gap-2">

                      <span className="h-2 w-2 rounded-full bg-green-500" />

                      <span className="text-[10px] tracking-[0.15em] text-muted">

                        ACCOUNT ACTIVE

                      </span>

                    </div>

                  </div>

                </div>

              </div>

              <div className="p-8 sm:p-10">

                <p className="text-[10px] tracking-[0.25em] text-champagne">

                  PERSONAL INFORMATION

                </p>


                <h3 className="mt-4 font-serif text-3xl text-aubergine">

                  Your details

                </h3>


                <div className="mt-8 grid gap-5 sm:grid-cols-2">


                  <div className="border border-border p-5">

                    <div className="flex items-center gap-3">

                      <User
                        size={17}
                        className="text-champagne"
                      />

                      <span className="text-[9px] tracking-[0.18em] text-muted">

                        FULL NAME

                      </span>

                    </div>


                    <p className="mt-4 text-sm text-ink">

                      {user.userName || "Not available"}

                    </p>

                  </div>

                  <div className="border border-border p-5">

                    <div className="flex items-center gap-3">

                      <Mail
                        size={17}
                        className="text-champagne"
                      />

                      <span className="text-[9px] tracking-[0.18em] text-muted">

                        EMAIL ADDRESS

                      </span>

                    </div>


                    <p className="mt-4 break-all text-sm text-ink">

                      {user.email || "Not available"}

                    </p>

                  </div>

                  <div className="border border-border p-5">

                    <div className="flex items-center gap-3">

                      <ShieldCheck
                        size={17}
                        className="text-champagne"
                      />

                      <span className="text-[9px] tracking-[0.18em] text-muted">

                        ACCOUNT ID

                      </span>

                    </div>


                    <p className="mt-4 text-sm text-ink">

                      #{user.userId}

                    </p>

                  </div>

                  <div className="border border-border p-5">

                    <div className="flex items-center gap-3">

                      <Check
                        size={17}
                        className="text-champagne"
                      />

                      <span className="text-[9px] tracking-[0.18em] text-muted">

                        ACCOUNT TYPE

                      </span>

                    </div>


                    <p className="mt-4 text-sm text-ink">

                      {user.role}

                    </p>

                  </div>

                </div>

              </div>

            </div>

            <aside className="space-y-5">


              <div className="bg-aubergine p-7 text-white sm:p-8">

                <p className="text-[9px] tracking-[0.25em] text-champagne">

                  YOUR HAVEN

                </p>


                <h3 className="mt-4 font-serif text-3xl">

                  Quick access

                </h3>


                <div className="mt-7 space-y-2">


                  <Link
                    to="/my-bookings"
                    className="group flex items-center justify-between border-b border-white/10 py-4"
                  >

                    <div className="flex items-center gap-3">

                      <CalendarDays
                        size={16}
                        className="text-champagne"
                      />

                      <span className="text-xs">
                        My Bookings
                      </span>

                    </div>


                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  </Link>


                  <Link
                    to="/reviews"
                    className="group flex items-center justify-between border-b border-white/10 py-4"
                  >

                    <div className="flex items-center gap-3">

                      <StarIcon />

                      <span className="text-xs">
                        My Reviews
                      </span>

                    </div>


                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  </Link>


                  <Link
                    to="/rooms"
                    className="group flex items-center justify-between py-4"
                  >

                    <div className="flex items-center gap-3">

                      <ArrowUpRight
                        size={16}
                        className="text-champagne"
                      />

                      <span className="text-xs">
                        Explore Rooms
                      </span>

                    </div>


                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  </Link>

                </div>

              </div>


              <div className="bg-white p-7 sm:p-8">

                <p className="text-[9px] tracking-[0.25em] text-champagne">

                  NEED ASSISTANCE?

                </p>


                <h3 className="mt-4 font-serif text-3xl text-aubergine">

                  We're here for you.

                </h3>


                <p className="mt-4 text-sm leading-7 text-muted">

                  Our guest relations team is
                  always available to make your
                  stay exceptional.

                </p>


                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">

                  <Phone
                    size={16}
                    className="text-champagne"
                  />

                  <span className="text-xs text-ink">

                    Guest Relations

                  </span>

                </div>

              </div>


              <button
                onClick={handleLogout}
                className="group flex w-full items-center justify-between border border-red-200 bg-white px-7 py-5 text-left transition hover:border-red-400 hover:bg-red-50"
              >

                <span className="text-[10px] font-medium tracking-[0.2em] text-red-600">

                  SIGN OUT

                </span>


                <ArrowUpRight
                  size={16}
                  className="text-red-500 transition group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              </button>

            </aside>

          </div>

        </div>

      </section>

      {showLogoutMessage && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-aubergine/80 backdrop-blur-sm">

          <div className="bg-ivory px-10 py-10 text-center">

            <Check
              size={30}
              className="mx-auto text-champagne"
            />


            <h2 className="mt-5 font-serif text-3xl text-aubergine">

              Signed out

            </h2>


            <p className="mt-3 text-sm text-muted">

              Thank you for staying with Haven.

            </p>

          </div>

        </div>

      )}


      <footer className="bg-aubergine px-6 py-8 lg:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">

          <p className="text-[9px] tracking-[0.3em] text-white/40">

            HAVEN HOTEL & RESIDENCES

          </p>


          <p className="text-[9px] tracking-[0.2em] text-white/25">

            EVERY STAY. A STORY.

          </p>

        </div>

      </footer>

    </main>

  );

}

function StarIcon() {

  return (

    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-champagne"
    >

      <path d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z" />

    </svg>

  );

}


export default MyAccount;