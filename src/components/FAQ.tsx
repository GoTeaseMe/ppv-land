import React from 'react';
import { Card } from './ui/Card';

interface FeatureProps {
	title: string;
	description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => (
	<div className="feature">
		<h3 className="font-semibold text-base mb-2">{title}</h3>
		<p className="text-[var(--muted)] text-sm m-0">{description}</p>
	</div>
);

export const FAQ: React.FC = () => {
	return (
		<section id="faq" className="card mt-4.5" aria-label="FAQ">
			<Card>
				<h2 className="text-[22px] font-semibold mb-2.5">FAQ</h2>
				<div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
					<Feature
						title="Crowdfunded (Adult) Content?"
						description="Yes—this is campaign-first discovery, with mainstream and adult sections, plus a request marketplace."
					/>
					<Feature
						title="Can I stay anonymous?"
						description="Creators can use usernames and control what they reveal publicly. Compliance requirements still apply."
					/>
					<Feature
						title="When do you launch?"
						description="When we hit our founding creator + campaign threshold. Join the list and we'll notify you first."
					/>
				</div>
			</Card>
		</section>
	);
};
