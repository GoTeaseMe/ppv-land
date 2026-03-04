export const WhyUs = () => {
	return (
		<section id="why" className="card bg-white/80 border border-warning/40 rounded-2xl p-6" aria-label="Why us">
			<h2 className="text-xl font-bold mb-2">Why this wins for creators and supporters</h2>
			<p className="text-base-content/70 mb-4">
				The point is discovery. Creators shouldn&apos;t need a huge audience to earn. Supporters should get what
				they paid for—fast.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
					<h3 className="font-semibold mb-2">Traffic-driven discovery</h3>
					<p className="text-base-content/70 text-sm">
						We drive audiences to campaigns so creators can grow from zero to real traction with a single
						hit.
					</p>
				</div>
				<div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
					<h3 className="font-semibold mb-2">Backer-only access</h3>
					<p className="text-base-content/70 text-sm">
						Funders get access. If it doesn&apos;t fund, content isn&apos;t released and over 99% of funds
						are refunded.
					</p>
				</div>
				<div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
					<h3 className="font-semibold mb-2">Request-powered marketplace</h3>
					<p className="text-base-content/70 text-sm">
						Inverse requests create high-intent demand—great for niche creators and premium buyers.
					</p>
				</div>
			</div>
		</section>
	);
};
