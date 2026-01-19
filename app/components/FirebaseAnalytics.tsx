'use client';

import { useEffect } from 'react';
import { initAnalytics } from '../lib/firebase';

export default function FirebaseAnalytics() {
    useEffect(() => {
        initAnalytics().catch(err => {
            console.error('Firebase analytics failed to initialize:', err);
        });
    }, []);

    return null; // This component doesn't render anything
}
