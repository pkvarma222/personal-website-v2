import React from 'react'
import '../styles/Contact.css'

const Contact = () => {
    return (
        <section id="contact" className="contact-section" style={{ padding: '8rem 0 20vh', textAlign: 'center' }}>
            <div className="container">
                <footer style={{ marginTop: '4rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} MPKV. All rights reserved.
                </footer>
            </div>
        </section>
    )
}

export default Contact
