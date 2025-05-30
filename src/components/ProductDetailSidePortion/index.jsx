import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productDetailSidePortion.css";
import { Helmet } from "react-helmet";

const ProductDetailSidePortion = ({ p_id }) => {
    // State for managing comment, price, offers, users, and API request status
    const [comment, setComment] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [offers, setOffers] = useState([]);
    const [users, setUsers] = useState({}); // To store users as a key-value map with id as key
    const [productData, setProductData] = useState(null); // To store product data
    const [sellerId, setSellerId] = useState(null); // To store seller ID

    // Generate dates dynamically
    const getUpcomingDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 3; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + i); // Add i days to the current date
            dates.push(newDate);
        }
        return dates;
    };

    const dates = getUpcomingDates();    // Get the user id from localStorage
    const userId = localStorage.getItem("user_id");

    // Fetch product data to get seller information
    useEffect(() => {
        const fetchProductData = async () => {
            if (!p_id) return;
            
            try {
                const response = await fetch(`https://apitourism.today.alayaarts.com/api/get-product/${p_id}`);
                const data = await response.json();
                if (response.ok && data.status === 200) {
                    setProductData(data.products);
                    setSellerId(data.products.user_id); // Extract seller_id from product's user_id
                } else {
                    console.error("Failed to fetch product data");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();
    }, [p_id]);

    // Fetch all users first
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://apitourism.today.alayaarts.com/api/all-users");
                const data = await response.json();
                if (response.ok) {
                    const usersMap = data.allusers.reduce((acc, user) => {
                        acc[user.id] = user.name; // Create a map with user.id as key and user.name as value
                        return acc;
                    }, {});
                    setUsers(usersMap); // Save the users map in state
                } else {
                    setMessage("Failed to load users.");
                }
            } catch (error) {
                setMessage("An error occurred while fetching users.");
            }
        };

        fetchUsers();
    }, []); // Only run once when component mounts

    // Fetch all offers from the API when the component mounts
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch("https://apitourism.today.alayaarts.com/api/offers");
                const data = await response.json();
                // Filter offers by product_id (p_id)
                const filteredOffers = data.filter((offer) => offer.product_id == p_id);

                // Mutate offers array to include user names by using the user_id
                const mutatedOffers = filteredOffers.map((offer) => ({
                    ...offer,
                    user_name: users[offer.user_id] || "Unknown User", // Replace user_id with user_name
                }));

                // Sort the offers in descending order based on offer_price
                const sortedOffers = mutatedOffers.sort((a, b) => b.offer_price - a.offer_price);

                setOffers(sortedOffers); // Set the mutated and sorted offers
            } catch (error) {
                setMessage("An error occurred while fetching the offers.");
            }
        };

        fetchOffers();
    }, [p_id, users]); // Re-run this when p_id or users data changes

    // Function to handle offer submission
    const handleOfferSubmit = async () => {
        if (!userId) {
            setMessage("User not authenticated.");
            return;
        }

        if (!offerPrice) {
            setMessage("Please enter a valid offer price.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("https://apitourism.today.alayaarts.com/api/offers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    offer_price: offerPrice,
                    comment: comment,
                    product_id: p_id,
                }),
            });

            if (response.ok) {
                setMessage("Offer submitted successfully!");
                setComment(""); // Clear the comment after successful submission
                setOfferPrice(""); // Clear the offer price after successful submission
                // Re-fetch and update the list of offers and sort them
                const data = await response.json();
                const filteredOffers = data.filter((offer) => offer.product_id == p_id);
                const mutatedOffers = filteredOffers.map((offer) => ({
                    ...offer,
                    user_name: users[offer.user_id] || "Unknown User", // Mutate offer with user_name
                }));
                const sortedOffers = mutatedOffers.sort((a, b) => b.offer_price - a.offer_price);
                setOffers(sortedOffers);
            } else {
                setMessage("Failed to submit the offer. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="real estate, property details, buy property, house tours, listing" />
            </Helmet>
            <div className="col-lg-4 sec_scroll_section">
                <div className="card p-4 mb-4">
                    <h5 className="fs-4">Thinking of buying?</h5>
                    <div className="my-3 date_button">
                        {dates.map((date, index) => (
                            <button key={index} className="btn mx-1 fs-15">
                                {date.toLocaleString("en-US", { weekday: "short" })} {/* Day of the week */}
                                <br />
                                <span className="fs-3 fw-bold">{date.getDate()}</span> {/* Day of the month */}
                                <br />
                                {date.toLocaleString("en-US", { month: "short" })} {/* Month */}
                            </button>
                        ))}
                    </div>
                    <div className="btn-group tour_btn my-3 w-100">
                        <button className="btn">
                            <i className="fa fa-home fs-6"></i> <span>Tour in person</span>
                        </button>
                        <button className="btn">
                            <i className="fa fa-mobile fs-6 me-1"></i>Tour via video chat
                        </button>
                    </div>                    <Link to="/RequestShowing" state={{ p_id, seller_id: sellerId }}> {/* Pass p_id and seller_id through state */}
                        <button className="btn req_btn w-100">Request showing</button>
                    </Link>
                    <p className="mt-1 fs-13 mb-1">It's free, cancel anytime</p>
                    <hr />
                    <button className="btn offer_btn w-100" onClick={handleOfferSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting Offer..." : "Start an offer"}
                    </button>
                    {message && <p className="mt-2 text-center">{message}</p>}
                    <hr className="my-2" />
                    <p className="text-center">
                        Ask a question: <strong>(410) 695-3196</strong>
                    </p>

                    {/* Offer Price Input */}
                    <div className="offer_price_section mt-3">
                        <label htmlFor="offer_price">Offer Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="offer_price"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            placeholder="Enter your offer price"
                            min="0"
                        />
                    </div>

                    {/* Comment Section for Offer */}
                    <div className="comment_section mt-3">
                        <textarea
                            className="form-control"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add your comment for the offer"
                        ></textarea>
                    </div>

                    {/* Display Offers in Descending Order */}
                    <div className="offers_list mt-4">
                        <h5>Offers for this Property:</h5>
                        <ul className="list-group">
                            {offers.length > 0 ? (
                                offers.map((offer, index) => (
                                    <li key={index} className="list-group-item">
                                        <p><strong>User:</strong> {offer.user_name}</p>
                                        <p><strong>Offer Price:</strong> ${offer.offer_price}</p>
                                    </li>
                                ))
                            ) : (
                                <p>No offers yet for this property.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailSidePortion;

