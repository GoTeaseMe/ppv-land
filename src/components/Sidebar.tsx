export const Sidebar = () => {
	return (
		<aside className="card bg-white/80 border border-warning/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm h-fit" aria-label="Snapshot">
			<h3 className="font-semibold text-base mb-3">What&apos;s launching</h3>
			<div className="space-y-4">
				<div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
					<h4 className="font-semibold text-sm mb-1">1) Campaigns (Main)</h4>
					<p className="text-base-content/70 text-sm">
						Creators launch a goal + perks. If funded, they deliver the content within 72 hours.
					</p>
				</div>
				<div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
					<h4 className="font-semibold text-sm mb-1">2) Campaigns (Adult)</h4>
					<p className="text-base-content/70 text-sm">
						Same mechanics in a designated adult section. Access is limited to funders.
					</p>
				</div>
				<div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
					<h4 className="font-semibold text-sm mb-1">3) Request Board (Inverse)</h4>
					<p className="text-base-content/70 text-sm">
						You post a paid request. Only the requester gets access to the delivered content.
					</p>
				</div>
			</div>

			<div className="divider my-4"></div>

			<div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
				<h4 className="font-semibold text-sm mb-1">Founder credibility (simple + true)</h4>
				<p className="text-base-content/70 text-sm">
					We&apos;re onboarding a limited number of founding creators for launch quality and momentum. Join the waitlist for early access perks.
				</p>
			</div>
		</aside>
	);
};
