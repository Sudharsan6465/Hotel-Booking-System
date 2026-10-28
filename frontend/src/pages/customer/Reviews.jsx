import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  Send,
  Star,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getReviewsByUser,
  addReview,
  updateReview,
} from "../../api/reviewApi";

import { getAllRooms } from "../../api/roomApi";


const luxuryImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90",

  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",

  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",

  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=90",
];


function Reviews() {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [reviews, setReviews] =
    useState([]);

  const [rooms, setRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [roomsLoading, setRoomsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeImage, setActiveImage] =
    useState(0);

  const [showForm, setShowForm] =
    useState(false);

  const [editingReview, setEditingReview] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);


  const [formData, setFormData] =
    useState({
      roomId: "",
      rating: 5,
      comment: "",
    });


  const loadReviews = async () => {

    if (!user?.userId) {
      return;
    }


    try {

      setLoading(true);

      setError("");


      const data =
        await getReviewsByUser(
          user.userId
        );


      setReviews(data || []);

    } catch (err) {

      console.error(
        "REVIEWS LOAD ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to load your reviews."
      );

    } finally {

      setLoading(false);

    }

  };

  const loadRooms = async () => {

    try {

      setRoomsLoading(true);


      const data =
        await getAllRooms();


      setRooms(data || []);

    } catch (err) {

      console.error(
        "ROOMS LOAD ERROR:",
        err
      );


      setError(
        "Unable to load rooms."
      );

    } finally {

      setRoomsLoading(false);

    }

  };
  useEffect(() => {

    loadReviews();

    loadRooms();

  }, [user?.userId]);


  useEffect(() => {

    const interval =
      setInterval(() => {

        setActiveImage(
          (current) =>
            (current + 1) %
            luxuryImages.length
        );

      }, 6000);


    return () =>
      clearInterval(interval);

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleRating = (rating) => {

    setFormData({
      ...formData,
      rating,
    });

  };

  const openCreateForm = () => {

    setEditingReview(null);

    setFormData({
      roomId: "",
      rating: 5,
      comment: "",
    });

    setError("");

    setSuccess("");

    setShowForm(true);

  };

  const openEditForm = (review) => {

    setEditingReview(review);

    const matchingRoom =
      rooms.find(
        (room) =>
          String(room.roomNumber) ===
          String(review.roomNumber)
      );


    setFormData({
      roomId:
        matchingRoom?.roomId || "",
      rating:
        review.rating,
      comment:
        review.comment || "",
    });


    setError("");

    setSuccess("");

    setShowForm(true);

  };

  const closeForm = () => {

    setShowForm(false);

    setEditingReview(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");


    if (!formData.roomId) {

      setError(
        "Please select a room."
      );

      return;

    }


    if (!formData.comment.trim()) {

      setError(
        "Please tell us about your experience."
      );

      return;

    }


    try {

      setSubmitting(true);


      const reviewData = {

        userId:
          user.userId,

        roomId:
          Number(formData.roomId),

        rating:
          Number(formData.rating),

        comment:
          formData.comment.trim(),

      };


      if (editingReview) {

        await updateReview(
          editingReview.reviewId,
          reviewData
        );


        setSuccess(
          "Your review has been updated."
        );

      } else {

        await addReview(
          reviewData
        );


        setSuccess(
          "Thank you. Your review has been published."
        );

      }


      await loadReviews();


      setShowForm(false);

      setEditingReview(null);


      setFormData({
        roomId: "",
        rating: 5,
        comment: "",
      });

    } catch (err) {

      console.error(
        "REVIEW SUBMIT ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to submit your review."
      );

    } finally {

      setSubmitting(false);

    }

  };

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  const averageRating =
    useMemo(() => {

      if (!reviews.length) {
        return "0.0";
      }


      const total =
        reviews.reduce(
          (sum, review) =>
            sum +
            Number(
              review.rating || 0
            ),
          0
        );


      return (
        total /
        reviews.length
      ).toFixed(1);

    }, [reviews]);

  const formatDate = (date) => {

    if (!date) {
      return "";
    }


    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };

  const renderStars = (
    rating,
    interactive = false
  ) => {

    return (

      <div className="flex items-center gap-1">

        {[1, 2, 3, 4, 5].map(
          (starNumber) => (

            <button
              key={starNumber}
              type={
                interactive
                  ? "button"
                  : undefined
              }
              onClick={
                interactive
                  ? () =>
                      handleRating(
                        starNumber
                      )
                  : undefined
              }
              className={
                interactive
                  ? "transition hover:scale-110"
                  : ""
              }
              disabled={!interactive}
            >

              <Star
                size={
                  interactive
                    ? 26
                    : 13
                }
                fill={
                  starNumber <=
                  rating
                    ? "currentColor"
                    : "none"
                }
                className={
                  starNumber <=
                  rating
                    ? "text-champagne"
                    : "text-white/20"
                }
              />

            </button>

          )
        )}

      </div>

    );

  };

  if (!user) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-aubergine px-6">

        <div className="text-center text-white">

          <p className="text-[10px] tracking-[0.3em] text-champagne">

            HAVEN

          </p>


          <h1 className="mt-5 font-serif text-5xl">

            Sign in to share

            <br />

            <em>
              your experience.
            </em>

          </h1>


          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 bg-champagne px-7 py-4 text-[10px] tracking-[0.2em] text-aubergine"
          >

            SIGN IN

            <ArrowUpRight
              size={15}
            />

          </Link>

        </div>

      </main>

    );

  }


  return (

    <div className="min-h-screen bg-aubergine">

      <section className="relative min-h-[720px] overflow-hidden">

        {luxuryImages.map(
          (image, index) => (

            <img
              key={image}
              src={image}
              alt="Luxury Haven hotel"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] ${
                index === activeImage
                  ? "scale-105 opacity-100"
                  : "scale-100 opacity-0"
              }`}
            />

          )
        )}

        <div className="absolute inset-0 bg-aubergine/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-aubergine/90 via-aubergine/50 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-aubergine via-transparent to-aubergine/20" />

        <header className="relative z-20">

          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">

            <Link
              to="/dashboard"
              className="flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center border border-champagne/70">

                <span className="font-serif text-lg text-champagne">

                  H

                </span>

              </div>


              <div>

                <p className="text-sm tracking-[0.28em] text-white">

                  HAVEN

                </p>


                <p className="mt-1 text-[8px] tracking-[0.35em] text-white/55">

                  HOTEL & RESIDENCES

                </p>

              </div>

            </Link>

            <div className="hidden items-center gap-9 md:flex">

              <Link
                to="/dashboard"
                className="text-xs text-white/70 transition hover:text-champagne"
              >

                Dashboard

              </Link>


              <Link
                to="/rooms"
                className="text-xs text-white/70 transition hover:text-champagne"
              >

                Stays

              </Link>


              <Link
                to="/my-bookings"
                className="text-xs text-white/70 transition hover:text-champagne"
              >

                My Bookings

              </Link>


              <span className="text-xs text-champagne">

                Reviews

              </span>


              <button
                onClick={
                  handleLogout
                }
                className="text-xs text-white/60 transition hover:text-white"
              >

                Sign out

              </button>

            </div>

            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="text-white md:hidden"
            >

              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}

            </button>

          </nav>

          {mobileMenuOpen && (

            <div className="absolute left-0 right-0 top-full z-30 border-t border-white/10 bg-aubergine/95 px-6 py-7 backdrop-blur-xl md:hidden">

              <div className="flex flex-col gap-6">

                <Link
                  to="/dashboard"
                  className="text-sm text-white"
                >

                  Dashboard

                </Link>


                <Link
                  to="/rooms"
                  className="text-sm text-white"
                >

                  Stays

                </Link>


                <Link
                  to="/my-bookings"
                  className="text-sm text-white"
                >

                  My Bookings

                </Link>


                <button
                  onClick={
                    handleLogout
                  }
                  className="text-left text-sm text-white/70"
                >

                  Sign out

                </button>

              </div>

            </div>

          )}

        </header>

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-6 pb-20 lg:px-10">

          <div className="max-w-3xl">


            <p className="flex items-center gap-3 text-[10px] tracking-[0.35em] text-champagne">

              <span className="h-px w-10 bg-champagne" />

              GUEST EXPERIENCES

            </p>


            <h1 className="mt-7 font-serif text-6xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">

              Your stay,

              <br />

              <em className="text-champagne">

                your story.

              </em>

            </h1>


            <p className="mt-7 max-w-xl text-sm leading-8 text-white/70 sm:text-base">

              Every stay at Haven is designed
              to become a memory worth keeping.
              Share the moments that made your
              experience unforgettable.

            </p>


            <div className="mt-10 flex flex-wrap items-center gap-4">

              <button
                onClick={
                  openCreateForm
                }
                className="group flex items-center gap-3 bg-champagne px-7 py-4 text-[10px] tracking-[0.2em] text-aubergine transition hover:bg-white"
              >

                WRITE A REVIEW

                <ArrowUpRight
                  size={15}
                  className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              </button>


              <div className="flex items-center gap-4 px-3">

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


                <span className="text-xs text-white/60">

                  {averageRating}

                  {" · "}

                  {reviews.length}

                  {" "}

                  {reviews.length === 1
                    ? "review"
                    : "reviews"}

                </span>

              </div>

            </div>

          </div>

          <div className="absolute bottom-8 right-6 flex items-center gap-2 lg:right-10">

            <button
              onClick={() =>
                setActiveImage(
                  (
                    activeImage -
                    1 +
                    luxuryImages.length
                  ) %
                    luxuryImages.length
                )
              }
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition hover:border-champagne hover:text-champagne"
            >

              <ChevronLeft
                size={18}
              />

            </button>


            <button
              onClick={() =>
                setActiveImage(
                  (activeImage + 1) %
                    luxuryImages.length
                )
              }
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition hover:border-champagne hover:text-champagne"
            >

              <ChevronRight
                size={18}
              />

            </button>

          </div>

        </div>

      </section>

      <main className="bg-ivory">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <div className="flex flex-col justify-between gap-8 border-b border-border pb-12 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] tracking-[0.3em] text-champagne">

                FROM OUR GUESTS

              </p>


              <h2 className="mt-5 font-serif text-5xl text-aubergine sm:text-6xl">

                Moments worth

                <br />

                <em>
                  remembering.
                </em>

              </h2>

            </div>


            <p className="max-w-md text-sm leading-7 text-muted">

              Your words help us understand
              what makes a stay at Haven special
              and inspire us to make every visit
              even better.

            </p>

          </div>

          {success && (

            <div className="mt-8 flex items-center gap-3 border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">

              <Check size={17} />

              {success}

            </div>

          )}


          {error && (

            <div className="mt-8 flex items-center gap-3 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

              <X size={17} />

              {error}

            </div>

          )}

          {loading && (

            <div className="flex min-h-[300px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border border-t-aubergine" />

                <p className="mt-5 text-[9px] tracking-[0.2em] text-muted">

                  LOADING YOUR EXPERIENCES

                </p>

              </div>

            </div>

          )}

          {!loading &&
            reviews.length === 0 && (

              <section className="relative mt-12 overflow-hidden bg-aubergine px-8 py-16 sm:px-14">

                <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">

                  <img
                    src={
                      luxuryImages[2]
                    }
                    alt="Luxury hotel"
                    className="h-full w-full object-cover"
                  />

                </div>


                <div className="relative z-10 max-w-xl">

                  <p className="text-[10px] tracking-[0.3em] text-champagne">

                    YOUR FIRST REVIEW

                  </p>


                  <h3 className="mt-5 font-serif text-4xl text-white sm:text-5xl">

                    Tell us about

                    <br />

                    <em className="text-champagne">

                      your Haven.

                    </em>

                  </h3>


                  <p className="mt-5 text-sm leading-7 text-white/60">

                    Whether it was a peaceful
                    morning overlooking the city,
                    an unforgettable dinner, or
                    simply the comfort of your room,
                    we'd love to hear about it.

                  </p>


                  <button
                    onClick={
                      openCreateForm
                    }
                    className="mt-8 flex items-center gap-3 bg-champagne px-7 py-4 text-[10px] tracking-[0.2em] text-aubergine"
                  >

                    WRITE YOUR REVIEW

                    <Send size={15} />

                  </button>

                </div>

              </section>

            )}

          {!loading &&
            reviews.length > 0 && (

              <section className="mt-12 grid gap-px bg-border md:grid-cols-2">

                {reviews.map(
                  (review, index) => (

                    <article
                      key={
                        review.reviewId
                      }
                      className="group relative overflow-hidden bg-white p-8 transition hover:bg-aubergine sm:p-10"
                    >

                      <span className="absolute right-8 top-7 font-serif text-5xl text-aubergine/5 transition group-hover:text-white/5">

                        0
                        {index + 1}

                      </span>


                      <div className="flex items-center justify-between">

                        <p className="text-[9px] tracking-[0.2em] text-champagne">

                          ROOM{" "}
                          {review.roomNumber}

                        </p>


                        <span className="text-[9px] text-muted transition group-hover:text-white/40">

                          {formatDate(
                            review.reviewAt
                          )}

                        </span>

                      </div>


                      <div className="mt-7">

                        {renderStars(
                          review.rating
                        )}

                      </div>


                      <blockquote className="mt-7 max-w-xl font-serif text-2xl leading-relaxed text-aubergine transition group-hover:text-white sm:text-3xl">

                        “
                        {review.comment}
                        ”

                      </blockquote>


                      <div className="mt-8 flex items-center justify-between border-t border-border pt-6 transition group-hover:border-white/10">

                        <div>

                          <p className="text-[9px] tracking-[0.18em] text-muted transition group-hover:text-white/40">

                            GUEST

                          </p>


                          <p className="mt-1 text-sm font-medium text-aubergine transition group-hover:text-white">

                            {review.userName}

                          </p>

                        </div>


                        <button
                          onClick={() =>
                            openEditForm(
                              review
                            )
                          }
                          className="flex items-center gap-2 text-[9px] tracking-[0.15em] text-muted transition hover:text-champagne group-hover:text-white/50"
                        >

                          EDIT

                          <ArrowUpRight
                            size={13}
                          />

                        </button>

                      </div>

                    </article>

                  )
                )}

              </section>

            )}

        </div>

      </main>

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-aubergine/80 px-5 py-10 backdrop-blur-md">

          <div className="relative w-full max-w-2xl overflow-hidden bg-ivory shadow-2xl">

            <div className="relative h-40 overflow-hidden">

              <img
                src={
                  luxuryImages[
                    activeImage
                  ]
                }
                alt="Luxury Haven"
                className="h-full w-full object-cover"
              />


              <div className="absolute inset-0 bg-aubergine/60" />


              <div className="absolute bottom-6 left-7">

                <p className="text-[9px] tracking-[0.3em] text-champagne">

                  HAVEN EXPERIENCES

                </p>


                <h2 className="mt-2 font-serif text-3xl text-white">

                  {editingReview
                    ? "Refine your story."
                    : "Share your story."}

                </h2>

              </div>


              <button
                onClick={
                  closeForm
                }
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-white/30 text-white transition hover:border-champagne hover:text-champagne"
              >

                <X size={17} />

              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="p-7 sm:p-10"
            >

              <div>

                <label className="text-[9px] tracking-[0.2em] text-muted">

                  SELECT YOUR ROOM

                </label>


                <div className="relative mt-3">

                  <select
                    name="roomId"
                    value={
                      formData.roomId
                    }
                    onChange={
                      handleChange
                    }
                    required
                    disabled={
                      roomsLoading ||
                      editingReview
                    }
                    className="w-full appearance-none border border-border bg-white px-4 py-4 pr-12 text-sm text-ink outline-none transition focus:border-aubergine disabled:cursor-not-allowed disabled:bg-gray-100"
                  >

                    <option value="">

                      {roomsLoading
                        ? "Loading rooms..."
                        : "Choose the room you stayed in"}

                    </option>


                    {rooms.map(
                      (room) => (

                        <option
                          key={
                            room.roomId
                          }
                          value={
                            room.roomId
                          }
                        >

                          Room{" "}
                          {room.roomNumber}
                          {" — "}
                          {room.roomType}

                          {" — ₹"}

                          {Number(
                            room.pricePerNight ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}

                          / night

                        </option>

                      )
                    )}

                  </select>


                  <ChevronRight
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-champagne"
                  />

                </div>


                {editingReview && (

                  <p className="mt-2 text-[9px] text-muted">

                    The room cannot be changed
                    while editing a review.

                  </p>

                )}

              </div>


              <div className="mt-8">

                <label className="text-[9px] tracking-[0.2em] text-muted">

                  YOUR RATING

                </label>


                <div className="mt-4 flex items-center gap-2">

                  {renderStars(
                    Number(
                      formData.rating
                    ),
                    true
                  )}


                  <span className="ml-3 text-sm text-muted">

                    {formData.rating}/5

                  </span>

                </div>

              </div>

              <div className="mt-8">

                <label className="text-[9px] tracking-[0.2em] text-muted">

                  YOUR EXPERIENCE

                </label>


                <textarea
                  name="comment"
                  value={
                    formData.comment
                  }
                  onChange={
                    handleChange
                  }
                  required
                  minLength={5}
                  rows="5"
                  placeholder="Tell us what made your stay memorable..."
                  className="mt-3 w-full resize-none border border-border bg-white p-4 text-sm leading-7 text-ink outline-none transition focus:border-aubergine"
                />

              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    closeForm
                  }
                  className="border border-border px-6 py-4 text-[9px] tracking-[0.18em] text-muted transition hover:border-aubergine hover:text-aubergine"
                >

                  CANCEL

                </button>


                <button
                  type="submit"
                  disabled={
                    submitting ||
                    roomsLoading
                  }
                  className="group flex items-center justify-center gap-3 bg-aubergine px-7 py-4 text-[9px] tracking-[0.18em] text-champagne transition hover:bg-[#3b2541] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {submitting
                    ? "SAVING..."
                    : editingReview
                    ? "UPDATE REVIEW"
                    : "PUBLISH REVIEW"}


                  {!submitting && (

                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      <footer className="border-t border-white/10 bg-aubergine">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 sm:flex-row lg:px-10">

          <p className="text-[9px] tracking-[0.3em] text-white/40">

            HAVEN HOTEL & RESIDENCES

          </p>


          <p className="text-[9px] tracking-[0.2em] text-white/30">

            EVERY STAY. A STORY.

          </p>

        </div>

      </footer>

    </div>

  );

}


export default Reviews;