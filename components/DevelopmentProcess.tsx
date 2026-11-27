const processes = [
	{
		title: "Planning & Design",
		steps: [
			"Requirement analysis & scope definition",
			"UI/UX aligned with Human Interface Guidelines",
			"Wireframes & interactive prototype in Figma",
		],
	},
	{
		title: "Development & Testing",
		steps: [
			"Project setup & architecture in Xcode",
			"Feature development using UIKit/SwiftUI",
			"Unit & UI testing, TestFlight beta releases",
		],
	},
	{
		title: "Deployment & Maintenance",
		steps: [
			"App Store submission & review process",
			"Monitoring crashes & analytics",
			"Regular updates, bug fixes & feature rollout",
		],
	},
];

export default function DevelopmentProcess() {
	return (
		<section id="process" className="portfolio-shell portfolio-section">
			<h2 data-jarvis="section:process" className="portfolio-heading">iOS Development Process</h2>
			<p className="portfolio-intro">A structured workflow to craft high‑quality iOS applications.</p>
			<div className="grid gap-8 md:grid-cols-3">
				{processes.map(({ title, steps }) => (
					<div key={title} data-jarvis={`process:${title}`} className="border-t border-portfolio-rule pt-5">
						<h3 className="mb-4 text-lg font-semibold">{title}</h3>
						<ol className="list-decimal space-y-3 pl-5 leading-relaxed text-gray-400 marker:text-portfolio-accent">
							{steps.map((step) => <li key={step}>{step}</li>)}
						</ol>
					</div>
				))}
			</div>
		</section>
	);
}
