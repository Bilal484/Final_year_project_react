import React, { useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ products = [] }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD6BzBn_Tszpy0STtNSbtyyBp4ii2Ji55c", // Replace with your key
    });

    const mapRef = useRef(null);

    // Memoize the center to avoid unnecessary re-renders
    const center = useMemo(() => {
        if (products.length > 0 && !isNaN(products[0].latitude) && !isNaN(products[0].longitude)) {
            return {
                lat: parseFloat(products[0].latitude),
                lng: parseFloat(products[0].longitude),
            };
        }
        console.warn("Default coordinates used because products[0] is invalid.");
        return { lat: 37.7749, lng: -122.4194 }; // Default location
    }, [products]);

    const handleMarkerClick = (position) => {
        if (mapRef.current) {
            mapRef.current.panTo(position);
            mapRef.current.setZoom(14);
        }
    };

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            zoom={10}
            center={center}
            onLoad={(map) => (mapRef.current = map)}
        >
            {products.map((product) => {
                const lat = parseFloat(product.latitude);
                const lng = parseFloat(product.longitude);

                if (isNaN(lat) || isNaN(lng)) {
                    console.warn(`Invalid coordinates for product ID ${product.id}`);
                    return null;
                }

                return (
                    <Marker
                        key={product.id}
                        position={{ lat, lng }}
                        title={product.title}
                        onClick={() => handleMarkerClick({ lat, lng })}
                    />
                );
            })}
        </GoogleMap>
    );
};

export default Map;

