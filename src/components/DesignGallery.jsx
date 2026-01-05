import React from 'react'
import '../styles/Gallery.css'

const DESIGNS = [
    { id: 1, title: "Vogue Redesign", category: "Editorial", image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=2670&auto=format&fit=crop", portrait: true },
    { id: 2, title: "Tech Corp", category: "Branding", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2574&auto=format&fit=crop", portrait: false },
    { id: 3, title: "Jazz Festival", category: "Poster Art", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", portrait: true },
    { id: 4, title: "Future UI", category: "Web Design", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", portrait: false }
]

const DesignGallery = () => {
    return (
        <section id="design" className="gallery-section" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                <div className="section-header">
                    <h2>Graphic Design</h2>
                </div>

                <div className="gallery-grid">
                    {DESIGNS.map(design => (
                        <div key={design.id} className={`gallery-item ${design.portrait ? 'portrait' : ''}`}>
                            <img src={design.image} alt={design.title} />
                            <div className="gallery-overlay">
                                <h3 className="gallery-title">{design.title}</h3>
                                <span className="gallery-category">{design.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DesignGallery
