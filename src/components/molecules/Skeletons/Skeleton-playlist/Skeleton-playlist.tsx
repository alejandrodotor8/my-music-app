import SkeletonElement from '../../../atoms/skeletons/Skeleton-element';
import SkeletonShimmer from '../../../atoms/skeletons/Skeleton-shimmer/Skeleton-shimmer';
import './Skeleton-playlist.scss';

export default function SkeletonPlaylist() {
	return (
		<li className="skeleton-wrapper">
			<div className="skeleton-playlist">
				<SkeletonElement type="title" />
				<SkeletonElement type="thumbnail-big" />
				<SkeletonElement type="thumbnail-mini" />
			</div>
			<SkeletonShimmer />
		</li>
	);
}
