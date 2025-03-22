import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import './UpcomingEvents.css';

const SkeletonLoader = () => {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div className="skeleton-text m-0 mb-2" style={{ width: '60%' }}></div>
                        <div className="skeleton-text m-0 mb-3" style={{ width: '80%' }}></div>
                        <div className="skeleton-text m-0 mb-2" style={{ width: '50%' }}></div>
                    </div>
                    <div className="mt-3">
                        <div className="skeleton-text m-0 me-2" style={{ width: '20px', height: '20px' }}></div>
                        <div className="skeleton-text m-0" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.biznetusa.com/api/all-upcomingevents');
            const data = await response.json();
            if (data.status === 200) {
                setEvents(data.upcomingevents.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setModalShow(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async () => {
        if (!selectedEvent) return;

        const payload = {
            upcoming_email_id: localStorage.getItem('user_id'),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            date: new Date().toISOString().slice(0, 10),  // YYYY-MM-DD format
        };

        try {
            const response = await fetch('https://api.biznetusa.com/api/store-upcomingeventsregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.status === 200) {
                setModalShow(false);  // Close the modal on successful registration
            } else {
                console.error(`Error registering for the event: ${data.message}`);
            }
        } catch (error) {
            console.error('Error registering for event:', error);
        }
    };

    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Upcoming Events | ZNet</title>
                <meta name="description" content="Join us at the upcoming events and network with industry professionals. Register today!" />
                <meta property="og:title" content="Upcoming Events | ZNet" />
                <meta property="og:description" content="Join us at the upcoming events and network with industry professionals. Register today!" />
                <meta property="og:image" content="https://yourwebsite.com/images/upcoming-events-banner.jpg" /> {/* Replace with actual image URL */}
                <meta property="og:url" content="https://yourwebsite.com/upcoming-events" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Upcoming Events | ZNet" />
                <meta name="twitter:description" content="Join us at the upcoming events and network with industry professionals. Register today!" />
                <meta name="twitter:image" content="https://yourwebsite.com/images/upcoming-events-banner.jpg" /> {/* Replace with actual image URL */}
            </Helmet>
        <div className="container py-5">
            <h3 className="text-center mb-4 fw-bold display-5">Upcoming Events</h3>
            <div className="row justify-content-center">
                {loading ? Array(3).fill(0).map((_, index) => <SkeletonLoader key={index} />)
                    : events.map((event) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={event.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <p className="text-muted fw-bold">
                                            {new Date(event.date).toDateString()}
                                        </p>
                                        <h5 className="card-title fw-medium fs-4">{event.title}</h5>
                                        <p className="card-text">{event.desc}</p>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-start align-items-start">
                                            <FaMapMarkerAlt className="me-2" size={20} />
                                            <p className="text-muted fs-6">{event.address}</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-start">
                                            <FaClock className="me-2" size={20} />
                                            <p className="text-muted fs-6">{event.start_time} - {event.end_time}</p>
                                        </div>
                                        <Button
                                            className="btn mt-4 fw-bold"
                                            style={{ backgroundColor: 'var(--background_color)', color: 'white' }}
                                            onClick={() => handleRegisterClick(event)}
                                        >
                                            Register Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Register for {selectedEvent?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nameInput">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="emailInput">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phoneInput">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addressInput">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleRegister}>Register</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
};

export default UpcomingEvents;
