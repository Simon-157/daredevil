import circularProgressBarStyles from "./CircularProgressBar.module.css";

type CircularProgressBarType = {
  total: number ;
  chunk: number;
  label: string;
  bgColor: string;
  arcColor: string;
};
export const CircularProgressBar = ({
  total,
  chunk,
  label,
  bgColor = "rgb(255 255 255 / 0.25)",
  arcColor = "white",
}: CircularProgressBarType) => {
  const canvasWidth = 120,
    canvasHeight = 120;

  const centerX = Math.ceil(canvasWidth / 2),
    centerY = Math.ceil(canvasHeight / 2);

  const radius = centerX - 10;
  const circumference = Math.ceil(2 * Math.PI * radius);

  const offset = String(Math.ceil(circumference * (1 - chunk / total)));

  return (
    <div className={circularProgressBarStyles.wrapper}>
      <svg width={canvasWidth} height={canvasHeight}>
        <circle cx={centerX} cy={centerY} r={radius} stroke={bgColor} />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={arcColor}
           // @ts-ignore
          style={{ "--stroke-dashoffset": offset, "--from": circumference }}
        />
      </svg>
      <center>{label}</center>
      <p>{`${chunk}/${total}`}</p>
    </div>
  );
};

export default CircularProgressBar;
