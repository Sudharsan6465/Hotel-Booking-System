import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getRoomById } from "../../api/roomApi";
import { createBooking } from "../../api/bookingApi";
import { useAuth } from "../../context/AuthContext";


const luxuryImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",

  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",

  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",

  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90",
];


function Booking() {

  const { roomId } = useParams();

  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const [room, setRoom] = useState(null);

  const [checkinDate, setCheckinDate] =
    useState("");

  const [checkoutDate, setCheckoutDate] =
    useState("");

  const [numberofGuests, setNumberofGuests] =
    useState(1);

  const [activeImage, setActiveImage] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [booking, setBooking] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {

    if (!isAuthenticated) {

      navigate("/login");

      return;

    }


    const fetchRoom = async () => {

      try {

        setLoading(true);

        setError("");


        const data =
          await getRoomById(roomId);


        setRoom(data);


        if (
          data.capacity &&
          data.capacity > 0
        ) {

          setNumberofGuests(1);

        }

      } catch (err) {

        console.error(
          "ROOM ERROR:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load room."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchRoom();

  }, [
    roomId,
    isAuthenticated,
    navigate,
  ]);

  const images = useMemo(() => {

    if (
      room?.imageUrls &&
      room.imageUrls.length > 0
    ) {

      return room.imageUrls;

    }


    return luxuryImages;

  }, [room]);

  const numberOfNights = useMemo(() => {

    if (
      !checkinDate ||
      !checkoutDate
    ) {

      return 0;

    }


    const checkin =
      new Date(checkinDate);

    const checkout =
      new Date(checkoutDate);


    const difference =
      checkout.getTime() -
      checkin.getTime();


    const nights =
      difference /
      (1000 * 60 * 60 * 24);


    return nights > 0
      ? nights
      : 0;

  }, [
    checkinDate,
    checkoutDate,
  ]);

  const totalPrice = useMemo(() => {

    if (
      !room ||
      numberOfNights <= 0
    ) {

      return 0;

    }


    return (
      Number(room.pricePerNight) *
      numberOfNights
    );

  }, [
    room,
    numberOfNights,
  ]);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const nextImage = () => {

    setActiveImage(
      (current) =>
        (current + 1) %
        images.length
    );

  };


  const previousImage = () => {

    setActiveImage(
      (current) =>
        (current - 1 + images.length) %
        images.length
    );

  };

  const handleCheckinChange = (e) => {

    const selectedDate =
      e.target.value;


    setCheckinDate(selectedDate);


    if (
      checkoutDate &&
      selectedDate >= checkoutDate
    ) {

      setCheckoutDate("");

    }


    setError("");

  };

  const handleCheckoutChange = (e) => {

    setCheckoutDate(
      e.target.value
    );

    setError("");

  };

  const handleBooking = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");


    if (
      !isAuthenticated ||
      !user
    ) {

      navigate("/login");

      return;

    }


    if (
      !checkinDate ||
      !checkoutDate
    ) {

      setError(
        "Please select both check-in and check-out dates."
      );

      return;

    }


    if (numberOfNights <= 0) {

      setError(
        "Check-out date must be after check-in date."
      );

      return;

    }


    if (numberofGuests < 1) {

      setError(
        "At least one guest is required."
      );

      return;

    }


    if (
      numberofGuests >
      room.capacity
    ) {

      setError(
        `This room can accommodate a maximum of ${room.capacity} guests.`
      );

      return;

    }


    if (!room.available) {

      setError(
        "This room is currently unavailable."
      );

      return;

    }


    const bookingData = {

      userId:
        user.userId,

      roomId:
        Number(roomId),

      checkinDate,

      checkoutDate,

      numberofGuests:
        Number(numberofGuests),

    };


    try {

      setBooking(true);


      const response =
        await createBooking(
          bookingData
        );


      console.log(
        "BOOKING SUCCESS:",
        response
      );


      setBookingId(response?.bookingId);

setSuccess(
    "Your reservation has been successfully created."
);

setTimeout(() => {
    navigate("/my-bookings");
}, 2200);

    } catch (err) {

      console.error(
        "BOOKING ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to complete the booking."
      );

    } finally {

      setBooking(false);

    }

  };

  if (loading) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-aubergine">

        <div className="text-center">

          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-champagne" />

          <p className="mt-6 text-[10px] tracking-[0.3em] text-white/50">

            PREPARING YOUR STAY

          </p>

        </div>

      </main>

    );

  }

  if (!room) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">

        <div className="text-center">

          <p className="text-[10px] tracking-[0.3em] text-champagne">
            HAVEN HOTEL & RESIDENCES
          </p>


          <h1 className="mt-5 font-serif text-4xl text-aubergine">

            Room unavailable

          </h1>


          <p className="mt-4 text-sm text-muted">

            {error ||
              "We couldn't find this room."}

          </p>


          <Link
            to="/rooms"
            className="mt-8 inline-flex items-center gap-3 border-b border-aubergine pb-2 text-[10px] tracking-[0.2em] text-aubergine"
          >

            <ArrowLeft size={14} />

            BACK TO ROOMS

          </Link>

        </div>

      </main>

    );

  }


  return (

    <main className="min-h-screen bg-[#f6f3ee]">

      <section className="relative h-[520px] overflow-hidden bg-aubergine">


        <img
          src={images[activeImage]}
          alt={`${room.roomType} at Haven`}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />


        <div className="absolute inset-0 bg-aubergine/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-aubergine via-transparent to-aubergine/30" />

        <header className="absolute left-0 right-0 top-0 z-20">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">


            <Link
              to={`/rooms/${roomId}`}
              className="flex items-center gap-3 text-white transition hover:text-champagne"
            >

              <ArrowLeft
                size={17}
              />

              <span className="text-[10px] tracking-[0.2em]">

                BACK TO ROOM

              </span>

            </Link>

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center border border-champagne/70">

                <span className="font-serif text-xl text-champagne">

                  H

                </span>

              </div>


              <div className="hidden sm:block">

                <p className="text-sm tracking-[0.3em] text-white">

                  HAVEN

                </p>


                <p className="mt-1 text-[8px] tracking-[0.35em] text-white/50">

                  HOTEL & RESIDENCES

                </p>

              </div>

            </Link>

          </div>

        </header>

        <div className="absolute bottom-12 left-0 right-0 z-10">

          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <p className="text-[10px] tracking-[0.3em] text-champagne">

              RESERVE YOUR STAY

            </p>


            <h1 className="mt-4 font-serif text-5xl text-white sm:text-6xl lg:text-7xl">

              Make yourself

              <br />

              <em className="text-champagne">

                at home.

              </em>

            </h1>

          </div>

        </div>

        {images.length > 1 && (

          <div className="absolute bottom-10 right-6 z-20 flex gap-2 lg:right-10">

            <button
              onClick={previousImage}
              className="flex h-11 w-11 items-center justify-center border border-white/30 text-white transition hover:border-champagne hover:text-champagne"
            >

              <ChevronLeft size={18} />

            </button>


            <button
              onClick={nextImage}
              className="flex h-11 w-11 items-center justify-center border border-white/30 text-white transition hover:border-champagne hover:text-champagne"
            >

              <ChevronRight size={18} />

            </button>

          </div>

        )}

      </section>

      {images.length > 1 && (

        <div className="border-b border-border bg-white">

          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 lg:px-10">

            {images.map(
              (image, index) => (

                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    setActiveImage(index)
                  }
                  className={`h-16 w-24 shrink-0 overflow-hidden transition ${
                    activeImage === index
                      ? "ring-2 ring-champagne"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >

                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                </button>

              )
            )}

          </div>

        </div>

      )}

      <section className="px-6 py-16 lg:px-10 lg:py-24">

        <div className="mx-auto max-w-7xl">


          <div className="grid gap-14 lg:grid-cols-[1fr_420px]">

            <div>


              <p className="text-[10px] tracking-[0.3em] text-champagne">

                YOUR EXPERIENCE

              </p>


              <h2 className="mt-5 font-serif text-5xl leading-tight text-aubergine sm:text-6xl">

                Choose your

                <br />

                <em>perfect dates.</em>

              </h2>


              <p className="mt-6 max-w-xl text-sm leading-7 text-muted">

                Select the dates of your stay and
                tell us how many guests will be
                joining you. Your reservation will
                be sent to our team for confirmation.

              </p>

              {error && (

                <div className="mt-8 flex items-start gap-3 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">

                  <X
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  {error}

                </div>

              )}


              {success && (

    <div className="mt-8 overflow-hidden border border-champagne/30 bg-aubergine text-white">

        <div className="flex items-start gap-4 px-6 py-5">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-champagne">

                <Check
                    size={17}
                    className="text-champagne"
                />

            </div>


            <div>

                <p className="text-[9px] tracking-[0.25em] text-champagne">

                    RESERVATION CONFIRMED

                </p>


                <p className="mt-2 font-serif text-xl">

                    Your stay at Haven is reserved.

                </p>


                <p className="mt-2 text-xs leading-6 text-white/50">

                    {bookingId
                        ? `Booking reference #${bookingId}`
                        : "Your reservation has been successfully created."}

                    <br />

                    Redirecting you to your bookings...

                </p>

            </div>

        </div>

    </div>

)}

              <form
                onSubmit={handleBooking}
                className="mt-12"
              >

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="group border border-border bg-white p-6 transition hover:border-champagne">

                    <div className="flex items-center justify-between">

                      <label className="text-[9px] font-medium tracking-[0.2em] text-muted">

                        CHECK IN

                      </label>


                      <CalendarDays
                        size={17}
                        className="text-champagne"
                      />

                    </div>


                    <input
                      type="date"
                      min={today}
                      value={checkinDate}
                      onChange={
                        handleCheckinChange
                      }
                      required
                      className="mt-5 w-full border-0 bg-transparent p-0 text-sm text-ink outline-none"
                    />


                    <p className="mt-3 text-[9px] text-muted">

                      Arrival date

                    </p>

                  </div>

                  <div className="group border border-border bg-white p-6 transition hover:border-champagne">

                    <div className="flex items-center justify-between">

                      <label className="text-[9px] font-medium tracking-[0.2em] text-muted">

                        CHECK OUT

                      </label>


                      <CalendarDays
                        size={17}
                        className="text-champagne"
                      />

                    </div>


                    <input
                      type="date"
                      min={
                        checkinDate ||
                        today
                      }
                      value={checkoutDate}
                      onChange={
                        handleCheckoutChange
                      }
                      required
                      className="mt-5 w-full border-0 bg-transparent p-0 text-sm text-ink outline-none"
                    />


                    <p className="mt-3 text-[9px] text-muted">

                      Departure date

                    </p>

                  </div>

                </div>

                <div className="mt-4 border border-border bg-white p-6 transition hover:border-champagne">

                  <div className="flex items-center justify-between">

                    <div>

                      <label className="text-[9px] font-medium tracking-[0.2em] text-muted">

                        NUMBER OF GUESTS

                      </label>


                      <p className="mt-2 text-xs text-muted">

                        Maximum{" "}
                        {room.capacity}{" "}
                        guests

                      </p>

                    </div>


                    <Users
                      size={19}
                      className="text-champagne"
                    />

                  </div>


                  <select
                    value={numberofGuests}
                    onChange={(e) =>
                      setNumberofGuests(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="mt-5 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none focus:border-aubergine"
                  >

                    {Array.from(
                      {
                        length:
                          room.capacity,
                      },
                      (_, index) =>
                        index + 1
                    ).map(
                      (guest) => (

                        <option
                          key={guest}
                          value={guest}
                        >

                          {guest}{" "}
                          {guest === 1
                            ? "Guest"
                            : "Guests"}

                        </option>

                      )
                    )}

                  </select>

                </div>

                <div className="mt-8 flex items-center justify-between border-y border-border py-5">

                  <div className="flex items-center gap-3">

                    <Clock3
                      size={17}
                      className="text-champagne"
                    />

                    <span className="text-[10px] tracking-[0.18em] text-muted">

                      LENGTH OF STAY

                    </span>

                  </div>


                  <span className="font-serif text-xl text-aubergine">

                    {numberOfNights}

                    {" "}

                    {numberOfNights === 1
                      ? "night"
                      : "nights"}

                  </span>

                </div>

                <button
                  type="submit"
                  disabled={
                    booking ||
                    !room.available
                  }
                  className="group mt-8 flex w-full items-center justify-center gap-3 bg-aubergine px-6 py-5 text-[10px] font-medium tracking-[0.22em] text-champagne transition hover:bg-[#3b2541] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {booking
                    ? "CONFIRMING RESERVATION..."
                    : !room.available
                    ? "ROOM UNAVAILABLE"
                    : "CONFIRM RESERVATION"}


                  {!booking &&
                    room.available && (

                      <ArrowUpRight
                        size={16}
                        className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />

                    )}

                </button>

              </form>

            </div>

            <aside className="h-fit bg-aubergine text-white shadow-xl lg:sticky lg:top-8">

              <div className="relative h-64 overflow-hidden">

                <img
                  src={images[activeImage]}
                  alt={room.roomType}
                  className="h-full w-full object-cover"
                />


                <div className="absolute inset-0 bg-aubergine/35" />


                <div className="absolute bottom-5 left-6">

                  <p className="text-[9px] tracking-[0.25em] text-champagne">

                    YOUR ROOM

                  </p>


                  <h3 className="mt-2 font-serif text-3xl">

                    {room.roomType}

                  </h3>

                </div>

              </div>

              <div className="p-7 sm:p-9">


                <p className="text-[9px] tracking-[0.25em] text-white/40">

                  ROOM {room.roomNumber}

                </p>


                <div className="mt-6 grid grid-cols-2 gap-5">

                  <div>

                    <p className="text-[8px] tracking-[0.18em] text-white/40">

                      SIZE

                    </p>


                    <p className="mt-2 text-sm">

                      {room.roomSize ||
                        "Luxury space"}

                    </p>

                  </div>


                  <div>

                    <p className="text-[8px] tracking-[0.18em] text-white/40">

                      CAPACITY

                    </p>


                    <p className="mt-2 text-sm">

                      {room.capacity}{" "}
                      guests

                    </p>

                  </div>

                </div>


                <div className="my-8 h-px bg-white/10" />

                <div className="space-y-5">


                  <div className="flex justify-between gap-5">

                    <div>

                      <p className="text-[8px] tracking-[0.18em] text-white/40">

                        CHECK IN

                      </p>


                      <p className="mt-2 text-sm">

                        {checkinDate ||
                          "Not selected"}

                      </p>

                    </div>


                    <CalendarDays
                      size={17}
                      className="mt-1 text-champagne"
                    />

                  </div>


                  <div className="flex justify-between gap-5">

                    <div>

                      <p className="text-[8px] tracking-[0.18em] text-white/40">

                        CHECK OUT

                      </p>


                      <p className="mt-2 text-sm">

                        {checkoutDate ||
                          "Not selected"}

                      </p>

                    </div>


                    <CalendarDays
                      size={17}
                      className="mt-1 text-champagne"
                    />

                  </div>


                  <div className="flex justify-between">

                    <div>

                      <p className="text-[8px] tracking-[0.18em] text-white/40">

                        GUESTS

                      </p>


                      <p className="mt-2 text-sm">

                        {numberofGuests}

                        {" "}

                        {numberofGuests === 1
                          ? "Guest"
                          : "Guests"}

                      </p>

                    </div>


                    <Users
                      size={17}
                      className="mt-1 text-champagne"
                    />

                  </div>

                </div>


                <div className="my-8 h-px bg-white/10" />

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[8px] tracking-[0.18em] text-white/40">

                      {numberOfNights}

                      {" "}

                      {numberOfNights === 1
                        ? "NIGHT"
                        : "NIGHTS"}

                    </p>


                    <p className="mt-2 text-xs text-white/50">

                      ₹
                      {Number(
                        room.pricePerNight
                      ).toLocaleString(
                        "en-IN"
                      )}

                      {" × "}

                      {numberOfNights}

                    </p>

                  </div>


                  <p className="font-serif text-4xl text-champagne">

                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}

                  </p>

                </div>


                <p className="mt-6 text-[9px] leading-5 text-white/35">

                  Final pricing is based on
                  the selected dates and
                  number of nights.

                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

      <section className="relative overflow-hidden bg-aubergine px-6 py-20 lg:px-10">

        <img
          src={luxuryImages[3]}
          alt="Luxury hotel"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />


        <div className="absolute inset-0 bg-aubergine/70" />


        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-[10px] tracking-[0.35em] text-champagne">

            HAVEN HOTEL & RESIDENCES

          </p>


          <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">

            Every stay deserves

            <br />

            <em className="text-champagne">

              to be remembered.

            </em>

          </h2>

        </div>

      </section>

      <footer className="bg-aubergine px-6 pb-10 lg:px-10">

        <div className="mx-auto flex max-w-7xl justify-between border-t border-white/10 pt-8">

          <p className="text-[9px] tracking-[0.3em] text-white/30">

            HAVEN HOTEL & RESIDENCES

          </p>


          <p className="text-[9px] tracking-[0.2em] text-white/20">

            EVERY STAY. A STORY.

          </p>

        </div>

      </footer>

    </main>

  );

}


export default Booking;