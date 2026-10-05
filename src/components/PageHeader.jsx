import React from 'react';

export default function PageHeader({
  label,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {label && (
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
            {label}
          </span>
        )}
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
