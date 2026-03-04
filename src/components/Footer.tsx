'use client';

export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="py-8 text-base-content/70 text-sm border-t border-warning/20 mt-8">
			<div className="flex justify-between gap-4 flex-wrap">
				<div>
					<div className="font-extrabold text-base-content mb-1">LOGO</div>
					<div>© {year} Your Platform Name</div>
				</div>
				<div className="flex gap-4 flex-wrap">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Terms URL.');
						}}
						className="link link-hover link-warning"
					>
						Terms
					</a>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Privacy URL.');
						}}
						className="link link-hover link-warning"
					>
						Privacy
					</a>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Contact URL.');
						}}
						className="link link-hover link-warning"
					>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
};
