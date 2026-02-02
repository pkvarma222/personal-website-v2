import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './ScrollReveal';
import '../styles/BentoGrid.css';

const bentoItems = [
    {
        id: 1,
        title: 'Project Alpha',
        tag: 'Development',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        title: 'Design System',
        tag: 'UI/UX',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563de4c?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 3,
        title: 'Film Noir',
        tag: 'Cine',
        size: 'tall',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 4,
        title: 'Cloud App',
        tag: 'SAAS',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 5,
        title: 'Brand Identity',
        tag: 'Graphics',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 6,
        title: 'Portfolio v1',
        tag: 'Design',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
    }
];

const BentoGrid = () => {
    return (
        <section className="bento-section container">
            <Reveal>
                <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Featured Work</h2>
            </Reveal>
            <div className="bento-grid">
                {bentoItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`bento-item ${item.size}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img src={item.image} alt={item.title} />
                        <div className="bento-content">
                            <span className="bento-tag">{item.tag}</span>
                            <h3 className="bento-title">{item.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BentoGrid;
