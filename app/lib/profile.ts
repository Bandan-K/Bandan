import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface HeroSectionData {
  appRating: string;
  appsPublished: string;
  experience: string;
  projectsWorked: string;
}

export interface ProfileData {
  heroSection: HeroSectionData;
}

export const getProfileData = async (): Promise<ProfileData | null> => {
  try {
    const docRef = doc(db, 'ProfileDetails', 'MyDetail');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ProfileData;
    } else {
      console.warn('No such document found in Firestore!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};
