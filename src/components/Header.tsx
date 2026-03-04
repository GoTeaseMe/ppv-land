import React from 'react';
import { Pill } from './ui/Pill';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between gap-4 py-2.5">
      <div className="brand flex items-center gap-3 font-extrabold tracking-tight">
        <div className="logo w-11 h-11 rounded-xl bg-gradient-to-br from-[rgba(124,92,255,0.9)] to-[rgba(45,212,191,0.9)] flex items-center justify-center text-[#0b0c10] font-black text-sm">
          LOGO
        </div>
        <div>
          <div className="text-[15px]">Your Platform Name</div>
          <div className="text-xs text-[var(--muted)]">Crowdfund creators • Exclusive unlocks</div>
        </div>
      </div>

      <nav className="flex gap-3.5 items-center text-[var(--muted)] text-sm">
        <a href="#how" className="opacity-90 hover:opacity-100 hover:underline no-underline">
          How it works
        </a>
        <a href="#why" className="opacity-90 hover:opacity-100 hover:underline no-underline">
          Why us
        </a>
        <a href="#faq" className="opacity-90 hover:opacity-100 hover:underline no-underline">
          FAQ
        </a>
        <Pill>
          <strong>Launching soon</strong> • Founding creator spots limited
        </Pill>
      </nav>
    </header>
  );
};
