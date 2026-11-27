import type { Skill } from '@/lib/services/profile';

interface SkillCardProps {
	skill: Skill;
	onClick: (skill: Skill) => void;
}

export default function SkillCard({ skill, onClick }: SkillCardProps) {
	return (
		<button
			type="button"
			onClick={() => onClick(skill)}
			data-jarvis={`skill:${skill.name.toLowerCase()}`}
			data-jarvis-title={skill.name}
			data-jarvis-text={skill.description}
			className="group flex w-full cursor-pointer items-center justify-between gap-3 border-b border-portfolio-rule py-3 text-left"
		>
			<span>
				<span data-jarvis-spot className="inline-block font-medium group-hover:text-portfolio-accent group-hover:underline group-hover:underline-offset-4">{skill.name}</span>
				<span className="block text-sm text-gray-400">{skill.tag}</span>
			</span>
			<span className="shrink-0 text-sm text-gray-400">{skill.expertise}</span>
		</button>
	);
}
