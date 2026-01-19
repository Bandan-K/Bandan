'use client';

import { useEffect } from 'react';
import { rtdb } from '../lib/firebase';
import { ref, set, serverTimestamp, push } from 'firebase/database';

export default function VisitorLogger() {
    useEffect(() => {
        const logVisitor = async () => {
            try {
                // 1. Get IP and Location details
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                const rawIp = data.ip;
                // Sanitize IP for Firebase key (replace dots and colons)
                const sanitizedIp = rawIp.replace(/[.:]/g, '_');

                // Store in sessionStorage so trackEvent can use it
                sessionStorage.setItem('visitor_ip', sanitizedIp);

                // 2. Prepare metadata
                const visitorData = {
                    ip: rawIp,
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

                // 3. Log metadata under the IP node
                const infoRef = ref(rtdb, `visitors/${sanitizedIp}/info`);
                await set(infoRef, visitorData);

            } catch (error) {
                console.error('Visitor logging failed:', error);
            }
        };

        logVisitor();
    }, []);

    return null; // Component does not render anything UI-wise
}
