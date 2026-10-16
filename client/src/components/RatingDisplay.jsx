import React from 'react';

/**
 * Reusable Rating Badge & Review Count
 * @param {Object} props
 * @param {number} props.score - e.g. 9.5
 * @param {string} [props.word] - e.g. "Exceptional"
 * @param {number} [props.reviewCount] - e.g. 1480
 * @param {'sm'|'md'|'lg'} [props.size='md']
 */
export default function RatingDisplay({ score, word, reviewCount, size = 'md' }) {
  const numScore = Number(score) || 0;

  // Determine color scheme based on score
  let badgeColors = 'bg-blue-600 text-white';
  let ratingWord = word;

  if (numScore >= 9.0) {
    badgeColors = 'bg-emerald-700 text-white';
    if (!ratingWord) ratingWord = 'Exceptional';
  } else if (numScore >= 8.5) {
    badgeColors = 'bg-blue-600 text-white';
    if (!ratingWord) ratingWord = 'Wonderful';
  } else if (numScore >= 8.0) {
    badgeColors = 'bg-indigo-600 text-white';
    if (!ratingWord) ratingWord = 'Very Good';
  } else if (numScore >= 7.0) {
    badgeColors = 'bg-amber-600 text-white';
    if (!ratingWord) ratingWord = 'Good';
  }

  const sizeClasses = {
    sm: {
      badge: 'px-1.5 py-0.5 text-xs rounded font-bold',
      text: 'text-xs',
      count: 'text-[11px]',
    },
    md: {
      badge: 'px-2 py-1 text-sm rounded-lg font-bold',
      text: 'text-sm font-semibold',
      count: 'text-xs',
    },
    lg: {
      badge: 'px-3 py-1.5 text-lg rounded-xl font-extrabold',
      text: 'text-base font-bold',
      count: 'text-sm',
    },
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`${badgeColors} ${sizeClasses.badge} shadow-xs tracking-tight shrink-0`}>
        {numScore.toFixed(1)}
      </div>

      {(ratingWord || reviewCount !== undefined) && (
        <div className="flex flex-col leading-tight">
          {ratingWord && (
            <span className={`${sizeClasses.text} text-slate-900`}>{ratingWord}</span>
          )}
          {reviewCount !== undefined && (
            <span className={`${sizeClasses.count} text-slate-500`}>
              {reviewCount.toLocaleString()} {reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
