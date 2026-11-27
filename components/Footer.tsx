import Link from 'next/link';
import FooterName from './FooterName';

const Footer = () => (
	<footer className="border-t border-portfolio-rule bg-pageend py-8">
		<div className="portfolio-shell">
			<FooterName />
			<div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-portfolio-rule pt-6 text-sm text-gray-400">
				<p>© {new Date().getFullYear()} Bandan Kumar Mahto. Crafted with Swift-level obsession.</p>
				<nav aria-label="Footer" className="flex items-center gap-6">
					<Link href="/#home" data-jarvis="nav:top" className="hover:text-portfolio-accent transition-colors">
						Back to top ↑
					</Link>
					<Link href="/#contact" data-jarvis="nav:contact" className="hover:text-portfolio-accent transition-colors">
						Contact
					</Link>
				</nav>
			</div>
		</div>
	</footer>
);

export default Footer;
