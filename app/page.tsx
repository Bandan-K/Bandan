import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import AppShowcase from './components/AppShowcase';
import DevelopmentProcess from './components/DevelopmentProcess';
import ContactSection from './components/ContactSection';
import { getProfileDetails } from './lib/services/profile';

export default async function MobileDevPortfolio() {
	const profileData = await getProfileDetails();

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
			<HeroSection initialData={profileData?.heroSection} />
			<SkillsSection initialSkills={profileData?.skillsSection} />
			{/* <AppShowcase /> */}
			<DevelopmentProcess />
			<ContactSection />
		</main>
	);
}
