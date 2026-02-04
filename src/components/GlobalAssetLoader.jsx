import React, { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { resolveAssetPath } from '../utils/paths';
import { FILMS } from '../data/films';
import { DESIGNS } from '../data/designs';

const GlobalAssetLoader = () => {
    const { registerAsset, updateAssetProgress } = useLoading();

    useEffect(() => {
        // Collect all assets to preload
        const filmAssets = FILMS.flatMap(film => [
            film.image,
            film.titleImage
        ].filter(Boolean));

        const designAssets = DESIGNS.map(design => design.image).filter(Boolean);

        // Add other critical static assets here if needed
        const staticAssets = [
            '/assets/websitebg.jpg',
            '/assets/profile.jpg'
        ];

        const allAssets = [...filmAssets, ...designAssets, ...staticAssets];

        // Register each asset
        allAssets.forEach(path => {
            const id = `asset-${path}`;
            registerAsset(id);
        });

        // Load each asset
        allAssets.forEach(path => {
            const id = `asset-${path}`;
            const img = new Image();

            img.onload = () => {
                updateAssetProgress(id, 100);
            };

            img.onerror = () => {
                console.warn(`Failed to preload asset: ${path}`);
                // Mark as loaded anyway to prevent hanging
                updateAssetProgress(id, 100);
            };

            img.src = resolveAssetPath(path);
        });

    }, []); // Run once on mount

    return null; // Renderless component
};

export default GlobalAssetLoader;
