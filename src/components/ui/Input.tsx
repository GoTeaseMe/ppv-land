import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className = '', ...props }, ref) => {
	const inputStyles = [
		'w-full p-3 rounded-xl border border-[var(--line)] bg-[rgba(0,0,0,0.25)]',
		'text-[var(--text)] outline-none placeholder:text-[rgba(233,236,241,0.55)]',
		'focus:border-[var(--accent)] transition-colors',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className="flex flex-col gap-2.5">
			{label && <label className="text-[13px] text-[var(--muted)]">{label}</label>}
			<input ref={ref} className={inputStyles} {...props} />
		</div>
	);
});

Input.displayName = 'Input';
