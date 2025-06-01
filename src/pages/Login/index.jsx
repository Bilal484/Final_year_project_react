import React, { useState, useEffect } from "react";
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
import '../../firebaseConfig';
import ZnetLogo from "../../assets/images/FYP_ Logo/FYP_ Logo/Header Logo.png";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleSocialLogin = (loginFunction, provider) => {
    loginFunction()
      .then(async (user) => {
        if (user) {
          const { email } = user;

          try {
            // Verify email with API
            const response = await fetch("https://apitourism.today.alayaarts.com/api/user-emailverify", {
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
      const response = await fetch("https://apitourism.today.alayaarts.com/api/login", {
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
      const response = await fetch("https://apitourism.today.alayaarts.com/api/user", {
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
      <main className="auth-background">
        <div className="auth-container">
          <motion.div
            className="auth-card"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="logo-container" variants={itemVariants}>
              <Link to="/"> <img
                src={ZnetLogo}
                alt="UrbanCraft REAL ESTATE Logo"
                className="auth-logo"
              />
              </Link>
              <div className="logo-shine"></div>
            </motion.div>

            <motion.div className="auth-tabs" variants={itemVariants}>
              <Link
                className="auth-tab auth-tab-active"
                to="/Login"
              >
                Sign In
              </Link>
              <Link
                className="auth-tab"
                to="/SignUp"
              >
                New Account
              </Link>
            </motion.div>

            <motion.form
              onSubmit={handleLogin}
              className="auth-form"
              variants={itemVariants}
            >
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <i className="fas fa-arrow-right ms-2"></i>
                  </>
                )}
              </button>

              <div className="forgot-password">
                <Link to="/ForgotPassword">
                  <i className="fas fa-key me-1"></i>
                  Forgot your password?
                </Link>
              </div>
            </motion.form>

            <motion.div
              className="social-login-container"
              variants={itemVariants}
            >
              <div className="social-divider">
                <span>Or connect with</span>
              </div>

              <div className="social-buttons">
                <button
                  onClick={() => handleSocialLogin(signInWithGoogle, "Google")}
                  className="social-btn google-btn"
                  disabled={loading}
                >
                  <i className="fab fa-google"></i>
                  <span className="social-btn-text">Google</span>
                </button>

                <button
                  onClick={() => handleSocialLogin(signInWithFacebook, "Facebook")}
                  className="social-btn facebook-btn"
                  disabled={loading}
                >
                  <i className="fab fa-facebook-f"></i>
                  <span className="social-btn-text">Facebook</span>
                </button>

                <button
                  onClick={() => handleSocialLogin(signInWithApple, "Apple")}
                  className="social-btn apple-btn"
                  disabled={loading}
                >
                  <i className="fab fa-apple"></i>
                  <span className="social-btn-text">Apple</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              className="auth-footer"
              variants={itemVariants}
            >
              <p>
                By signing in, you agree to our{" "}
                <Link to="/terms-of-service">Terms of Service</Link> &{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Login;
