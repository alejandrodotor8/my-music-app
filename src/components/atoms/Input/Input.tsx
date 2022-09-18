import { ReactNode } from 'react';
import './Input.scss';

interface Props {
	placeholder: string;
	type: string;
	handleChange: (value: string) => void;
	value: string;
	disabled?: boolean;
	children?: ReactNode;
}

export default function Input({
	placeholder,
	type,
	handleChange,
	value,
	children,
	disabled = false,
}: Props) {
	return (
		<div
			className={`container-input ${
				disabled ? 'container-input--disabled' : ''
			}`}
		>
			<input
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				className="container-input__input"
				type={type}
				placeholder={placeholder}
			></input>
			{children && children}
		</div>
	);
}
