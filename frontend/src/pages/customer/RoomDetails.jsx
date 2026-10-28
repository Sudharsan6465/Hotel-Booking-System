import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getRoomById } from "../../api/roomApi";
import { getReviewsByRoom } from "../../api/reviewApi";


const luxuryImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90",
];


function RoomDetails() {

  const { roomId } = useParams();

  const navigate = useNavigate();


  const [room, setRoom] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [reviewsLoading, setReviewsLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [activeImage, setActiveImage] =
    useState(0);


  // =====================================================
  // LOAD ROOM
  // =====================================================

  useEffect(() => {

    const fetchRoom = async () => {

      try {

        setLoading(true);

        setError("");


        const data =
          await getRoomById(roomId);


        setRoom(data);

      } catch (err) {

        console.error(
          "ROOM DETAILS ERROR:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load room details."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchRoom();

  }, [roomId]);


  // =====================================================
  // LOAD REVIEWS
  // =====================================================

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        setReviewsLoading(true);


        const data =
          await getReviewsByRoom(roomId);


        setReviews(data || []);

      } catch (err) {

        console.error(
          "ROOM REVIEWS ERROR:",
          err
        );

        // Reviews should not break the room page.
        setReviews([]);

      } finally {

        setReviewsLoading(false);

      }

    };


    fetchReviews();

  }, [roomId]);


  // =====================================================
  // IMAGE LIST
  // =====================================================

  const images = useMemo(() => {

    if (
      room?.imageUrls &&
      room.imageUrls.length > 0
    ) {

      return room.imageUrls;

    }


    return luxuryImages;

  }, [room]);


  // =====================================================
  // AVERAGE RATING
  // =====================================================

  const averageRating = useMemo(() => {

    if (!reviews.length) {
      return "0.0";
    }


    const total =
      reviews.reduce(
        (sum, review) =>
          sum + Number(review.rating || 0),
        0
      );


    return (
      total / reviews.length
    ).toFixed(1);

  }, [reviews]);


  // =====================================================
  // NEXT IMAGE
  // =====================================================

  const nextImage = () => {

    setActiveImage(
      (current) =>
        (current + 1) %
        images.length
    );

  };


  // =====================================================
  // PREVIOUS IMAGE
  // =====================================================

  const previousImage = () => {

    setActiveImage(
      (current) =>
        (current - 1 + images.length) %
        images.length
    );

  };


  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }


    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-ivory">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border border-t-aubergine" />

          <p className="mt-5 text-[10px] tracking-[0.3em] text-muted">

            PREPARING YOUR HAVEN

          </p>

        </div>

      </main>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error || !room) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">

        <div className="text-center">

          <p className="text-[10px] tracking-[0.3em] text-champagne">
            HAVEN — STAYS
          </p>


          <h1 className="mt-5 font-serif text-4xl text-aubergine">
            Room unavailable
          </h1>


          <p className="mt-4 text-sm text-muted">
            {error ||
              "The requested room could not be found."}
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

    <main className="min-h-screen bg-ivory">

      <section className="relative h-[75vh] min-h-[600px] overflow-hidden">

        <img
          src={images[activeImage]}
          alt={`Haven ${room.roomType}`}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/90 via-transparent to-black/20" />

        <header className="absolute left-0 right-0 top-0 z-20">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">


            <Link
              to="/rooms"
              className="flex items-center gap-3 text-white transition hover:text-champagne"
            >

              <ArrowLeft
                size={17}
                strokeWidth={1.5}
              />

              <span className="text-[10px] tracking-[0.2em]">
                ALL ROOMS
              </span>

            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 text-white"
            >

              <div className="flex h-10 w-10 items-center justify-center border border-champagne/70">

                <span className="font-serif text-xl">
                  H
                </span>

              </div>


              <div className="hidden sm:block">

                <p className="text-sm tracking-[0.3em]">
                  HAVEN
                </p>


                <p className="mt-1 text-[8px] tracking-[0.3em] text-white/50">
                  HOTEL & RESIDENCES
                </p>

              </div>

            </Link>

          </div>

        </header>

        <div className="absolute bottom-12 left-0 right-0 z-10">

          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <p className="text-[10px] tracking-[0.3em] text-champagne">

              ROOM {room.roomNumber}

            </p>


            <h1 className="mt-4 font-serif text-6xl text-white sm:text-7xl lg:text-8xl">

              {room.roomType}

            </h1>


            <div className="mt-5 flex flex-wrap items-center gap-5">

              <div className="flex items-center gap-2">

                <div className="flex">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <Star
                        key={star}
                        size={14}
                        fill="currentColor"
                        className="text-champagne"
                      />

                    )
                  )}

                </div>


                <span className="text-xs text-white/70">

                  {averageRating}

                </span>

              </div>


              <span className="h-1 w-1 rounded-full bg-white/30" />


              <span className="text-xs text-white/60">

                {reviews.length}{" "}

                {reviews.length === 1
                  ? "guest review"
                  : "guest reviews"}

              </span>

            </div>

          </div>

        </div>

        {images.length > 1 && (

          <div className="absolute bottom-10 right-6 z-20 flex items-center gap-2 lg:right-10">

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

        <section className="border-b border-border bg-white">

          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 lg:px-10">

            {images.map(
              (image, index) => (

                <button
                  key={image}
                  onClick={() =>
                    setActiveImage(index)
                  }
                  className={`relative h-20 w-28 shrink-0 overflow-hidden ${
                    activeImage === index
                      ? "ring-2 ring-champagne"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >

                  <img
                    src={image}
                    alt={`Room view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                </button>

              )
            )}

          </div>

        </section>

      )}

      <section className="px-6 py-20 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-7xl">


          <div className="grid gap-16 lg:grid-cols-[1fr_380px]">

            <div>


              <p className="text-[10px] tracking-[0.25em] text-champagne">
                THE SPACE
              </p>


              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight text-aubergine sm:text-6xl">

                A room designed

                <br />

                <span className="italic">
                  around you.
                </span>

              </h2>


              <p className="mt-8 max-w-2xl text-base leading-8 text-muted">
                {room.description}
              </p>
              <div className="mt-14 grid grid-cols-2 gap-y-10 border-y border-border py-8 sm:grid-cols-4">


                <div>

                  <p className="text-[9px] tracking-[0.2em] text-muted">
                    ROOM SIZE
                  </p>


                  <p className="mt-2 text-sm text-ink">
                    {room.roomSize ||
                      "Luxury space"}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.2em] text-muted">
                    CAPACITY
                  </p>


                  <p className="mt-2 text-sm text-ink">
                    {room.capacity} Guests
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.2em] text-muted">
                    FLOOR
                  </p>


                  <p className="mt-2 text-sm text-ink">
                    {room.floor}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.2em] text-muted">
                    ROOM
                  </p>


                  <p className="mt-2 text-sm text-ink">
                    {room.roomNumber}
                  </p>

                </div>

              </div>

              {room.amenities &&
                room.amenities.length > 0 && (

                  <div className="mt-14">

                    <p className="text-[10px] tracking-[0.25em] text-champagne">
                      AMENITIES
                    </p>


                    <div className="mt-7 flex flex-wrap gap-3">

                      {room.amenities.map(
                        (amenity) => (

                          <span
                            key={amenity}
                            className="border border-border bg-white px-5 py-3 text-xs text-ink transition hover:border-champagne"
                          >
                            {amenity}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

            </div>

            <aside className="h-fit bg-aubergine p-8 text-white lg:sticky lg:top-10 lg:p-10">


              <p className="text-[10px] tracking-[0.25em] text-champagne">
                YOUR STAY
              </p>


              <div className="mt-8">

                <p className="text-[9px] tracking-[0.2em] text-white/50">
                  FROM
                </p>


                <div className="mt-2 flex items-end gap-2">

                  <span className="font-serif text-5xl text-white">

                    ₹
                    {Number(
                      room.pricePerNight || 0
                    ).toLocaleString("en-IN")}

                  </span>


                  <span className="mb-2 text-[10px] tracking-[0.15em] text-white/50">
                    / NIGHT
                  </span>

                </div>

              </div>


              <div className="my-8 h-px bg-white/10" />

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[9px] tracking-[0.2em] text-white/50">
                    GUEST RATING
                  </p>


                  <div className="mt-2 flex items-center gap-3">

                    <span className="font-serif text-2xl">
                      {averageRating}
                    </span>


                    <div className="flex">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (

                          <Star
                            key={star}
                            size={12}
                            fill="currentColor"
                            className="text-champagne"
                          />

                        )
                      )}

                    </div>

                  </div>

                </div>

              </div>


              <div className="my-8 h-px bg-white/10" />

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[9px] tracking-[0.2em] text-white/50">
                    AVAILABILITY
                  </p>


                  <p className="mt-2 text-sm">

                    {room.available
                      ? "Available"
                      : "Currently unavailable"}

                  </p>

                </div>


                <div
                  className={`h-2 w-2 rounded-full ${
                    room.available
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                />

              </div>

              <button
                disabled={!room.available}
                onClick={() =>
                  navigate(
                    `/booking/${room.roomId}`
                  )
                }
                className="group mt-10 flex w-full items-center justify-center gap-3 bg-champagne px-6 py-5 text-[10px] font-medium tracking-[0.2em] text-aubergine transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >

                {room.available
                  ? "BOOK THIS ROOM"
                  : "UNAVAILABLE"}


                {room.available && (

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />

                )}

              </button>


              <p className="mt-5 text-center text-[9px] leading-5 text-white/40">

                Select your dates on the
                booking page to continue.

              </p>

            </aside>

          </div>

        </div>

      </section>

      <section className="bg-aubergine px-6 py-20 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] tracking-[0.3em] text-champagne">
                GUEST EXPERIENCES
              </p>


              <h2 className="mt-5 font-serif text-5xl text-white sm:text-6xl">

                Stories from

                <br />

                <em className="text-champagne">
                  this room.
                </em>

              </h2>

            </div>


            <div className="flex items-center gap-5">

              <div className="text-right">

                <p className="font-serif text-5xl text-white">
                  {averageRating}
                </p>


                <div className="mt-2 flex justify-end">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        className="text-champagne"
                      />

                    )
                  )}

                </div>

              </div>


              <div className="h-12 w-px bg-white/15" />


              <p className="max-w-[120px] text-[10px] leading-5 tracking-[0.1em] text-white/50">

                BASED ON{" "}

                {reviews.length}{" "}

                GUEST{" "}

                {reviews.length === 1
                  ? "REVIEW"
                  : "REVIEWS"}

              </p>

            </div>

          </div>

          {reviewsLoading ? (

            <div className="mt-16 text-sm text-white/50">
              Loading guest experiences...
            </div>

          ) : reviews.length === 0 ? (

            <div className="mt-14 border border-white/10 bg-white/5 p-10">

              <Star
                size={25}
                className="text-champagne"
              />


              <h3 className="mt-5 font-serif text-3xl text-white">
                Be the first to share.
              </h3>


              <p className="mt-3 max-w-lg text-sm leading-7 text-white/50">
                This room doesn't have any guest
                reviews yet. Your experience could
                be the first.
              </p>


              <Link
                to="/reviews"
                className="mt-7 inline-flex items-center gap-3 border border-champagne px-6 py-4 text-[9px] tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-aubergine"
              >

                WRITE A REVIEW

                <ArrowUpRight size={14} />

              </Link>

            </div>

          ) : (

            <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">

              {reviews.map(
                (review) => (

                  <article
                    key={
                      review.reviewId
                    }
                    className="bg-aubergine p-8 transition hover:bg-white/5 sm:p-10"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <Star
                              key={star}
                              size={13}
                              fill={
                                star <=
                                review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                star <=
                                review.rating
                                  ? "text-champagne"
                                  : "text-white/20"
                              }
                            />

                          )
                        )}

                      </div>


                      <span className="text-[9px] text-white/30">
                        {formatDate(
                          review.reviewAt
                        )}
                      </span>

                    </div>


                    <blockquote className="mt-7 font-serif text-2xl leading-relaxed text-white">

                      “
                      {review.comment}
                      ”

                    </blockquote>


                    <div className="mt-8 border-t border-white/10 pt-5">

                      <p className="text-[9px] tracking-[0.2em] text-champagne">
                        GUEST
                      </p>


                      <p className="mt-1 text-sm text-white/70">
                        {review.userName}
                      </p>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

          {reviews.length > 0 && (

            <div className="mt-10">

              <Link
                to="/reviews"
                className="inline-flex items-center gap-3 border-b border-champagne pb-2 text-[10px] tracking-[0.2em] text-champagne"
              >

                VIEW ALL REVIEWS

                <ArrowUpRight size={14} />

              </Link>

            </div>

          )}

        </div>

      </section>

      <footer className="bg-aubergine px-6 pb-10 lg:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">

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


export default RoomDetails;