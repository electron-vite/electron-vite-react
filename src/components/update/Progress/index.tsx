import React from 'react'
import styles from './progress.module.scss'

const Progress: React.FC<React.PropsWithChildren<{
  percent?: number
}>> = props => {
  const { percent = 0 } = props

  return (
    <div className={styles.progress}>
      <div className='progress-pr'>
        <div
          className='progress-rate'
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className='progress-num'>{(percent ?? 0).toString().substring(0,4)}%</span>
    </div>
  )
}

export default Progress
