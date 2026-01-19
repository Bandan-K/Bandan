import { rtdb, logEvent, initAnalytics } from './firebase';
import { ref, set, serverTimestamp } from 'firebase/database';

/**
 * Tracks an event across both Firebase Analytics and Realtime Database.
 * This ensures high-level metrics are in Analytics while granular, 
 * exportable logs are in the Database.
 */
export const trackEvent = async (eventName: string, params: Record<string, any> = {}) => {
	try {
		// 1. Log to Firebase Analytics
		const analytics = await initAnalytics();
		if (analytics) {
			logEvent(analytics, eventName, params);
		}

		// 2. Log to Realtime Database
		const sanitizedIp = typeof window !== 'undefined' ? sessionStorage.getItem('visitor_ip') : 'server';
		const targetNode = sanitizedIp ? `visitors/${sanitizedIp}/events` : 'events_anonymous';
		
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const eventRef = ref(rtdb, `${targetNode}/${timestamp}`);
		
		await set(eventRef, {
			event_name: eventName,
			...params,
			readable_time: new Date().toLocaleString(),
			server_timestamp: serverTimestamp(),
		});

	} catch (error) {
		console.error(`Failed to track event: ${eventName}`, error);
	}
};
