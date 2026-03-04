import React, { useEffect, useState } from 'react';

export const Footer: React.FC = () => {
	const [year, setYear] = useState(0);

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className="py-7 text-[var(--muted)] text-sm">
			<div className="flex justify-between gap-4 flex-wrap">
				<div>
					<div className="font-extrabold text-[var(--text)] mb-1">LOGO</div>
					<div>© {year} Your Platform Name</div>
				</div>
				<div className="flex gap-3.5 flex-wrap">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Terms URL.');
						}}
					>
						Terms
					</a>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Privacy URL.');
						}}
					>
						Privacy
					</a>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Contact URL.');
						}}
					>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
};
