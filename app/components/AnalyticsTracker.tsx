'use client';

import { useEffect } from 'react';
import { rtdb, initAnalytics } from '../lib/firebase';
import { ref, set, serverTimestamp, get, update, push } from 'firebase/database';

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

                // Fetch IP and Location details
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error('IP fetch failed');

                const data = await res.json();
                const sanitizedIp = data.ip.replace(/[.:]/g, '_');

                // Check if we've already logged info for this tab session to save API calls
                const isInfoLogged = sessionStorage.getItem('info_logged');

                // 1. IP-Based Visitor Resolution
                // If no localStorage, check if this IP has visited before
                if (!visitorId) {
                    const ipMapRef = ref(rtdb, `ip_to_visitor/${sanitizedIp}`);
                    const snapshot = await get(ipMapRef);

                    if (snapshot.exists()) {
                        visitorId = snapshot.val();
                        localStorage.setItem('visitor_id', visitorId as string);
                    } else {
                        // Truly new visitor
                        visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
                        localStorage.setItem('visitor_id', visitorId);
                        // Store the mapping
                        await set(ipMapRef, visitorId);
                    }
                }

                if (isInfoLogged === 'true') return;

                // 2. Prepare/Update metadata
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
                };

                // Update metadata under the Visitor node (overwrites/updates info)
                const infoRef = ref(rtdb, `visitors/${visitorId}/info`);
                await update(infoRef, info);

                // 3. Log this specific Visit (Append to list)
                const visitRef = ref(rtdb, `visitors/${visitorId}/visits`);
                const newVisitRef = push(visitRef);
                await set(newVisitRef, {
                    timestamp: serverTimestamp(),
                    readable_time: new Date().toLocaleString(),
                    path: window.location.pathname
                });

                // Mark as logged for this session
                sessionStorage.setItem('info_logged', 'true');
                sessionStorage.setItem('visitor_ip', sanitizedIp);

            } catch (error) {
                console.error('Visitor logging failed:', error);
            }
        };

        logVisitor();
    }, []);

    return null;
}
