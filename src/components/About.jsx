import React from 'react'
import '../styles/About.css'
import { SplitText, Reveal, ParallaxImage } from './ScrollReveal'

import PROFILE_IMG from '../assets/profile.jpg'

const About = () => {
    return (
        <section className="about-section container">
            <div className="about-grid">
                {/* Mobile Only Title (Displays before image) */}
                <div className="about-content title-mobile-only">
                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div className="handwritten-label" style={{
                            fontFamily: 'var(--font-handwriting)',
                            fontSize: '1.1rem',
                            color: 'var(--color-accent)',
                            marginBottom: '-0.2rem',
                            transform: 'rotate(-4deg)'
                        }}>
                            Director's Note:
                        </div>
                        <h2><SplitText>About Me</SplitText></h2>
                    </div>
                </div>

                <div className="about-image-wrapper">
                    <div className="archival-frame">
                        <ParallaxImage src={PROFILE_IMG} alt="Portrait" className="w-full h-full" />
                    </div>
                </div>
                
                <div className="about-content">
                    {/* Desktop Only Title */}
                    <div className="title-desktop-only">
                        <div className="handwritten-label" style={{
                            fontFamily: 'var(--font-handwriting)',
                            fontSize: '1.5rem',
                            color: 'var(--color-accent)',
                            marginBottom: '0.5rem',
                            transform: 'rotate(-2deg)'
                        }}>
                            Director's Note:
                        </div>
                        <h2><SplitText>About Me</SplitText></h2>
                    </div>

                    <Reveal delay={0.1}>
                        <p className="lead">
                            Filmmaker by day, Graphic Designer by night.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p>
                            With over 10 years of experience in visual storytelling, I create immersive narratives that resonate with audiences.
                            Whether it's capturing the emotion of a film or crafting the perfect brand identity,
                            my work is driven by a passion for aesthetics and meaningful communication.
                        </p>
                    </Reveal>
                    <div style={{
                        fontFamily: 'var(--font-handwriting)',
                        fontSize: '1.2rem',
                        color: 'var(--color-text-secondary)',
                        marginTop: '2rem',
                        maxWidth: '400px',
                        lineHeight: '1.4'
                    }}>
                        "Every frame should feel like a memory caught in time."
                    </div>
                    <div className="about-stats">
                        <div className="stat">
                            <span className="number"><SplitText delay={0.3}>10+</SplitText></span>
                            <span className="label">Years Exp.</span>
                        </div>
                        <div className="stat">
                            <span className="number"><SplitText delay={0.4}>6+</SplitText></span>
                            <span className="label">Short Films</span>
                        </div>
                        <div className="stat">
                            <span className="number"><SplitText delay={0.5}>50+</SplitText></span>
                            <span className="label">Designs</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
