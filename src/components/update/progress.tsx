import React from 'react'

const Progress: React.FC<React.PropsWithChildren<{
  percent?: number
}>> = props => {
  const { percent = 0 } = props

  return (
    <div className='flex items-center gap-3'>
      <div className='h-2 flex-1 overflow-hidden rounded-full border border-slate-300 bg-slate-100'>
        <div
          className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 transition-[width] duration-300 ease-out'
          style={{ width: `${3 * percent}px` }}
        />
      </div>
      <span className='min-w-[3.5rem] text-right text-sm font-medium text-slate-600'>{(percent ?? 0).toString().substring(0, 4)}%</span>
    </div>
  )
}

export default Progress
