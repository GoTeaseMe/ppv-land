export const FAQ = () => {
	return (
		<section id="faq" className="card bg-white/80 border border-primary/40 rounded-2xl p-6" aria-label="FAQ">
			<h2 className="text-xl font-bold mb-4">FAQ</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
					<h3 className="font-semibold mb-2">Crowdfunded (Adult) Content?</h3>
					<p className="text-base-content/70 text-sm">
						Yes—this is campaign-first discovery, with mainstream and adult sections, plus a request
						marketplace.
					</p>
				</div>
				<div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
					<h3 className="font-semibold mb-2">Can I stay anonymous?</h3>
					<p className="text-base-content/70 text-sm">
						Creators can use usernames and control what they reveal publicly. Compliance requirements still
						apply.
					</p>
				</div>
				<div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
					<h3 className="font-semibold mb-2">When do you launch?</h3>
					<p className="text-base-content/70 text-sm">
						When we hit our founding creator + campaign threshold. Join the list and we&apos;ll notify you
						first.
					</p>
				</div>
			</div>
		</section>
	);
};
