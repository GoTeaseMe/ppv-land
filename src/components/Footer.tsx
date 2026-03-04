'use client';

export const Footer = () => {
	return (
		<footer className="py-8 text-base-content/70 text-sm border-t border-base-content/10 mt-8">
			<div className="flex justify-between gap-4 flex-wrap">
				<div>
					<div className="font-extrabold text-base-content mb-1">LOGO</div>
					<div>© 2026 Your Platform Name</div>
				</div>
				<div className="flex gap-4 flex-wrap">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Terms URL.');
						}}
						className="link link-hover"
					>
						Terms
					</a>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Privacy URL.');
						}}
						className="link link-hover"
					>
						Privacy
					</a>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Contact URL.');
						}}
						className="link link-hover"
					>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
};
