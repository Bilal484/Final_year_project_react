import React from 'react';
import './tagline.css';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';

export default function Tagline() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>The Smarter Way to Connect, Network, and Close Deals in Real Estate</title>
                <meta name="description" content="The smarter way to connect, network, and close deals in real estate. Our platform helps you build stronger connections and close more deals with ease." />
                <meta property="og:title" content="The Smarter Way to Connect, Network, and Close Deals in Real Estate" />
                <meta property="og:description" content="The smarter way to connect, network, and close deals in real estate. Our platform helps you build stronger connections and close more deals with ease." />
                <meta property="og:image" content="https://yourwebsite.com/images/real-estate-platform.jpg" />
                <meta property="og:url" content="https://yourwebsite.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="The Smarter Way to Connect, Network, and Close Deals in Real Estate" />
                <meta name="twitter:description" content="The smarter way to connect, network, and close deals in real estate. Our platform helps you build stronger connections and close more deals with ease." />
                <meta name="twitter:image" content="https://yourwebsite.com/images/real-estate-platform.jpg" />
            </Helmet>
            <header id="tagline-header">
                <p className="first-header d-none d-lg-block">The Smarter Way to Connect, Network, and Close Deals in Real Estate.</p>
                <p className="second-header d-none d-lg-block">The Smarter Way to Connect, Network, and Close Deals in Real Estate.</p>
                <p className="last-header">The Smarter Way to Connect, Network, and Close Deals in Real Estate.</p>
            </header>
        </>
    );
}
