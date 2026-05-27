import React from 'react'

const Progress: React.FC<
  React.PropsWithChildren<{
    percent?: number
  }>
> = (props) => {
  const { percent = 0 } = props
  const normalizedPercent = Math.min(Math.max(percent ?? 0, 0), 100)

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-cyan-600 transition-[width] duration-300 ease-out"
          style={{ width: `${normalizedPercent}%` }}
        />
      </div>
      <span className="min-w-[3rem] text-right text-xs font-medium text-slate-600">
        {normalizedPercent.toFixed(1)}%
      </span>
    </div>
  )
}

export default Progress
