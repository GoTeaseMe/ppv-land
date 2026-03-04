import React from 'react';
import { Card } from './ui/Card';

const StepNum: React.FC<{ num: number }> = ({ num }) => (
	<div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(124,92,255,0.18)] border border-[rgba(124,92,255,0.35)] flex items-center justify-center text-[var(--text)] font-extrabold mb-2.5">
		{num}
	</div>
);

interface StepProps {
	num: number;
	title: string;
	description: string;
}

const Step: React.FC<StepProps> = ({ num, title, description }) => (
	<div className="feature">
		<StepNum num={num} />
		<h3 className="font-semibold text-base mb-2">{title}</h3>
		<p className="text-[var(--muted)] text-sm m-0">{description}</p>
	</div>
);

export const HowItWorks: React.FC = () => {
	return (
		<section id="how" className="card how mt-3" aria-label="How it works">
			<Card>
				<h2 className="text-[22px] font-semibold mb-1.5">How it works</h2>
				<div className="grid grid-cols-3 gap-3.5 mt-2.5 max-[900px]:grid-cols-1">
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
			</Card>
		</section>
	);
};
