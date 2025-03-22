import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import "./ShareListingModal.css"; // Import custom CSS for styling

const ShareListingModal = ({ isOpen, onClose, productSlug = "default-slug" }) => {
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    // Base URL for the product link
    const productLink = `https://api.biznetusa.com/products/${productSlug}`;

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleShare = async () => {
    
        // Validate email format and ensure productSlug is not empty
        if (!email || !validateEmail(email) || !productSlug) {
            toast.error("Please provide a valid email and product information.");
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetch("https://api.biznetusa.com/api/store-shareproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    desc: note,
                    product_slug: productSlug,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success("Product shared successfully!");
                onClose();
            } else {
                toast.error(data.message || "Failed to share the product.");
            }
        } catch (error) {
            toast.error("An error occurred while sharing the product.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle social media sharing
    const handleSocialShare = (platform) => {
        let shareUrl = "";
        const encodedLink = encodeURIComponent(productLink);
        const encodedNote = encodeURIComponent(note);

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedNote}`;
                break;
            case "pinterest":
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedLink}&description=${encodedNote}`;
                break;
            case "email":
                shareUrl = `mailto:?subject=Check out this product&body=${encodedNote}%20${encodedLink}`;
                break;
            case "link":
                navigator.clipboard.writeText(productLink);
                toast.success("Link copied to clipboard!");
                return;
            default:
                break;
        }

        window.open(shareUrl, "_blank");
    };

    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Share Product | Click Booster</title>
                <meta
                    name="description"
                    content={`Check out the ${note} from Click Booster!`}
                />
                <meta property="og:title" content={`Share Product | ${note}`} />
                <meta
                    property="og:description"
                    content={`Find out more about the product "${note}" and share it with others.`}
                />

                <meta property="og:url" content={productLink} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Share Product | ${note}`} />
                <meta
                    name="twitter:description"
                    content={`Find out more about the product "${note}" and share it with others.`}
                />

            </Helmet>
        <Modal show={isOpen} onHide={onClose} centered className="share-listing-modal">
            <Modal.Header closeButton>
                <Modal.Title>Share Listing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter recipient's email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={email && !validateEmail(email)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="note" className="mt-3">
                        <Form.Label>Enter your note</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Add a note (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            maxLength={250}
                        />
                        <small className="text-muted d-block text-end">
                            {note.length}/250 Character Limit
                        </small>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <div className="social-icons">
                    <i
                        className="fa-solid fa-link"
                        onClick={() => handleSocialShare("link")}
                        title="Copy Link"
                    />
                    <i
                        className="fa-solid fa-envelope"
                        onClick={() => handleSocialShare("email")}
                        title="Share via Email"
                    />
                    <i
                        className="fa-brands fa-facebook"
                        onClick={() => handleSocialShare("facebook")}
                        title="Share on Facebook"
                    />
                    <i
                        className="fa-brands fa-twitter"
                        onClick={() => handleSocialShare("twitter")}
                        title="Share on Twitter"
                    />
                    <i
                        className="fa-brands fa-pinterest"
                        onClick={() => handleSocialShare("pinterest")}
                        title="Share on Pinterest"
                    />
                </div>
                <Button variant="danger" onClick={handleShare} disabled={loading}>
                    {loading ? "Sharing..." : "Send"}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default ShareListingModal;
