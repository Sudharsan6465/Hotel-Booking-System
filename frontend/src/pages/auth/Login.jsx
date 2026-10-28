import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSubmitting(true);


    try {

      const data = await login(formData);

      if (data.role === "ADMIN") {

        navigate("/admin");

      }

      else {

        navigate("/dashboard");

      }

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      console.log(
        "STATUS:",
        err.response?.status
      );

      console.log(
        "RESPONSE:",
        err.response?.data
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to sign in. Please check your credentials."
      );

    } finally {

      setSubmitting(false);

    }

  };


  return (

    <main className="min-h-screen bg-ivory">

      <div className="grid min-h-screen lg:grid-cols-2">

        <div className="relative hidden overflow-hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
            alt="Luxury hotel interior"
            className="absolute inset-0 h-full w-full object-cover"
          />


          <div className="absolute inset-0 bg-aubergine/45" />


          <div className="absolute bottom-16 left-16 max-w-lg text-white">

            <p className="text-[10px] tracking-[0.3em] text-champagne">

              WELCOME BACK

            </p>


            <h2 className="mt-5 font-serif text-6xl leading-[1]">

              Your next

              <br />

              <span className="italic text-champagne">

                escape awaits.

              </span>

            </h2>

          </div>

        </div>


        <div className="flex items-center justify-center px-6 py-16 sm:px-12 lg:px-20">

          <div className="w-full max-w-md">


            <Link
              to="/"
              className="inline-flex items-center gap-3"
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


                <p className="text-[8px] tracking-[0.3em] text-muted">

                  HOTEL & RESIDENCES

                </p>

              </div>

            </Link>

            <div className="mt-16">

              <p className="text-[11px] tracking-[0.25em] text-champagne">

                SIGN IN

              </p>


              <h1 className="mt-5 font-serif text-5xl leading-tight text-aubergine">

                Welcome back.

              </h1>


              <p className="mt-5 text-sm leading-7 text-muted">

                Sign in to manage your reservations and continue
                your stay with us.

              </p>

            </div>

            {error && (

              <div className="mt-8 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                {error}

              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-7"
            >

              <div>

                <label className="text-[10px] font-medium tracking-[0.18em] text-muted">

                  EMAIL ADDRESS

                </label>


                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    text-ink
                    outline-none
                    transition
                    focus:border-aubergine
                  "
                  placeholder="you@example.com"
                />

              </div>

              <div>

                <label className="text-[10px] font-medium tracking-[0.18em] text-muted">

                  PASSWORD

                </label>


                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    text-ink
                    outline-none
                    transition
                    focus:border-aubergine
                  "
                  placeholder="Enter your password"
                />

              </div>
              <button

                type="submit"
                disabled={submitting}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  bg-aubergine
                  px-6
                  py-4
                  text-[11px]
                  font-medium
                  tracking-[0.2em]
                  text-champagne
                  transition
                  hover:bg-[#3b2541]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {submitting
                  ? "SIGNING IN..."
                  : "SIGN IN"
                }


                {!submitting && (

                  <ArrowUpRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                  />

                )}

              </button>

            </form>

            <p className="mt-8 text-center text-sm text-muted">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="
                  font-medium
                  text-aubergine
                  underline
                  underline-offset-4
                "
              >

                Create one

              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}

export default Login;