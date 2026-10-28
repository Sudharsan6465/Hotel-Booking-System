import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../api/authApi";


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.userName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {

      setError("Please fill in all the required fields.");

      return;

    }


    if (formData.password !== formData.confirmPassword) {

      setError("Password and Confirm Password do not match.");

      return;

    }


    if (formData.password.length < 6) {

      setError("Password must contain at least 6 characters.");

      return;

    }


    try {

      setLoading(true);

      await registerUser({

        userName: formData.userName.trim(),

        email: formData.email.trim(),

        phoneNumber: formData.phoneNumber.trim(),

        password: formData.password

      });


      setSuccess(
        "Your Haven account has been created successfully! Redirecting to login..."
      );


      setFormData({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
      });

      setTimeout(() => {

        navigate("/login");

      }, 2000);


    } catch (err) {

      console.error("Registration error:", err);


      let errorMessage =
        "Registration failed. Please try again.";


      if (typeof err.response?.data === "string") {

        errorMessage = err.response.data;

      } else if (err.response?.data?.message) {

        errorMessage = err.response.data.message;

      } else if (err.response?.data?.error) {

        errorMessage = err.response.data.error;

      }


      setError(errorMessage);


    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
        background:
          "linear-gradient(rgba(30, 20, 35, 0.78), rgba(30, 20, 35, 0.88)), url('/images/hotel-register.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          minHeight: "650px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#ffffff",
          boxShadow: "0 25px 70px rgba(0,0,0,0.45)"
        }}
      >


        <div
          style={{
            background:
              "linear-gradient(135deg, #211624 0%, #35213a 55%, #59412d 100%)",
            color: "#ffffff",
            padding: "70px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >

          <div>

            <p
              style={{
                color: "#c7a56b",
                fontSize: "11px",
                letterSpacing: "5px",
                fontWeight: "bold",
                marginBottom: "30px"
              }}
            >
              HAVEN RESORT
            </p>


            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: "400",
                fontSize: "54px",
                lineHeight: "1.2",
                margin: "0 0 25px 0"
              }}
            >
              Every stay,
              <br />

              <span
                style={{
                  color: "#c7a56b",
                  fontStyle: "italic"
                }}
              >
                beautifully managed.
              </span>

            </h1>


            <p
              style={{
                color: "#d7d0d8",
                lineHeight: "1.8",
                fontSize: "16px",
                maxWidth: "390px"
              }}
            >
              Create your Haven account and discover an effortless
              way to explore exceptional rooms, manage reservations,
              make payments and share your experience.
            </p>

          </div>


          <div>

            <div
              style={{
                width: "60px",
                height: "1px",
                background: "#c7a56b",
                marginBottom: "20px"
              }}
            />

            <p
              style={{
                color: "#c7a56b",
                fontSize: "10px",
                letterSpacing: "3px",
                margin: 0
              }}
            >
              LUXURY BEGINS WITH HAVEN
            </p>

          </div>

        </div>

        <div
          style={{
            padding: "55px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >

          <p
            style={{
              color: "#a98147",
              fontSize: "11px",
              fontWeight: "bold",
              letterSpacing: "4px",
              marginBottom: "12px"
            }}
          >
            CREATE YOUR ACCOUNT
          </p>


          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "400",
              color: "#2b1d30",
              fontSize: "40px",
              margin: "0 0 12px 0"
            }}
          >
            Join Haven
          </h2>


          <p
            style={{
              color: "#777777",
              fontSize: "15px",
              lineHeight: "1.6",
              marginBottom: "28px"
            }}
          >
            Your next unforgettable stay starts here.
          </p>

          {error && (

            <div
              style={{
                background: "#fff1f1",
                border: "1px solid #efc1c1",
                color: "#a13737",
                padding: "13px 15px",
                fontSize: "14px",
                marginBottom: "20px"
              }}
            >
              {error}
            </div>

          )}

          {success && (

            <div
              style={{
                background: "#edf8ef",
                border: "1px solid #b9dabb",
                color: "#287333",
                padding: "13px 15px",
                fontSize: "14px",
                marginBottom: "20px"
              }}
            >
              {success}
            </div>

          )}
          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "17px" }}>

              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#666",
                  marginBottom: "8px"
                }}
              >
                FULL NAME
              </label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  boxSizing: "border-box",
                  border: "1px solid #dddddd",
                  fontSize: "14px",
                  outline: "none"
                }}
              />

            </div>

            <div style={{ marginBottom: "17px" }}>

              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#666",
                  marginBottom: "8px"
                }}
              >
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  boxSizing: "border-box",
                  border: "1px solid #dddddd",
                  fontSize: "14px",
                  outline: "none"
                }}
              />

            </div>
            <div style={{ marginBottom: "17px" }}>

              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#666",
                  marginBottom: "8px"
                }}
              >
                PHONE NUMBER
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  boxSizing: "border-box",
                  border: "1px solid #dddddd",
                  fontSize: "14px",
                  outline: "none"
                }}
              />

            </div>
            <div style={{ marginBottom: "17px" }}>

              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#666",
                  marginBottom: "8px"
                }}
              >
                PASSWORD
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  boxSizing: "border-box",
                  border: "1px solid #dddddd",
                  fontSize: "14px",
                  outline: "none"
                }}
              />

            </div>

            <div style={{ marginBottom: "25px" }}>

              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#666",
                  marginBottom: "8px"
                }}
              >
                CONFIRM PASSWORD
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  boxSizing: "border-box",
                  border: "1px solid #dddddd",
                  fontSize: "14px",
                  outline: "none"
                }}
              />

            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                background: loading ? "#958273" : "#2b1d30",
                color: "#ffffff",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "11px",
                fontWeight: "bold",
                letterSpacing: "2px"
              }}
            >
              {loading
                ? "CREATING YOUR ACCOUNT..."
                : "CREATE ACCOUNT"}
            </button>


          </form>

          <p
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: "14px",
              marginTop: "23px"
            }}
          >
            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#a77d40",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Sign in
            </Link>

          </p>


        </div>

      </div>

    </div>

  );

}


export default Register;