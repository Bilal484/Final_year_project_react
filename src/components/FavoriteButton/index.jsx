// FavoriteButton.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet"; 

const FavoriteButton = ({ userId, productId }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch initial favorite status
    useEffect(() => {
        const checkIfFavorited = async () => {
            if (!userId || !productId) return;

            try {
                const response = await fetch(`https://apitourism.today.alayaarts.com/api/get-fvtproducts/${userId}`);
                const data = await response.json();

                if (response.ok && data.products) {
                    // Check if the product is already in the favorites list
                    const isProductFavorited = data.products.some((item) => item.id === productId);
                    setIsFavorited(isProductFavorited);
                } else {
                }
            } catch (error) {
            }
        };

        checkIfFavorited();
    }, [userId, productId]);

    // Handle adding to wishlist
    const handleAddToWishlist = async () => {
        if (!userId || !productId) {
            toast.error("User ID or Product ID is missing.");
            return;
        }

        setLoading(true);

        try {
            if (!isFavorited) {
                // Add to wishlist
                const requestBody = {
                    user_id: userId,
                    p_id: productId,
                };

                const response = await fetch("https://apitourism.today.alayaarts.com/api/store-mfvtproducts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                const data = await response.json();
                if (response.ok) {
                    setIsFavorited(true);
                    toast.success("Product added to wishlist!");
                } else {
                    toast.error(data.message || "Failed to add product to wishlist.");
                }
            }
        } catch (error) {
            toast.error("An error occurred while adding to wishlist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
         <Helmet>
                <title>UrbanCraft REAL ESTATE Home</title>
                <meta name="description" content="A React component for adding or removing products from a user's wishlist." />
                <meta name="keywords" content="React, Wishlist, Favorite Button, Font Awesome, User Interaction" />
                <meta name="author" content="Your Name or Company Name" />
            </Helmet>
        <i
            className={`fa-heart ${isFavorited ? "fa-solid" : "fa-regular"} ms-2`}
            role="button"
            aria-label="Favorite"
            onClick={handleAddToWishlist}
            style={{
                cursor: loading ? "not-allowed" : "pointer",
                color: isFavorited ? "red" : "inherit",
            }}
        />
        </>
    );
};

export default FavoriteButton;
