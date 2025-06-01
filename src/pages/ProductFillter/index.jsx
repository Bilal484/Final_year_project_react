import React from "react";
import { Helmet } from 'react-helmet';
import Footer from "../../components/Footer";
import Header from "../../components/header";
import "./ProductFillter.css"

const ProductFillter = () => {

    return (
        <>
        <Helmet>
                <title>Real Estate Filter - Search for Properties</title>
                <meta name="description" content="Use our comprehensive property filter to find homes for sale or rent based on your criteria. Explore a wide range of properties with detailed filters for price, type, and more." />
                <meta name="keywords" content="real estate, property filter, homes for sale, apartments for rent, real estate filter, property search" />
            </Helmet>
            <Header />
            <div className="position-sticky top-0 z-3">
                <div className="container-fluid product_main_detail">
                    <div className="row ">
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
                                <button className="btn btn-outline-info w-100">All filters</button>
                                <button className="btn btn-outline-danger w-100">
                                    Save search
                                </button>
                            </div>
                            <div className="view-group">
                                <button id="btnList" className="btn btn-outline-info">
                                    List
                                </button>
                                <button id="btnSplit" className="btn btn-outline-dark">
                                    Split
                                </button>
                                <button id="btnMap" className="btn btn-outline-dark">
                                    Map
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center bg-light">
                        <div className="col-md-6">
                            <h5>Chicago, IL apartments for rent</h5>
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
                {/* ------------------------- List ------------------------------- */}
                <div id="List" className="container-fluid">
                    <div className="row mt-4">
                        <div className="col-sm-6 home_cards col-lg-4 mb-4">
                            <div className="card ">
                                {/* Start of Carousel */}
                                <div
                                    id="carouselProperty1"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="assets/images/real estate _1.jpg"
                                                alt="Property 1"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _2.jpg"
                                                alt="Property 1 - Second Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _4.jpg"
                                                alt="Property 1 - Third Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselProperty1"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselProperty1"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                {/* End of Carousel */}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-row">
                                        <h3 className="h5 fw-bold text-decoration-none">$850,000</h3>
                                        <div className="">
                                            <i className="fa-solid fa-share" />
                                            <i className="fa-regular fa-heart  ms-2" />
                                        </div>
                                    </div>
                                    <p className="mb-1 small text-decoration-none">
                                        4 beds | 4.5 baths | 2,378 sq ft
                                    </p>
                                    <p className="small text-decoration-none">
                                        36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#requestTourModal"
                                        >
                                            Request a Tour
                                        </button>
                                        <button className="btn ">(244) 278-7009</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 home_cards col-lg-4 mb-4">
                            <div className="card ">
                                {/* Start of Carousel */}
                                <div
                                    id="carouselProperty2"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="assets/images/real estate _11.jpg"
                                                alt="Property 1"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _12.jpg"
                                                alt="Property 1 - Second Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _13.jpg"
                                                alt="Property 1 - Third Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselProperty2"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselProperty2"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                {/* End of Carousel */}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-row">
                                        <h3 className="h5 fw-bold text-decoration-none">$850,000</h3>
                                        <div className="">
                                            <i className="fa-solid fa-share" />
                                            <i className="fa-regular fa-heart  ms-2" />
                                        </div>
                                    </div>
                                    <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                    <p className="small">
                                        36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#requestTourModal"
                                        >
                                            Request a Tour
                                        </button>
                                        <button className="btn ">(244) 278-7009</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 home_cards col-lg-4 mb-4">
                            <div className="card ">
                                {/* Start of Carousel */}
                                <div
                                    id="carouselProperty3"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="assets/images/real estate _14.jpg"
                                                alt="Property 1"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _15.jpg"
                                                alt="Property 1 - Second Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _16.jpg"
                                                alt="Property 1 - Third Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselProperty3"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselProperty3"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                {/* End of Carousel */}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-row">
                                        <h3 className="h5 fw-bold">$850,000</h3>
                                        <div className="">
                                            <i className="fa-solid fa-share" />
                                            <i className="fa-regular fa-heart  ms-2" />
                                        </div>
                                    </div>
                                    <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                    <p className="small">
                                        36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#requestTourModal"
                                        >
                                            Request a Tour
                                        </button>
                                        <button className="btn ">(244) 278-7009</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-6 home_cards col-lg-4 mb-4">
                            <div className="card ">
                                {/* Start of Carousel */}
                                <div
                                    id="carouselProperty4"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="assets/images/real estate _17.jpg"
                                                alt="Property 1"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _18.jpg"
                                                alt="Property 1 - Second Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _19.jpg"
                                                alt="Property 1 - Third Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselProperty4"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselProperty4"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                {/* End of Carousel */}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-row">
                                        <h3 className="h5 fw-bold">$850,000</h3>
                                        <div className="">
                                            <i className="fa-solid fa-share" />
                                            <i className="fa-regular fa-heart  ms-2" />
                                        </div>
                                    </div>
                                    <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                    <p className="small">
                                        36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#requestTourModal"
                                        >
                                            Request a Tour
                                        </button>
                                        <button className="btn ">(244) 278-7009</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 home_cards col-lg-4 mb-4">
                            <div className="card ">
                                {/* Start of Carousel */}
                                <div
                                    id="carouselProperty5"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="assets/images/real estate _11.jpg"
                                                alt="Property 1"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _21.jpg"
                                                alt="Property 1 - Second Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _22.jpg"
                                                alt="Property 1 - Third Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselProperty5"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselProperty5"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                {/* End of Carousel */}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-row">
                                        <h3 className="h5 fw-bold">$850,000</h3>
                                        <div className="">
                                            <i className="fa-solid fa-share" />
                                            <i className="fa-regular fa-heart  ms-2" />
                                        </div>
                                    </div>
                                    <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                    <p className="small">
                                        36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#requestTourModal"
                                        >
                                            Request a Tour
                                        </button>
                                        <button className="btn ">(244) 278-7009</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 home_cards col-lg-4 mb-4">
                            <div className="card ">
                                {/* Start of Carousel */}
                                <div
                                    id="carouselProperty6"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="assets/images/real estate _25.jpg"
                                                alt="Property 1"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _24.jpg"
                                                alt="Property 1 - Second Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="assets/images/real estate _23.jpg"
                                                alt="Property 1 - Third Image"
                                                className="d-block w-100"
                                            />
                                        </div>
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselProperty6"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselProperty6"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                {/* End of Carousel */}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between flex-row">
                                        <h3 className="h5 fw-bold">$850,000</h3>
                                        <div className="">
                                            <i className="fa-solid fa-share" />
                                            <i className="fa-regular fa-heart  ms-2" />
                                        </div>
                                    </div>
                                    <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                    <p className="small">
                                        36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#requestTourModal"
                                        >
                                            Request a Tour
                                        </button>
                                        <button className="btn ">(244) 278-7009</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------ Split---------------------- */}
                <div id="Split" className="container-fluid " style={{ display: "none" }}>
                    <div className="row ">
                        <div className="col-lg-8 Split">
                            <div className="row mt-4">
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty1"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _1.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _2.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _4.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty1"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty1"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold text-decoration-none">
                                                    $850,000
                                                </h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small text-decoration-none">
                                                4 beds | 4.5 baths | 2,378 sq ft
                                            </p>
                                            <p className="small text-decoration-none">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn ">Request</button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty3"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _14.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _15.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _16.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty3"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty3"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold">$850,000</h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                            <p className="small">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn ">Request</button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty5"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _11.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _21.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _22.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty5"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty5"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold">$850,000</h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                            <p className="small">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn ">Request</button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty6"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _25.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _24.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _23.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty6"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty6"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold">$850,000</h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                            <p className="small">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn ">Request</button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty1"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _1.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _2.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _4.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty1"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty1"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold text-decoration-none">
                                                    $850,000
                                                </h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small text-decoration-none">
                                                4 beds | 4.5 baths | 2,378 sq ft
                                            </p>
                                            <p className="small text-decoration-none">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn "
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#requestTourModal"
                                                >
                                                    Request a Tour
                                                </button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty3"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _14.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _15.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _16.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty3"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty3"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold">$850,000</h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                            <p className="small">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn "
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#requestTourModal"
                                                >
                                                    Request a Tour
                                                </button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty5"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _11.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _21.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _22.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty5"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty5"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold">$850,000</h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                            <p className="small">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn "
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#requestTourModal"
                                                >
                                                    Request a Tour
                                                </button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 home_cards col-lg-6 mb-4">
                                    <div className="card ">
                                        {/* Start of Carousel */}
                                        <div
                                            id="carouselProperty6"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src="assets/images/real estate _25.jpg"
                                                        alt="Property 1"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _24.jpg"
                                                        alt="Property 1 - Second Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        src="assets/images/real estate _23.jpg"
                                                        alt="Property 1 - Third Image"
                                                        className="d-block w-100"
                                                    />
                                                </div>
                                            </div>
                                            {/* Carousel controls */}
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselProperty6"
                                                data-bs-slide="prev"
                                            >
                                                <span
                                                    className="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselProperty6"
                                                data-bs-slide="next"
                                            >
                                                <span
                                                    className="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        {/* End of Carousel */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between flex-row">
                                                <h3 className="h5 fw-bold">$850,000</h3>
                                                <div className="">
                                                    <i className="fa-solid fa-share" />
                                                    <i className="fa-regular fa-heart  ms-2" />
                                                </div>
                                            </div>
                                            <p className="mb-1 small">4 beds | 4.5 baths | 2,378 sq ft</p>
                                            <p className="small">
                                                36 Beach Side Dr Unit 36AP, Ocean City, MD 218
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn ">Request a tour</button>
                                                <button className="btn ">(244) 278-7009</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <iframe
                                className="map_imtegrate"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14042.045651016564!2d70.41938789999999!3d28.3736176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727085737551!5m2!1sen!2s"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            ٖ
                        </div>
                    </div>
                </div>
                {/* ---------------------- Map ---------------------------- */}
                <div id="Map" className="container-fluid" style={{ display: "none" }}>
                    <iframe
                        className="map_imtegrate"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14042.045651016564!2d70.41938789999999!3d28.3736176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727085737551!5m2!1sen!2s"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    ٖ
                </div>
            </div>
            {/* ===================== request Modal ================= */}
            <div
                className="modal fade"
                id="requestTourModal"
                tabIndex={-1}
                aria-labelledby="requestTourModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="requestTourModalLabel">
                                Request a Tour
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <p>Pick up to three available dates that work for you.</p>
                            <div className="tour-dates">
                                <div className="tour-date">
                                    TUESDAY
                                    <br />
                                    <strong>24</strong>
                                    <br />
                                    SEP
                                </div>
                                <div className="tour-date">
                                    WEDNESDAY
                                    <br />
                                    <strong>25</strong>
                                    <br />
                                    SEP
                                </div>
                                <div className="tour-date">
                                    THURSDAY
                                    <br />
                                    <strong>26</strong>
                                    <br />
                                    SEP
                                </div>
                                <div className="tour-date">
                                    FRIDAY
                                    <br />
                                    <strong>27</strong>
                                    <br />
                                    SEP
                                </div>
                                <div className="tour-date">
                                    SATURDAY
                                    <br />
                                    <strong>28</strong>
                                    <br />
                                    SEP
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="preferredMoveInDate" className="form-label">
                                    Preferred Move In Date (Optional)
                                </label>
                                <div className="input-group form-control-date">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="preferredMoveInDate"
                                        placeholder="MM/DD/YYYY"
                                    />
                                    <span className="input-group-text">
                                        <i className="bi bi-calendar" />
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="message" className="form-label">
                                    Write a message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows={3}
                                    defaultValue={
                                        "I'm interested in requesting a tour for City Hyde Park. Please send me current availability and additional details."
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" class="btn btn-danger" id="submitRequest">Submit</button> */}
                            <button
                                type="button"
                                className="btn "
                                data-bs-toggle="modal"
                                data-bs-target="#reachOutModal"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Second Modal (after submit) */}
            <div
                className="modal fade"
                id="reachOutModal"
                tabIndex={-1}
                aria-labelledby="reachOutModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="reachOutModalLabel">
                                Reach out to more properties
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body text-center">
                            <div className="container px-5">
                                <p>
                                    With just one click we'll relay your information to additional
                                    property managers
                                </p>
                                <div className="property-card mb-4">
                                    <img src="assets/images/blog 12.jpg" alt="Property" />
                                    <div className="p-3 text-start">
                                        <h5>$1,750+ /mo</h5>
                                        <p>2 beds | 1 bath | 995 sq ft</p>
                                        <p>5128 S Cornell Ave, Chicago, IL 60615</p>
                                    </div>
                                </div>
                                <div className="actions d-flex justify-content-between">
                                    <div className="action-button">
                                        <i className="fa-solid fa-xmark-circle fs-1" />
                                        <span>Not interested</span>
                                    </div>
                                    <div className="action-button">
                                        <i
                                            className="fa-solid fa-envelope-circle-check fs-1"
                                            style={{ color: "#28a745" }}
                                        />
                                        <span>Contact property</span>
                                    </div>
                                </div>
                                <a href="product_main_page.html">
                                    {" "}
                                    <button type="button" className="btn btn-outline-secondary  mt-4">
                                        Return to search results
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>


    )

}
export default ProductFillter;
