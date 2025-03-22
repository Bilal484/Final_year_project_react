import React, { useEffect } from "react";
import ProductAllCards from "../ProductAllCards";
import { Helmet } from "react-helmet";
import { document } from "postcss";

const List = ({ products }) => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])


    return (
        <>
            <Helmet>
                <title>Product List - Explore All Products</title>
                <meta name="description" content="Browse through our extensive list of products with detailed cards showcasing features, prices, and more." />
                <meta name="keywords" content="Product List, Product Cards, Product Details, Product Features" />
                <meta property="og:title" content="Product List - Explore All Products" />
                <meta property="og:description" content="Explore our product catalog with comprehensive details and features in an easy-to-navigate format." />
                <meta name="author" content="Your Company Name" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div id="List" className="container-fluid">
                <div className="row">
                    <div className="">
                        <ProductAllCards products={products} />
                    </div>
                </div>
            </div>

            {/* Modal  */}

        </>
    );
};
export default List;
