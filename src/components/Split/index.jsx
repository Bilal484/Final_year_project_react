import { useEffect, useRef, useState } from "react";
import ProductAllCards from "../ProductAllCards";
import Map from "../Map";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Split = ({ products }) => {

    const productImage = "https://example.com/default-image.jpg";
    const productTitle = "Example Product Title";
    const productDescription = "Check out this amazing product on our site!";
    const productLink = "https://example.com/product-link";

    if (!productTitle || !productDescription || !productImage || !productLink) {
        console.error("Missing product data: Ensure productTitle, productDescription, productImage, and productLink are properly set.");
        return <div>Error: Missing required product data!</div>;
    }

    return (
        <>
            {/* Meta Tags for SEO and Social Sharing */}
            <Helmet>
                <meta charSet="utf-8" />
                <title>{productTitle} | Click Booster</title>
                <meta name="description" content={productDescription} />
                <meta property="og:title" content={productTitle} />
                <meta property="og:description" content={productDescription} />
                <meta property="og:image" content={productImage} />
                <meta property="og:url" content={productLink} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={productTitle} />
                <meta name="twitter:description" content={productDescription} />
                <meta name="twitter:image" content={productImage} />
            </Helmet>

            <div id="Split" className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 Split">
                        <ProductAllCards products={products} />
                    </div>
                    <div className="col-lg-5">
                        <Map products={products} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Split;
