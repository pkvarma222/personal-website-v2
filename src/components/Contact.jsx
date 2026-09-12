import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const email = "teamAstraPresents@gmail.com"; // Placeholder email

    const handleCopy = () => {
        navigator.clipboard.writeText(email.toLowerCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-center">
                <span className="contact-label">
                    {copied ? "COPIED!" : (isHovering ? "CLICK TO COPY" : "GET IN TOUCH")}
                </span>

                <div
                    className="contact-email-wrapper"
                    onClick={handleCopy}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <h2 className="contact-email">{email}</h2>
                </div>
            </div>

            <div className="contact-bottom-bar">
                <div className="contact-copyright">
                    PRAMOD KUMAR VARMA &copy; {new Date().getFullYear()}
                </div>

                <div className="contact-socials">
                    <a href="https://www.youtube.com/@its_mpkv" target="_blank" rel="noopener noreferrer" className="social-pill">
                        YOUTUBE
                    </a>
                    <a href="https://www.instagram.com/its_mpkv/" target="_blank" rel="noopener noreferrer" className="social-pill">
                        INSTAGRAM
                    </a>
                    <a href="https://letterboxd.com/mpkv/" target="_blank" rel="noopener noreferrer" className="social-pill">
                        LETTERBOXD
                    </a>
                </div>

                <div className="contact-credit">
                    DESIGN & DEV &bull; MPKV
                </div>
            </div>
        </section>
    );
};

export default Contact;
