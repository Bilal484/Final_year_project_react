import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/Auth.css";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
} from "../../authMethods";
import '../../firebaseConfig'
import ZnetLogo from "../../assets/images/PNG Logo Files/Transparent Logo NameLess.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSocialLogin = (loginFunction, provider) => {
  //     loginFunction()
  //         .then((response) => {

  //             let user = {};

  //             if (provider === 'google' || provider === 'facebook') {
  //                 if (response && response.users && response.users.length > 0) {
  //                     user = {
  //                         id: response.users[0].localId,
  //                         email: response.users[0].email,
  //                         displayName: response.users[0].displayName,
  //                         photoUrl: response.users[0].photoUrl
  //                     };
  //                 }
  //             }

  //             if (user.id && user.email) {
  //                 localStorage.setItem("user_id", user.id);
  //                 localStorage.setItem("user_email", user.email);
  //                 localStorage.setItem("user_name", user.displayName);
  //                 if (user.photoUrl) {
  //                     localStorage.setItem("user_photo_url", user.photoUrl);
  //                 }

  //                 alert("Login successful!");
  //                 navigate("/");
  //             } else {
  //                 throw new Error("Failed to retrieve user data.");
  //             }
  //         })
  //         .catch((error) => {
  //             console.error(`${provider} login error:`, error);
  //             alert(`Login failed: ${error.message}`);
  //         });
  // };

  const handleSocialLogin = (loginFunction, provider) => {
    loginFunction()
      .then(async (user) => {
        if (user) {
          const { email } = user;
  
          try {
            // Verify email with API
            const response = await fetch("https://api.biznetusa.com/api/user-emailverify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            });
  
            if (!response.ok) {
              console.error("Response status:", response.status, response.statusText);
              throw new Error("Failed to verify user email.");
            }
  
            const data = await response.json();
  
            // Validate API response structure
            if (
              data &&
              data.user_id &&
              data.role_id &&
              data.role_name &&
              data.role_name.roles &&
              data.role_name.roles.role_name
            ) {
              // Save user details to localStorage
              localStorage.setItem("user_id", data.user_id);
              localStorage.setItem("roles", data.role_id); // Store role_id
              localStorage.setItem("user_role", data.role_name.roles.role_name);
              localStorage.setItem("user_email", data.role_name.email);
              localStorage.setItem("user_name", data.role_name.name);
  
             
  
              toast.success("Login successful!");
              navigate("/"); // Redirect after successful login
            } else {
              throw new Error("Invalid response structure from server.");
            }
          } catch (error) {
            console.error("Error during email verification:", error);
            toast.error("Email verification failed. Please try again.");
          }
        } else {
          throw new Error("Failed to retrieve user data.");
        }
      })
      .catch((error) => {
        console.error(`${provider} login error:`, error);
        toast.error(`Login failed: ${error.message}`);
      });
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("https://api.biznetusa.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to log in");

      const { access_token, token_type, user_role, permissions } = data;
      if (!access_token) throw new Error("Invalid response from server.");

      const token = `${token_type} ${access_token}`;
      saveToken(token);
      await fetchUserDetails(token);

      toast.success("Login successful!");
      navigate("/Questionaire"); // Navigate after successful login
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("https://api.biznetusa.com/api/user", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user details.");

      const userData = await response.json();
      const { id, email, user_role, permissions } = userData;

      if (!id)
        throw new Error("User ID is missing in the fetched user details.");

      localStorage.setItem("user_id", id);
      localStorage.setItem("user_email", email);
      localStorage.setItem("roles", user_role);
      localStorage.setItem("permissions", JSON.stringify(permissions));

      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      toast.error(error.message || "Failed to fetch user details.");
    }
  };



  return (
    <>
      <Helmet>
        <title>Login - UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="Log in to your UrbanCraft REAL ESTATE account to access personalized services and features."
        />
        <meta
          name="keywords"
          content="login, authentication, user access, UrbanCraft REAL ESTATE login, secure login"
        />
      </Helmet>
      <main className="background_color_fixed">
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div
            className="card body_color shadow-lg p-4 mx-3"
            style={{ maxWidth: "32rem", width: "100%" }}
          >
            <img
              src={ZnetLogo}
              alt="UrbanCraft REAL ESTATE Logo"
              className="mx-auto"
              style={{ width: "100px" }}
            />
            {/* <Link className="text-decoration-none" href="/"> */}
            {/*     <h2 className="h4 fw-bold py-3 mb-4 text-center">Welcome to UrbanCraft REAL ESTATE</h2> */}
            {/* </Link> */}
            <div className="my-3 d-flex justify-content-center align-items-center gap-0">
              <Link
                className="btn btn-primary text-decoration-none w-50"
                style={{
                  flexGrow: "1",
                  backgroundColor: `var(--background_color)`,
                }}
                to="/Login"
              >
                <h3 className="h6 fw-semibold  m-0 text-white">Sign In</h3>
              </Link>
              <Link
                className="btn btn-primary text-decoration-none w-50"
                style={{ flexGrow: "1", backgroundColor: "var(--color)" }}
                to="/SignUp"
              >
                <h3 className="h6 fw-semibold m-0 text-decoration-none  text-white">
                  New Account
                </h3>
              </Link>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p className="text-center mt-3">
                <a href="/ForgotPassword" className="text-decoration-underline">
                  Forgot your password?
                </a>
              </p>
            </form>
            <div className="my-4 border-top text-center pt-3">
              <p>Or connect with:</p>
              <div className="d-flex flex-row gap-3">
                <button
                  onClick={() => handleSocialLogin(signInWithApple, "Apple")}
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  style={{ flexGrow: '1' }}
                  disabled={loading}
                >
                  <i className="fab fa-apple fs-3 py-1" /> 
                </button>
                <button
                  onClick={() => handleSocialLogin(signInWithGoogle, "Google")}
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  style={{ flexGrow: '1' }}
                  disabled={loading}
                >
                  <i className="fab fa-google fs-4 py-1" /> 
                </button>
                <button
                  onClick={() =>
                    handleSocialLogin(signInWithFacebook, "Facebook")
                  }
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  style={{ flexGrow: '1' }}
                  disabled={loading}
                >
                  <i className="fab fa-facebook-f fs-3 py-1" /> 
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default Login;
