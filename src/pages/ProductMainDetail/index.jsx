import React, { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet';
import List from "../../components/List";
import Split from "../../components/Split";
import Map from "../../components/Map";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./ProductMainDetail.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProductMainDetail = () => {
    const [activeView, setActiveView] = useState("list");
    const [products, setProducts] = useState([]);


    const showList = () => setActiveView("list");
    const showSplit = () => setActiveView("split");
    const showMap = () => setActiveView("map");


    const location = useLocation();
    const cityId = new URLSearchParams(location.search).get("cityId");
    const appartmentId = new URLSearchParams(location.search).get("appartmentId");
    const rentCityId = new URLSearchParams(location.search).get("RentByCityId");
    const fetchCalled = useRef(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (fetchCalled.current) return;
            fetchCalled.current = true;

            try {
                let response;
                if (cityId) {
                    response = await axios.get(`https://apitourism.today.alayaarts.com/api/get-filterbyhome/${cityId}`);
                } else if (rentCityId) {
                    response = await axios.get(`https://apitourism.today.alayaarts.com/api/get-filterbyrent/${rentCityId}`);
                } else if (appartmentId) {
                    response = await axios.get(`https://apitourism.today.alayaarts.com/api/get-filterbyapartment/${appartmentId}`);
                } else {
                    response = { data: { products: [] } };
                }
                setProducts(response.data.products || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [cityId, rentCityId, appartmentId]);

    return (
        <>
            <Helmet>
                <title>Property Listings - Detailed View</title>
                <meta name="description" content="Explore detailed property listings with options to view in list, split, or map format. Find properties for sale or rent, customized by price range, type, and location." />
                <meta name="keywords" content="property listings, real estate, Chicago apartments, for rent, for sale, map view, detailed property search" />
            </Helmet>
            <Header />
            <div className="position-sticky top-0 z-3"> <div className="container-fluid product_main_detail">
                <div className="row">
                    <div className="search-bar">
                        <div className="filter-group col-lg-8">
                            <select className="form-select">
                                <option selected="">For sale</option>
                                <option value={1}>For rent</option>
                            </select>
                            <select className="form-select">
                                <option selected="">Price</option>
                                <option value={1}>$200k-$400k</option>
                                <option value={2}>$400k-$600k</option>
                            </select>
                            <select className="form-select">
                                <option selected="">Beds/baths</option>
                                <option value={1}>1 Bed</option>
                                <option value={2}>2 Beds</option>
                            </select>
                            <select className="form-select">
                                <option selected="">Home type</option>
                                <option value={1}>House</option>
                                <option value={2}>Apartment</option>
                            </select>
                        </div>
                        <div className="d-flex my-2 f-row gap-2">
                            <button className="btn text-nowrap btn-outline-info">
                                All filters
                            </button>
                            <button className="btn text-nowrap btn-outline-danger">
                                Save search
                            </button></div>
                        <div className="view-group">
                            <button
                                id="btnList"
                                className={`btn ${activeView === "list" ? "btn-info" : "btn-outline-info"
                                    }`}
                                onClick={showList}
                            >
                                List
                            </button>
                            <button
                                id="btnSplit"
                                className={`btn ${activeView === "split" ? "btn-info" : "btn-outline-dark"
                                    }`}
                                onClick={showSplit}
                            >
                                Split
                            </button>
                            <button
                                id="btnMap"
                                className={`btn ${activeView === "map" ? "btn-info" : "btn-outline-dark"
                                    }`}
                                onClick={showMap}
                            >
                                Map
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center bg-light">
                    <div className="col-md-6">
                        <h6>Chicago, IL apartments for rent</h6>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <span>350 of 14,301 rentals</span>
                        <span className="mx-3">
                            Sort:{" "}
                            <a href="#" className="text-dark">
                                Recommended
                            </a>
                        </span>
                        <span>
                            View:{" "}
                            <a href="#" className="text-dark">
                                Photos
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            </div>
            <div className="Main_portion">
                {activeView === "list" && <List products={products} />}
                {activeView === "split" && <Split products={products} />}
                <div id="Map" className="container-fluid">
                    ٖ{activeView === "map" && <Map products={products} />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductMainDetail;
