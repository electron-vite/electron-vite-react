import { RsProgressType } from './type';
import './index.scss';

const RsProgress = (props: RsProgressType) => {

  return (
    <div className="rs-progress">
      <div className="rs-progress-pr"  style={{ width: props.rateWidth ?? 250 }}>
      <div
        className="rs-progress-rate"
        style={{
          width: (props.percent ?? 0) * ((props.rateWidth ?? 250) / 100),
          backgroundColor: props.rateColor ?? 'blue',
        }}
      />
    </div>
      <span className='rs-progress-num'>{props.percent > 100 ? 100 :(props.percent.toString().substring(0,2) ?? 0) }%</span>
    </div>
  );
};

export default RsProgress;
