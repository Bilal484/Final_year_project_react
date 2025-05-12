import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/Auth.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get("email");
        const tokenParam = queryParams.get("token");

        if (emailParam && tokenParam) {
            setEmail(decodeURIComponent(emailParam));
            setToken(tokenParam);
        }
    }, [location]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!email || !token) {
            toast.error("Email or token is missing.");
            return;
        }

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("token", token);
        formData.append("password", newPassword);

        try {
            const response = await fetch("https://apitourism.today.alayaarts.com/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password has been reset successfully!");
                setTimeout(() => {
                    navigate("/login"); // Adjust as necessary for your route settings
                }, 2000);
            } else {
                throw new Error(data.message || "Failed to reset password");
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
                <title>Reset Password</title>
                <meta name="description" content="Reset your password securely using the provided token. Enter and confirm your new password to regain access to your account." />
                <meta name="keywords" content="password reset, secure password, account recovery, reset password form" />
                <meta name="author" content="Your Company Name" />
            </Helmet>
            <main className="background_color_fixed">
                <div className="d-flex align-items-center justify-content-center min-vh-100">
                    <div className="reset-password-card body_color shadow-lg p-4" style={{ maxWidth: "26rem", width: "100%" }}>
                        <h2 className="h4 fw-bold py-3 mb-3 text-center">Reset Password</h2>
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    placeholder="Enter new password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm new password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </>
    );
};

export default ResetPassword;
