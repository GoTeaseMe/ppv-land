import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: React.ReactNode;
	disclaimer?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, disclaimer, className = '', ...props }, ref) => {
		return (
			<div
				className={['flex gap-2.5 items-start text-[var(--muted)] text-[13px]', className]
					.filter(Boolean)
					.join(' ')}
			>
				<input
					ref={ref}
					type="checkbox"
					className="mt-0.5 accent-[var(--accent)] w-4 h-4 cursor-pointer"
					{...props}
				/>
				<label className="cursor-pointer">
					{label}
					{disclaimer && <div className="text-[12px] mt-0.5">{disclaimer}</div>}
				</label>
			</div>
		);
	},
);

Checkbox.displayName = 'Checkbox';
