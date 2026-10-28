import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  XCircle,
} from "lucide-react";

import { makePayment } from "../../api/paymentApi";


function Payment() {

  const navigate = useNavigate();
  const location = useLocation();


  const booking = location.state?.booking;


  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const [processing, setProcessing] =
    useState(false);

  const [paymentResult, setPaymentResult] =
    useState(null);

  const [error, setError] =
    useState("");


  useEffect(() => {

    if (!booking) {

      navigate("/my-bookings", {
        replace: true,
      });

    }

  }, [booking, navigate]);


  if (!booking) {
    return null;
  }


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


  const formatDate = (date) => {

    if (!date) {
      return "";
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


  const handlePayment = async () => {

    try {

      setProcessing(true);

      setError("");

      const response = await makePayment({
        bookingId: booking.bookingId,
        paymentMethod: paymentMethod,
      });


      setPaymentResult(response);

    } catch (err) {

      console.error(
        "PAYMENT ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to process payment."
      );

    } finally {

      setProcessing(false);

    }

  };


  if (paymentResult) {

    return (

      <main className="min-h-screen bg-ivory">

        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">

          <div className="w-full max-w-2xl border border-border bg-white p-8 text-center shadow-sm sm:p-14">


            <div className="mx-auto flex h-20 w-20 items-center justify-center border border-green-200 bg-green-50">

              <CheckCircle2
                size={40}
                className="text-green-600"
                strokeWidth={1.5}
              />

            </div>


            <p className="mt-8 text-[10px] tracking-[0.3em] text-champagne">

              PAYMENT CONFIRMED

            </p>


            <h1 className="mt-4 font-serif text-5xl text-aubergine">

              Your stay is
              <br />

              <em>
                confirmed.
              </em>

            </h1>


            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted">

              Your payment has been successfully
              processed. Your reservation at Haven
              is now confirmed.

            </p>


            <div className="mt-10 border-y border-border py-7">

              <div className="grid gap-6 sm:grid-cols-3">


                <div>

                  <p className="text-[9px] tracking-[0.16em] text-muted">
                    BOOKING
                  </p>

                  <p className="mt-2 text-sm text-aubergine">
                    #{paymentResult.bookingId}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.16em] text-muted">
                    AMOUNT
                  </p>

                  <p className="mt-2 font-serif text-xl text-aubergine">
                    {formatPrice(
                      paymentResult.amount
                    )}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.16em] text-muted">
                    METHOD
                  </p>

                  <p className="mt-2 text-sm text-aubergine">
                    {paymentResult.paymentMethod}
                  </p>

                </div>

              </div>

            </div>


            <div className="mt-7">

              <p className="text-[9px] tracking-[0.18em] text-muted">

                TRANSACTION ID

              </p>


              <p className="mt-2 break-all font-mono text-xs text-aubergine">

                {paymentResult.transactionId}

              </p>

            </div>


            <button
              onClick={() =>
                navigate("/my-bookings")
              }
              className="group mx-auto mt-10 flex items-center justify-center gap-3 bg-aubergine px-8 py-4 text-[10px] tracking-[0.2em] text-champagne transition hover:bg-[#3b2541]"
            >

              VIEW MY BOOKINGS

              <ArrowUpRight
                size={15}
                className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
              />

            </button>

          </div>

        </div>

      </main>

    );

  }


  return (

    <main className="min-h-screen bg-ivory">


      <header className="border-b border-border bg-ivory">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">


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


          <div className="hidden items-center gap-2 text-[9px] tracking-[0.18em] text-muted sm:flex">

            <ShieldCheck size={15} />

            SECURE PAYMENT

          </div>

        </div>

      </header>


      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-20">


        <button
          onClick={() =>
            navigate("/my-bookings")
          }
          className="mb-10 flex items-center gap-2 text-[9px] tracking-[0.18em] text-muted transition hover:text-aubergine"
        >

          <ArrowLeft size={15} />

          BACK TO MY BOOKINGS

        </button>


        <div className="mb-12">

          <p className="text-[10px] tracking-[0.3em] text-champagne">

            COMPLETE YOUR STAY

          </p>


          <h1 className="mt-4 font-serif text-5xl leading-tight text-aubergine sm:text-6xl">

            Complete your
            <br />

            <em>
              reservation.
            </em>

          </h1>


          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">

            Your booking has been approved.
            Complete the payment to confirm
            your stay at Haven.

          </p>

        </div>


        {error && (

          <div className="mb-8 flex items-start gap-3 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

            <XCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>
              {error}
            </span>

          </div>

        )}


        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">


          <section className="border border-border bg-white">


            <div className="relative h-64 overflow-hidden bg-aubergine sm:h-80">

              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
                alt="Haven luxury room"
                className="h-full w-full object-cover"
              />


              <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-transparent to-transparent" />


              <div className="absolute bottom-7 left-7">

                <p className="text-[9px] tracking-[0.25em] text-champagne">
                  YOUR STAY
                </p>


                <h2 className="mt-2 font-serif text-4xl text-white">
                  Room {booking.roomNumber}
                </h2>

              </div>

            </div>


            <div className="p-7 sm:p-9">


              <div className="grid gap-7 sm:grid-cols-2">


                <div>

                  <p className="text-[9px] tracking-[0.17em] text-muted">
                    CHECK-IN
                  </p>


                  <p className="mt-2 text-sm text-aubergine">
                    {formatDate(
                      booking.checkinDate
                    )}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.17em] text-muted">
                    CHECK-OUT
                  </p>


                  <p className="mt-2 text-sm text-aubergine">
                    {formatDate(
                      booking.checkoutDate
                    )}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.17em] text-muted">
                    GUESTS
                  </p>


                  <p className="mt-2 text-sm text-aubergine">
                    {booking.numberofGuests}
                    {" "}
                    {booking.numberofGuests === 1
                      ? "Guest"
                      : "Guests"}
                  </p>

                </div>


                <div>

                  <p className="text-[9px] tracking-[0.17em] text-muted">
                    BOOKING
                  </p>


                  <p className="mt-2 text-sm text-aubergine">
                    #{booking.bookingId}
                  </p>

                </div>

              </div>


              <div className="mt-8 border-t border-border pt-7">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[9px] tracking-[0.18em] text-muted">
                      TOTAL STAY
                    </p>


                    <p className="mt-2 text-xs text-muted">
                      Inclusive of your reservation
                    </p>

                  </div>


                  <p className="font-serif text-3xl text-aubergine">

                    {formatPrice(
                      booking.totalPrice
                    )}

                  </p>

                </div>

              </div>

            </div>

          </section>


          <section className="border border-border bg-white p-7 sm:p-9">


            <div className="flex items-center justify-between">

              <div>

                <p className="text-[9px] tracking-[0.2em] text-champagne">
                  PAYMENT
                </p>


                <h2 className="mt-3 font-serif text-3xl text-aubergine">
                  Choose your method.
                </h2>

              </div>


              <CreditCard
                size={25}
                className="text-aubergine"
                strokeWidth={1.2}
              />

            </div>


            <div className="mt-8 space-y-3">


              <button
                type="button"
                onClick={() =>
                  setPaymentMethod("UPI")
                }
                className={`flex w-full items-center gap-4 border p-5 text-left transition ${
                  paymentMethod === "UPI"
                    ? "border-aubergine bg-aubergine text-white"
                    : "border-border hover:border-aubergine"
                }`}
              >

                <div
                  className={`flex h-10 w-10 items-center justify-center border ${
                    paymentMethod === "UPI"
                      ? "border-champagne"
                      : "border-border"
                  }`}
                >

                  <Smartphone
                    size={18}
                    className={
                      paymentMethod === "UPI"
                        ? "text-champagne"
                        : "text-aubergine"
                    }
                  />

                </div>


                <div className="flex-1">

                  <p className="text-sm font-medium">
                    UPI
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      paymentMethod === "UPI"
                        ? "text-white/60"
                        : "text-muted"
                    }`}
                  >
                    Google Pay, PhonePe, Paytm
                  </p>

                </div>


                <div
                  className={`h-4 w-4 rounded-full border ${
                    paymentMethod === "UPI"
                      ? "border-champagne bg-champagne"
                      : "border-border"
                  }`}
                />

              </button>


              <button
                type="button"
                onClick={() =>
                  setPaymentMethod("CARD")
                }
                className={`flex w-full items-center gap-4 border p-5 text-left transition ${
                  paymentMethod === "CARD"
                    ? "border-aubergine bg-aubergine text-white"
                    : "border-border hover:border-aubergine"
                }`}
              >

                <div
                  className={`flex h-10 w-10 items-center justify-center border ${
                    paymentMethod === "CARD"
                      ? "border-champagne"
                      : "border-border"
                  }`}
                >

                  <CreditCard
                    size={18}
                    className={
                      paymentMethod === "CARD"
                        ? "text-champagne"
                        : "text-aubergine"
                    }
                  />

                </div>


                <div className="flex-1">

                  <p className="text-sm font-medium">
                    Credit / Debit Card
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      paymentMethod === "CARD"
                        ? "text-white/60"
                        : "text-muted"
                    }`}
                  >
                    Visa, Mastercard, RuPay
                  </p>

                </div>


                <div
                  className={`h-4 w-4 rounded-full border ${
                    paymentMethod === "CARD"
                      ? "border-champagne bg-champagne"
                      : "border-border"
                  }`}
                />

              </button>


              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "NET_BANKING"
                  )
                }
                className={`flex w-full items-center gap-4 border p-5 text-left transition ${
                  paymentMethod ===
                  "NET_BANKING"
                    ? "border-aubergine bg-aubergine text-white"
                    : "border-border hover:border-aubergine"
                }`}
              >

                <div
                  className={`flex h-10 w-10 items-center justify-center border ${
                    paymentMethod ===
                    "NET_BANKING"
                      ? "border-champagne"
                      : "border-border"
                  }`}
                >

                  <span
                    className={
                      paymentMethod ===
                      "NET_BANKING"
                        ? "text-champagne"
                        : "text-aubergine"
                    }
                  >
                    ₹
                  </span>

                </div>


                <div className="flex-1">

                  <p className="text-sm font-medium">
                    Net Banking
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      paymentMethod ===
                      "NET_BANKING"
                        ? "text-white/60"
                        : "text-muted"
                    }`}
                  >
                    Pay through your bank
                  </p>

                </div>


                <div
                  className={`h-4 w-4 rounded-full border ${
                    paymentMethod ===
                    "NET_BANKING"
                      ? "border-champagne bg-champagne"
                      : "border-border"
                  }`}
                />

              </button>

            </div>


            <div className="mt-8 border-y border-border py-6">

              <div className="flex items-center justify-between">

                <span className="text-[9px] tracking-[0.18em] text-muted">
                  AMOUNT TO PAY
                </span>


                <span className="font-serif text-3xl text-aubergine">

                  {formatPrice(
                    booking.totalPrice
                  )}

                </span>

              </div>

            </div>


            <button
              onClick={handlePayment}
              disabled={processing}
              className="group mt-7 flex w-full items-center justify-center gap-3 bg-aubergine px-6 py-5 text-[10px] font-medium tracking-[0.2em] text-champagne transition hover:bg-[#3b2541] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {processing
                ? "PROCESSING PAYMENT..."
                : `PAY ${formatPrice(
                    booking.totalPrice
                  )}`}


              {!processing && (

                <ArrowUpRight
                  size={16}
                  className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              )}

            </button>


            <div className="mt-6 flex items-start gap-3">

              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-muted"
                strokeWidth={1.3}
              />


              <p className="text-[10px] leading-5 text-muted">

                Your payment information is
                handled securely. This is a simulated
                payment flow in the current version
                of Haven.

              </p>

            </div>

          </section>

        </div>

      </div>

    </main>

  );
}


export default Payment;