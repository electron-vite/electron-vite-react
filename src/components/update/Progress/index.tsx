import { RsProgressType } from './type'
import progressScss from './progress.module.scss'

const Progress = (props: RsProgressType) => {

  return (
    <div className={progressScss.progress}>
      <div className='progress-pr'  style={{ width: props.rateWidth ?? 250 }}>
      <div
        className='progress-rate'
        style={{
          width: (props.percent ?? 0) * ((props.rateWidth ?? 250) / 100),
          backgroundColor: props.rateColor ?? 'blue',
        }}
      />
    </div>
      <span className='progress-num'>{props.percent > 100 ? 100 :(props.percent.toString().substring(0,4) ?? 0) }%</span>
    </div>
  );
};

export default Progress;
