import React from 'react';
import './CharacterCard.css'; 

const CharacterCard = ({ name, title, description, image }) => {
    return (
        <div className="container d-flex justify-content-center my-4 px-2">
            <div className="card character-card mx-auto">
                {/* Image Section */}
                <div className="image-section">
                    <img
                        src={image}
                        alt={title}
                        className="card-img"
                    />
                </div>

                {/* Overlay Section */}
                <div className="overlay-section">
                    <div className="overlay-content">
                        <p className="overlay-description">{description}</p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bottom-section">
                    <h1 className="bottom-title">{name}</h1>
                    <p className="bottom-description">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
