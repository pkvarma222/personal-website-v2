import React from 'react';
import { AlertTriangle } from 'lucide-react';
import '../styles/StatusBanner.css';

const StatusBanner = () => {
    return (
        <div className="status-banner">
            <div className="status-banner-content">
                <AlertTriangle size={14} className="warning-icon" />
                <span>Still in the Edit Suite</span>
            </div>
        </div>
    );
};

export default StatusBanner;
