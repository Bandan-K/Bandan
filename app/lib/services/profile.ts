import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface HeroSectionData {
  appRating: string;
  appsPublished: string;
  experience: string;
  projectsWorked: string;
}

export interface Skill {
  name: string;
  tag: string;
  expertise: string;
  category: 'core' | 'frameworks' | 'tools';
  description: string;
  docUrl?: string;
  searchSuffix?: string;
}

export interface ProfileData {
  heroSection: HeroSectionData;
  skillsSection: Skill[];
}

/**
 * Service to fetch all profile-related data from Firestore.
 * This can be called from Server Components or Client Components.
 */
export const getProfileDetails = async (): Promise<ProfileData | null> => {
  try {
    const docRef = doc(db, 'ProfileDetails', 'MyDetail');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        heroSection: (data.heroSection as HeroSectionData) || {
          appRating: '4.8',
          appsPublished: '10+',
          experience: '5+',
          projectsWorked: '25+'
        },
        skillsSection: (data.skillsSection as Skill[]) || []
      };
    } else {
      console.warn('No such document found in Firestore!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};
