// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Modal,
    Card,
    Nav,
    Tab,
} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const RealtorProduct = () => {
    // State declarations for product management and form handling
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [embedLink, setEmbedLink] = useState("");
    const [catId, setCatId] = useState("");
    const [filterHomeId, setFilterHomeId] = useState("");
    const [filterApartmentId, setFilterApartmentId] = useState("");
    const [filterRentId, setFilterRentId] = useState("");
    const [categories, setCategories] = useState([]);
    const [homes, setHomes] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [rents, setRents] = useState([]);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);

    // New state for product overview details
    const [estPrice, setEstPrice] = useState("");
    const [priceTag, setPriceTag] = useState("");
    const [beds, setBeds] = useState("");
    const [bath, setBath] = useState("");
    const [sqFt, setSqFt] = useState("");
    const [aboutSectionTitle, setAboutSectionTitle] = useState("");
    const [overviewDescription, setOverviewDescription] = useState("");
    const [tagName, setTagName] = useState("");
    const [iconTitle, setIconTitle] = useState("");
    const [iconImage, setIconImage] = useState(null);
    const agentId = localStorage.getItem('user_id');
    const [step, setStep] = useState(1);
    const [floorImage, setFloorImage] = useState(null);
    const [activeKey, setActiveKey] = useState('allProducts');



    // Fetch categories, homes, apartments, and rents on initial load
    useEffect(() => {
        axios.get("https://api.biznetusa.com/api/get-category")
            .then(response => setCategories(response.data.categories))
            .catch();

        axios.get("https://api.biznetusa.com/api/get-searchbyhome")
            .then(response => setHomes(response.data.home_by_city))
            .catch();

        axios.get("https://api.biznetusa.com/api/get-searchbyapartment")
            .then(response => setApartments(response.data.apartment_by_city))
            .catch();

        axios.get("https://api.biznetusa.com/api/get-searchbyrent")
            .then(response => setRents(response.data.rent_by_city))
            .catch();
    }, []);

    // Fetch products on initial load
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("https://api.biznetusa.com/api/get-products")
            .then(response => setProducts(response.data.products))
            .catch();
    };

    // Handle map link change
    const handleMapLinkChange = (e) => {
        const link = e.target.value;
        setMapLink(link);
        setEmbedLink(`https://www.google.com/maps/embed?pb=${encodeURIComponent(link)}`);
    };

    const handleSubmit = async () => {
        try {
            if (step === 1) {
                if (!catId || !catId.value) {
                    toast.error("Please select a category.");
                    return;
                }

                const formData = new FormData();
                formData.append("p_id", selectedProduct.value);
                formData.append("title", title);
                formData.append("desc", desc);
                formData.append("price", price);
                formData.append("est_price", estPrice);
                formData.append("price_tag", priceTag);
                formData.append("beds", beds);
                formData.append("bath", bath);
                formData.append("sq_ft", sqFt);
                formData.append("about_section_title", aboutSectionTitle);
                formData.append("description", overviewDescription);

                try {
                    const response = await axios.post("https://api.biznetusa.com/api/store-productoverviewsale", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    if (response.status === 200) {
                        toast.success("Product overview submitted successfully!");
                    } else {
                        toast.error("Failed to submit product overview.");
                    }
                } catch (error) {
                    toast.error("Error submitting product overview.");
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };





    // Handle form submission for product overview details
    const handleOverviewSubmit = async () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("p_id", selectedProduct.value);
            formData.append("title", title);
            formData.append("desc", desc);
            formData.append("price", price);
            formData.append("est_price", estPrice);
            formData.append("price_tag", priceTag);
            formData.append("beds", beds);
            formData.append("bath", bath);
            formData.append("sq_ft", sqFt);
            formData.append("about_section_title", aboutSectionTitle);
            formData.append("description", overviewDescription);

            const response = await axios.post("https://api.biznetusa.com/api/store-productoverviewsale", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Product overview submitted successfully!");
            } else {
                toast.error("Failed to submit product overview.");
            }
        } catch (error) {
            toast.error("Error submitting product overview.");
        }
    };

    // Handle image uploads
    const handleImageUpload = async () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }
        const formData = new FormData();
        formData.append("pd_id", selectedProduct.value);
        imageFiles.forEach((file) => formData.append("image[]", file));

        try {
            const response = await axios.post("https://api.biznetusa.com/api/store-productimage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                toast.success("Images uploaded successfully!");
            } else {
                toast.error("Failed to upload images.");
            }
        } catch (error) {
            toast.error("Error uploading images.");
        }
    };

    // Handle video uploads
    const handleVideoUpload = async () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }
        const formData = new FormData();
        formData.append("p_id", selectedProduct.value);
        videoFiles.forEach((file) => formData.append("video[]", file));

        try {
            const response = await axios.post("https://api.biznetusa.com/api/store-productvideo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                toast.success("Videos uploaded successfully!");
            } else {
                toast.error("Failed to upload videos.");
            }
        } catch (error) {
            toast.error("Error uploading videos.");
        }
    };

    // Handle Home Tag submission
    const handleHomeTagSubmit = async () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("p_id", selectedProduct.value);
            formData.append("tag_name", tagName);

            const response = await axios.post("https://api.biznetusa.com/api/store-productoverviewhome", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Home tag submitted successfully!");
            } else {
                toast.error("Failed to submit home tag.");
            }
        } catch (error) {
            toast.error("Error submitting home tag.");
        }
    };

    // Handle form submission for home icon tab
    const handleHomeIconSubmit = async () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("p_id", selectedProduct.value);
            formData.append("title", iconTitle);
            formData.append("image", iconImage);

            const response = await axios.post("https://api.biznetusa.com/api/store-productoverviewhomeicon", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Home icon submitted successfully!");
            } else {
                toast.error("Failed to submit home icon.");
            }
        } catch (error) {
            toast.error("Error submitting home icon.");
        }
    };

    // Handle file change for icon image
    const handleIconImageChange = (e) => {
        setIconImage(e.target.files[0]);
    };

    const handleFloorImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFloorImage(e.target.files[0]);
        } else {
            setFloorImage(null); // Ensure it's set to null if no file is selected
        }
    };


    // Handle floor image upload
    const handleFloorImageUpload = async () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }
        const formData = new FormData();
        formData.append("pd_id", selectedProduct.value);
        formData.append("image", floorImage);

        try {
            const response = await axios.post("https://api.biznetusa.com/api/store-productfloorimage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                toast.success("Floor image uploaded successfully!");
            } else {
                toast.error("Failed to upload floor image.");
            }
        } catch (error) {
            toast.error("Error uploading floor image.");
        }
    };

    // Handle file change for both image and video
    const handleFileChange = (e, type) => {
        if (type === "image") {
            setImageFiles([...e.target.files]);
        } else if (type === "video") {
            setVideoFiles([...e.target.files]);
        }
    };
    return (
        <>
        <Helmet>
                <title>Realtor Product Management</title>
                <meta name="description" content="Manage real estate products, add new listings, upload images and videos, and coordinate with agents for seamless property management." />
                <meta name="keywords" content="real estate, realtor panel, product management, upload images, manage properties" />
                <meta name="author" content="Real Estate Solutions" />
            </Helmet>
            <Header />
           
            <Container className="py-5">
                <div className="row">
                    <div className="">
                        <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                            <div className="row">
                                <div className="col-lg-12 mx-auto">
                                    <Nav variant="pills" className="mb-3 d-flex gap-3">
                                        <Nav.Item>
                                            <Nav.Link eventKey="allProducts" className="p-0">
                                                <button className={`btn ${activeKey === 'allProducts' ? 'btn-info' : ''}`}>All Products</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="addProduct" className="p-0">
                                                <button className={`btn ${activeKey === 'addProduct' ? 'btn-info' : ''}`}>Add Product</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="productOverview" className="p-0">
                                                <button className={`btn ${activeKey === 'productOverview' ? 'btn-info' : ''}`}>Product Overview</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="images" className="p-0">
                                                <button className={`btn ${activeKey === 'images' ? 'btn-info' : ''}`}>Upload Images</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="floorImage" className="p-0">
                                                <button className={`btn ${activeKey === 'floorImage' ? 'btn-info' : ''}`}>Floor Image</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="videos" className="p-0">
                                                <button className={`btn ${activeKey === 'videos' ? 'btn-info' : ''}`}>Upload Videos</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="homeTag" className="p-0">
                                                <button className={`btn ${activeKey === 'homeTag' ? 'btn-info' : ''}`}>Home Tag</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="homeIcon" className="p-0">
                                                <button className={`btn ${activeKey === 'homeIcon' ? 'btn-info' : ''}`}>Home Icon</button>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>




                            </div>
                            <Tab.Content>

                                <Tab.Pane eventKey="allProducts">
                                    <Row>
                                        {products.map((product) => (
                                            <Col md={4} key={product.id} className="mb-4">
                                                <Card className="h-100">
                                                    <Card.Body>
                                                        {product.map_url ? (
                                                            <Card.Text>
                                                                <iframe
                                                                    width="100%"
                                                                    height="200"
                                                                    frameBorder="0"
                                                                    style={{ border: 0 }}
                                                                    src={product.map_url}
                                                                    allowFullScreen
                                                                    title="Map Preview"
                                                                ></iframe>
                                                            </Card.Text>
                                                        ) : (
                                                            <Card.Text>N/A</Card.Text>
                                                        )}
                                                        <Card.Title>{product.title}</Card.Title>
                                                        <Card.Text><strong>Description:</strong> {product.desc}</Card.Text>
                                                        <Card.Text><strong>Location:</strong> {product.location}</Card.Text>
                                                        <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                                                        <Card.Text><strong>Category:</strong> {product.categories.cat_title}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="addProduct">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formTitle">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                                </Form.Group>
                                                <Form.Group controlId="formDesc">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control as="textarea" value={desc} onChange={(e) => setDesc(e.target.value)} required />
                                                </Form.Group>
                                                <Form.Group controlId="formLocation">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                                </Form.Group>
                                                <Form.Group controlId="formPrice">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                                </Form.Group>
                                                <Form.Group controlId="formMapLink">
                                                    <Form.Label>Google Maps Link</Form.Label>
                                                    <Form.Control type="text" value={mapLink} onChange={handleMapLinkChange} placeholder="Paste Google Maps link" />
                                                </Form.Group>
                                                {embedLink && (
                                                    <Form.Group>
                                                        <Form.Label>Map Preview</Form.Label>
                                                        <iframe src={embedLink} width="100%" height="300" allowFullScreen="" loading="lazy" title="Google Map Embed"></iframe>
                                                    </Form.Group>
                                                )}
                                                <Form.Group controlId="formCategory">
                                                    <Form.Label>Category</Form.Label>
                                                    <Select
                                                        options={categories.map((cat) => ({ value: cat.id, label: cat.cat_title }))}
                                                        value={catId}
                                                        onChange={(selectedOption) => setCatId(selectedOption)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formHome">
                                                    <Form.Label>Filter by Home</Form.Label>
                                                    <Select
                                                        options={homes.map((home) => ({ value: home.id, label: home.title }))}
                                                        value={filterHomeId ? { value: filterHomeId, label: homes.find((home) => home.id === filterHomeId)?.title } : null}
                                                        onChange={(selectedOption) => setFilterHomeId(selectedOption ? selectedOption.value : null)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formApartment">
                                                    <Form.Label>Filter by Apartment</Form.Label>
                                                    <Select
                                                        options={apartments.map((apartment) => ({ value: apartment.id, label: apartment.title }))}
                                                        value={filterApartmentId ? { value: filterApartmentId, label: apartments.find((apartment) => apartment.id === filterApartmentId)?.title } : null}
                                                        onChange={(selectedOption) => setFilterApartmentId(selectedOption ? Number(selectedOption.value) : null)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formRent">
                                                    <Form.Label>Filter by Rent</Form.Label>
                                                    <Select
                                                        options={rents.map((rent) => ({ value: rent.id, label: rent.title }))}
                                                        value={filterRentId ? { value: filterRentId, label: rents.find((rent) => rent.id === filterRentId)?.title } : null}
                                                        onChange={(selectedOption) => setFilterRentId(selectedOption ? selectedOption.value : null)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleSubmit}>Save Product</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="productOverview">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formProductSelect">
                                                    <Form.Label>Select Product</Form.Label>
                                                    <Select
                                                        options={products.map((product) => ({ value: product.id, label: product.title }))}
                                                        onChange={(option) => setSelectedProduct(option)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formTitle">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formDesc">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formPrice">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formEstPrice">
                                                    <Form.Label>Estimated Price</Form.Label>
                                                    <Form.Control type="text" value={estPrice} onChange={(e) => setEstPrice(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formPriceTag">
                                                    <Form.Label>Price Tag</Form.Label>
                                                    <Form.Control type="text" value={priceTag} onChange={(e) => setPriceTag(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBeds">
                                                    <Form.Label>Beds</Form.Label>
                                                    <Form.Control type="text" value={beds} onChange={(e) => setBeds(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBath">
                                                    <Form.Label>Bath</Form.Label>
                                                    <Form.Control type="text" value={bath} onChange={(e) => setBath(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formSqFt">
                                                    <Form.Label>Square Feet</Form.Label>
                                                    <Form.Control type="text" value={sqFt} onChange={(e) => setSqFt(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formAboutSectionTitle">
                                                    <Form.Label>About Section Title</Form.Label>
                                                    <Form.Control type="text" value={aboutSectionTitle} onChange={(e) => setAboutSectionTitle(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formOverviewDescription">
                                                    <Form.Label>Overview Description</Form.Label>
                                                    <Form.Control as="textarea" value={overviewDescription} onChange={(e) => setOverviewDescription(e.target.value)} />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleOverviewSubmit}>Submit Overview</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="images">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formProductSelect">
                                                    <Form.Label>Select Product</Form.Label>
                                                    <Select
                                                        options={products.map((product) => ({ value: product.id, label: product.title }))}
                                                        onChange={(option) => setSelectedProduct(option)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formImageUpload">
                                                    <Form.Label>Upload Images</Form.Label>
                                                    <Form.Control type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, "image")} />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleImageUpload}>Upload Images</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="floorImage">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formProductSelect">
                                                    <Form.Label>Select Product</Form.Label>
                                                    <Select
                                                        options={products.map((product) => ({ value: product.id, label: product.title }))}
                                                        onChange={(option) => setSelectedProduct(option)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formFloorImageUpload">
                                                    <Form.Label>Upload Floor Image</Form.Label>
                                                    <Form.Control type="file" accept="image/*" onChange={handleFloorImageChange} />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleFloorImageUpload}>Submit Floor Image</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="videos">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formProductSelect">
                                                    <Form.Label>Select Product</Form.Label>
                                                    <Select
                                                        options={products.map((product) => ({ value: product.id, label: product.title }))}
                                                        onChange={(option) => setSelectedProduct(option)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formVideoUpload">
                                                    <Form.Label>Upload Videos</Form.Label>
                                                    <Form.Control type="file" multiple accept="video/*" onChange={(e) => handleFileChange(e, "video")} />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleVideoUpload}>Upload Videos</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="homeTag">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formProductSelect">
                                                    <Form.Label>Select Product</Form.Label>
                                                    <Select
                                                        options={products.map((product) => ({ value: product.id, label: product.title }))}
                                                        onChange={(option) => setSelectedProduct(option)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formTagName">
                                                    <Form.Label>Tag Name</Form.Label>
                                                    <Form.Control type="text" value={tagName} onChange={(e) => setTagName(e.target.value)} />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleHomeTagSubmit}>Submit Home Tag</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="homeIcon">
                                    <div className="row">
                                        <div className="col-lg-9 mx-auto">
                                            <Form>
                                                <Form.Group controlId="formProductSelect">
                                                    <Form.Label>Select Product</Form.Label>
                                                    <Select
                                                        options={products.map((product) => ({ value: product.id, label: product.title }))}
                                                        onChange={(option) => setSelectedProduct(option)}
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formIconTitle">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control type="text" value={iconTitle} onChange={(e) => setIconTitle(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formIconImage">
                                                    <Form.Label>Upload Icon Image</Form.Label>
                                                    <Form.Control type="file" accept="image/*" onChange={handleIconImageChange} />
                                                </Form.Group>
                                                <Button variant="primary" onClick={handleHomeIconSubmit}>Submit Home Icon</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </Container>
            <Footer />
            <ToastContainer />
        </>
    );


};
export default RealtorProduct;