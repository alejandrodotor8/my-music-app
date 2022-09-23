import SkeletonElement from '@atoms/skeletons/Skeleton-element';
import SkeletonShimmer from '@atoms/skeletons/Skeleton-shimmer/Skeleton-shimmer';
import './Skeleton-track.scss';

export default function SkeletonTrack() {
	return (
		<li className="skeleton-wrapper">
			<div className="skeleton-track">
				<SkeletonElement type="thumbnail" />
				<div className="skeleton-track__info">
					<SkeletonElement type="title" />
					<SkeletonElement type="text" />
				</div>
				<SkeletonElement type="thumbnail-mini" />
			</div>
			<SkeletonShimmer />
		</li>
	);
}
