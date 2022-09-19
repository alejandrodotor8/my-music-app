import './Skeleton-element.scss';

interface Props {
	type: string;
}

export default function SkeletonElement({ type }: Props) {
	const classes = `skeleton skeleton--${type}`;
	return <div className={classes}></div>;
}
