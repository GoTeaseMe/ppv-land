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

export const WhyUs: React.FC = () => {
  return (
    <section id="why" className="card mt-4.5" aria-label="Why us">
      <Card>
        <h2 className="text-[22px] font-semibold mb-1.5">Why this wins for creators and supporters</h2>
        <p className="text-[var(--muted)] mb-3.5">
          The point is discovery. Creators shouldn't need a huge audience to earn. Supporters should get what
          they paid for—fast.
        </p>

        <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
          <Feature
            title="Traffic-driven discovery"
            description="We drive audiences to campaigns so creators can grow from zero to real traction with a single hit."
          />
          <Feature
            title="Backer-only access"
            description="Funders get access. If it doesn't fund, content isn't released and over 99% of funds are refunded."
          />
          <Feature
            title="Request-powered marketplace"
            description="Inverse requests create high-intent demand—great for niche creators and premium buyers."
          />
        </div>
      </Card>
    </section>
  );
};
