'use client';

import { useEffect } from 'react';
import { rtdb, initAnalytics } from '../lib/firebase';
import { ref, set, serverTimestamp } from 'firebase/database';

/**
 * Consolidated Analytics Component
 * 1. Initializes Firebase Analytics
 * 2. Generates/Retrieves Session ID
 * 3. Fetches IP/Location and logs to RTDB if not already done in this session
 */
export default function AnalyticsTracker() {
    useEffect(() => {
        // 1. Init Firebase Analytics
        initAnalytics().catch(err => {
            console.error('Firebase analytics failed to initialize:', err);
        });

        // 2. Visitor Logging (Persistent across refreshes)
        const logVisitor = async () => {
            try {
                // Ensure Visitor ID exists
                let visitorId = localStorage.getItem('visitor_id');
                if (!visitorId) {
                    visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
                    localStorage.setItem('visitor_id', visitorId);
                }

                // Check if we've already logged info for this session to save API calls
                // Using sessionStorage for 'info_logged' so it re-checks info once per browser tab session
                // but keeps the same visitorId from localStorage.
                const isInfoLogged = sessionStorage.getItem('info_logged');
                if (isInfoLogged === 'true') return;

                // Fetch IP and Location details
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error('IP fetch failed');

                const data = await res.json();

                // Prepare metadata
                const info = {
                    ip: data.ip,
                    city: data.city,
                    region: data.region,
                    country: data.country_name,
                    postal: data.postal,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    org: data.org,
                    browser: navigator.userAgent,
                    screen_size: `${window.innerWidth}x${window.innerHeight}`,
                    language: navigator.language,
                    last_visit: serverTimestamp(),
                    readable_time: new Date().toLocaleString(),
                };

                // Log metadata under the Visitor node
                const infoRef = ref(rtdb, `visitors/${visitorId}/info`);
                await set(infoRef, info);

                // Mark as logged for this session
                sessionStorage.setItem('info_logged', 'true');
                sessionStorage.setItem('visitor_ip', data.ip.replace(/[.:]/g, '_'));

            } catch (error) {
                console.error('Visitor logging failed:', error);
            }
        };

        logVisitor();
    }, []);

    return null;
}
