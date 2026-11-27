import HeroSection from '@/components/hero';
import SkillsSection from '@/components/skills';
import ExperienceSection from '@/components/experience';
import DevelopmentProcess from '@/components/DevelopmentProcess';
import ContactSection from '@/components/ContactSection';
import { getProfileDetails } from '@/lib/services/profile';
import { EXPERIENCE } from '@/components/experience/data';
import { formatExperienceStat, totalMonths } from '@/lib/experience';

// Statically render and refresh the Firestore-backed profile data hourly (ISR)
export const revalidate = 3600;

export default async function MobileDevPortfolio() {
	const profileData = await getProfileDetails();
	const now = new Date();
	const experienceStat = formatExperienceStat(totalMonths(EXPERIENCE.map((e) => e.range), now));

	return (
		<main id="main" className="min-h-screen bg-gray-900 text-white">
			<HeroSection initialData={profileData?.heroSection} experience={experienceStat} />
			<SkillsSection initialSkills={profileData?.skillsSection} />
			<ExperienceSection asOf={now.toISOString()} />
			{/* <AppShowcase /> */}
			<DevelopmentProcess />
			<ContactSection />
		</main>
	);
}
