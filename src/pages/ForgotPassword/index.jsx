import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Auth.css";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
    
        setLoading(true);
        const formData = new URLSearchParams();
        formData.append("email", email);
    
        try {
            const response = await fetch("https://apitourism.today.alayaarts.com/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success("Password reset link sent to your email!");
                const url = new URL(data.reset_link);
                const token = url.searchParams.get("token");
                const emailParam = url.searchParams.get("email");
                
                setTimeout(() => {
                    navigate(`/ResetPassword?email=${encodeURIComponent(emailParam)}&token=${token}`);
                }, 2000);
            } else {
                throw new Error(data.message || "Failed to send reset link");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
                <meta name="description" content="Reset your password if you have forgotten it. Enter your email to receive a password reset link." />
                <meta name="keywords" content="forgot password, reset password, user authentication" />
            </Helmet>
            <main className="background_color_fixed">
                <div className="d-flex align-items-center justify-content-center min-vh-100">
                    <div className="card body_color shadow-lg p-4" style={{ maxWidth: "26rem", width: "100%" }}>
                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn w-100" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;
