import React from "react";

const Progress: React.FC<
  React.PropsWithChildren<{
    percent?: number;
  }>
> = (props) => {
  const { percent = 0 } = props;

  return (
    <div className="flex items-center">
      <div className="border-[1px] rounded-[3px] border-solid border-black h-[6px] w-[300px]">
        <div
          className="h-[6px] rounded-[4px] bg-gradient-to-r from-purple1 via-transparent to-crimson"
          style={{ width: `${3 * percent}px` }}
        />
      </div>
      <span className="m-[0,10px]">
        {(percent ?? 0).toString().substring(0, 4)}%
      </span>
    </div>
  );
};

export default Progress;
