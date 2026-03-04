const StepNum = ({ num }: { num: number }) => (
	<div className="w-9 h-9 rounded-xl bg-warning/20 border border-warning/40 flex items-center justify-center font-extrabold">
		{num}
	</div>
);

const Step = ({ num, title, description }: { num: number; title: string; description: string }) => (
	<div>
		<StepNum num={num} />
		<h3 className="font-semibold mt-3 mb-2">{title}</h3>
		<p className="text-base-content/70 text-sm">{description}</p>
	</div>
);

export const HowItWorks = () => {
	return (
		<section
			id="how"
			className="card bg-white/80 border border-warning/40 rounded-2xl p-6"
			aria-label="How it works"
		>
			<h2 className="text-xl font-bold mb-4">How it works</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Step
					num={1}
					title="Choose a campaign"
					description="Pick a creator + idea (main or adult section). Decide what tier/perk you want."
				/>
				<Step
					num={2}
					title="Fund it"
					description="Campaigns have clear goals and deadlines. If it reaches goal, it goes into production."
				/>
				<Step
					num={3}
					title="Unlock the content"
					description="Funders get access once funded, per campaign terms. Creators deliver within 72 hours."
				/>
			</div>
		</section>
	);
};
