import Link from 'next/link';
import FooterName from './FooterName';

/** Oversized-name footer, a common Awwwards portfolio signature. */
const Footer = () => (
	<footer className="relative overflow-hidden bg-pageend px-4 pt-10 pb-6">
		<div className="max-w-6xl mx-auto">
			<FooterName />
			<div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-500">
				<p>© {new Date().getFullYear()} Bandan Kumar Mahto. Crafted with Swift-level obsession.</p>
				<nav aria-label="Footer" className="flex items-center gap-6">
					<Link href="/#home" className="hover:text-blue-400 transition-colors">
						Back to top ↑
					</Link>
					<Link href="/#contact" className="hover:text-blue-400 transition-colors">
						Contact
					</Link>
				</nav>
			</div>
		</div>
	</footer>
);

export default Footer;
