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

export const Sidebar: React.FC = () => {
  return (
    <aside className="card" aria-label="Snapshot">
      <Card>
        <h3 className="font-semibold text-base mb-2.5">What's launching</h3>
        <div className="grid grid-cols-1 gap-3">
          <Feature
            title="1) Campaigns (Main)"
            description="Creators launch a goal + perks. If funded, they deliver the content within 72 hours."
          />
          <Feature
            title="2) Campaigns (Adult)"
            description="Same mechanics in a designated adult section. Access is limited to funders."
          />
          <Feature
            title="3) Request Board (Inverse)"
            description="You post a paid request. Only the requester gets access to the delivered content."
          />
        </div>

        <div className="h-px bg-[var(--line)] my-5" />

        <Feature
          title="Founder credibility (simple + true)"
          description="We're onboarding a limited number of founding creators for launch quality and momentum. Join the waitlist for early access perks."
        />
      </Card>
    </aside>
  );
};
