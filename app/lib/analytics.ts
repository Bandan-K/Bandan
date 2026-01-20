import { rtdb, logEvent, initAnalytics } from './firebase';
import { ref, set, serverTimestamp } from 'firebase/database';

/**
 * Gets or creates a persistent visitor ID to ensure all events are linked, 
 * even if IP fetch is pending or fails, and persists across refreshes.
 */
const getVisitorId = () => {
	if (typeof window === 'undefined') return 'server';
	let visitorId = localStorage.getItem('visitor_id');
	if (!visitorId) {
		visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
		localStorage.setItem('visitor_id', visitorId);
	}
	return visitorId;
};

/**
 * Tracks an event across both Firebase Analytics and Realtime Database.
 */
export const trackEvent = async (eventName: string, params: Record<string, any> = {}) => {
	try {
		// 1. Log to Firebase Analytics
		const analytics = await initAnalytics();
		if (analytics) {
			logEvent(analytics, eventName, params);
		}

		// 2. Log to Realtime Database
		const visitorId = getVisitorId();
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const eventRef = ref(rtdb, `visitors/${visitorId}/events/${timestamp}`);
		
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
