import React from 'react';

export default function StatusBadge({ status, label }) {
  const isOk = status === 'ok' || status === 'healthy' || status === 'active';
  const isPending = status === 'checking' || status === 'loading';

  let colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let dotClass = 'bg-emerald-500';

  if (isPending) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    dotClass = 'bg-amber-500 animate-pulse';
  } else if (!isOk) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    dotClass = 'bg-rose-500';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClasses}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      {label || (isOk ? 'Operational' : isPending ? 'Checking...' : 'Offline')}
    </span>
  );
}
