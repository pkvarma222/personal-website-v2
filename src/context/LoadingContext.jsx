import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [assets, setAssets] = useState({});

    // Register an asset to be tracked (e.g., 'hero-video', '3d-logo')
    const registerAsset = (id) => {
        setAssets(prev => ({ ...prev, [id]: 0 }));
    };

    // Update progress for a specific asset (0-100)
    const updateAssetProgress = (id, value) => {
        setAssets(prev => ({ ...prev, [id]: value }));
    };

    // Calculate global progress
    useEffect(() => {
        const assetIds = Object.keys(assets);
        if (assetIds.length === 0) {
            setProgress(0);
            return;
        }

        const total = assetIds.length * 100;
        const current = assetIds.reduce((sum, id) => sum + assets[id], 0);
        const globalProgress = Math.round((current / total) * 100);

        setProgress(globalProgress);

        if (globalProgress >= 100) {
            // Add a small delay for a smooth transition after 100%
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [assets]);

    return (
        <LoadingContext.Provider value={{ progress, isLoading, registerAsset, updateAssetProgress }}>
            {children}
        </LoadingContext.Provider>
    );
};
