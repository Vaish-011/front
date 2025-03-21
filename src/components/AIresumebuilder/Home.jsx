import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Resume1Image from '../Assets/Resume1.jpg'
import './Home.css';

const Home = () => {
    const [zoomedPicture, setZoomedPicture] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handlePictureClick = (picture) => {
        setZoomedPicture(picture);
    };

    const closeZoomedPicture = () => {
        setZoomedPicture(null);
    };

    const toggleTooltip = (event, show) => {
        setShowTooltip(show);

        // Position the tooltip below the hovered picture
        if (tooltipRef.current) {
            tooltipRef.current.style.left = `${event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2}px`;
            tooltipRef.current.style.top = `${event.currentTarget.offsetTop + event.currentTarget.offsetHeight}px`;
        }
    };

    return (
        <div className="home-page">
   <h1 className="brand-name"><i className="fas fa-fire"></i> Kavya-Resume-Builder</h1>
                
            <div className="pictures">
                <img
                    src={Resume1Image}
                    alt="First Resume"
                    onClick={() => handlePictureClick(Resume1Image)}
                    onMouseEnter={(e) => toggleTooltip(e, true)}
                    onMouseLeave={(e) => toggleTooltip(e, false)}
                />
               
                {showTooltip && (
                    <div className="tooltip" ref={tooltipRef}>
                        Click to zoom in
                    </div>
                )}
            </div>
            <div className="buttons">
                <Link to="/resume/1">
                    <button className="primary-btn"> Resume</button>
                </Link>
            </div>
            {zoomedPicture && (
                <div className="zoomed-picture" onClick={closeZoomedPicture}>
                    <span className="close-btn" onClick={closeZoomedPicture}>
                        &times;
                    </span>
                    <img src={zoomedPicture} alt="Zoomed Picture" />
                </div>
            )}
        </div>
    );
};

export default Home;
