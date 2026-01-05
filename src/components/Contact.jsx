import React from 'react'
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react'

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '8rem 0 20vh', textAlign: 'center' }}>
            <div className="container">


                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <a href="#" style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '50%' }}>
                        <Instagram size={24} />
                    </a>
                    <a href="#" style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '50%' }}>
                        <Twitter size={24} />
                    </a>
                    <a href="#" style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '50%' }}>
                        <Linkedin size={24} />
                    </a>
                    <a href="#" style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '50%' }}>
                        <Mail size={24} />
                    </a>
                </div>

                <footer style={{ marginTop: '4rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Filmmaker Name. All rights reserved.
                </footer>
            </div>
        </section>
    )
}

export default Contact
