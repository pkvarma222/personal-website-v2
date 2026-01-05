import React from 'react'
import '../styles/About.css'
import { SplitText, Reveal, ParallaxImage } from './ScrollReveal'

// Placeholder image
const PROFILE_IMG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"

const About = () => {
    return (
        <section className="about-section container">
            <div className="about-grid">
                <div className="about-image">
                    <ParallaxImage src={PROFILE_IMG} alt="Portrait" className="w-full h-full" />
                </div>
                <div className="about-content">
                    <h2><SplitText>About Me</SplitText></h2>
                    <Reveal delay={0.1}>
                        <p className="lead">
                            Filmmaker by day, Graphic Designer by night. I bridge the gap between motion and stillness.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p>
                            With over 5 years of experience in visual storytelling, I create immersive narratives that resonate with audiences.
                            Whether it's capturing the raw emotion of a documentary or crafting the perfect brand identity,
                            my work is driven by a passion for aesthetics and meaningful communication.
                        </p>
                    </Reveal>
                    <div className="about-stats">
                        <div className="stat">
                            <span className="number"><SplitText delay={0.3}>5+</SplitText></span>
                            <span className="label">Years Exp.</span>
                        </div>
                        <div className="stat">
                            <span className="number"><SplitText delay={0.4}>20+</SplitText></span>
                            <span className="label">Films</span>
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
