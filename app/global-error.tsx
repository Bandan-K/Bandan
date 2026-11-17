'use client';

// Replaces the root layout when it crashes, so it must bring its own <html>/<body>
// and cannot rely on Tailwind or the app theme. Colors follow the OS scheme.
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
	return (
		<html lang="en">
			<head>
				<title>Something went wrong | Bandan Kumar Mahto</title>
				<meta name="robots" content="noindex" />
				<style>{`
					:root { color-scheme: dark light; --bg:#111827; --fg:#f3f4f6; --muted:#9ca3af; }
					@media (prefers-color-scheme: light) { :root { --bg:#f8fafc; --fg:#0f172a; --muted:#475569; } }
					body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; box-sizing:border-box;
						background:var(--bg); color:var(--fg); font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif; text-align:center; }
					.code { font-size:clamp(5rem,22vw,10rem); font-weight:700; letter-spacing:-0.05em; line-height:1;
						background:linear-gradient(90deg,#60a5fa,#a855f7); -webkit-background-clip:text; background-clip:text; color:transparent; }
					h1 { margin:8px 0; font-size:clamp(1.5rem,4vw,2.25rem); }
					p { margin:0 auto 28px; max-width:30rem; color:var(--muted); line-height:1.6; }
					.row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
					button, a { font:inherit; font-weight:500; padding:12px 28px; border-radius:999px; cursor:pointer; text-decoration:none; }
					button { border:0; color:#fff; background:linear-gradient(90deg,#3b82f6,#9333ea); }
					a { color:var(--fg); border:1px solid rgba(128,128,128,.4); }
					button:focus-visible, a:focus-visible { outline:2px solid #60a5fa; outline-offset:2px; }
				`}</style>
			</head>
			<body>
				<main>
					<div className="code" aria-hidden="true">
						500
					</div>
					<h1>The site hit a critical error</h1>
					<p>Something broke before the page could even load. Please try again in a moment.</p>
					<div className="row">
						<button type="button" onClick={() => retry()}>
							Try again
						</button>
						{/* A plain anchor is intentional: it forces a full reload out of the broken layout. */}
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/">Back to home</a>
					</div>
				</main>
			</body>
		</html>
	);
}
