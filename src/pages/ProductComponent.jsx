import React, { useState, useEffect } from "react";

function ProductComponent() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const [productResponse, productImageResponse] = await Promise.all([
                    fetch("https://apitourism.today.alayaarts.com/api/get-products"),
                    fetch("https://apitourism.today.alayaarts.com/api/get-productimages"),
                ]);

                const productData = await productResponse.json();
                const productImageData = await productImageResponse.json();

                if (productData.status === 200 && productImageData.status === 200) {
                    const mergedProperties = productData.products.map((product) => {
                        const images = productImageData.products
                            .filter((image) => image.pd_id === product.id)
                            .map((img) => img.image);

                        return { ...product, images };
                    });

                    setProperties(mergedProperties);
                } else {
                    throw new Error("Failed to load product or image data");
                }
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!properties || properties.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="gap-4 d-flex flex-row mb-3">
            <div className="fs-6 text-muted">
                <strong className="fs-6 text-dark me-2">
                    {properties?.[0]?.overview_sales?.[0]?.beds || "N/A"}
                </strong>
                Beds
            </div>
            <div className="fs-6 text-muted">
                <strong className="fs-6 text-dark me-2">
                    {properties?.[0]?.overview_sales?.[0]?.bath || "N/A"}
                </strong>
                Baths
            </div>
            <div className="fs-6 text-muted">
                <strong className="fs-6 text-dark me-2">
                    {properties?.[0]?.overview_sales?.[0]?.sq_ft || "N/A"}
                </strong>
                Sq Ft
            </div>
        </div>
    );
}

export default ProductComponent;
