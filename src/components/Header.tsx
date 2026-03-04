export const Header = () => {
	return (
		<header className="flex items-center justify-between gap-4 py-3">
			<div className="flex items-center gap-3 font-extrabold tracking-tight">
				<div className="w-11 h-11 rounded-xl bg-linear-to-br from-accent to-accent2 flex items-center justify-center text-base-100 font-black text-sm">
					LOGO
				</div>
				<div>
					<div className="text-[15px]">Your Platform Name</div>
					<div className="text-xs text-base-content/60">Crowdfund creators • Exclusive unlocks</div>
				</div>
			</div>

			<nav className="flex gap-3 items-center text-base-content/70 text-sm">
				<a href="#how" className="link link-hover opacity-90">
					How it works
				</a>
				<a href="#why" className="link link-hover opacity-90">
					Why us
				</a>
				<a href="#faq" className="link link-hover opacity-90">
					FAQ
				</a>
				<div className="badge badge-neutral gap-1">
					<strong>Launching soon</strong> • Founding creator spots limited
				</div>
			</nav>
		</header>
	);
};
