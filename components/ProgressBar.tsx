"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span
          style={{ color: "#4e4a48", fontSize: "0.875rem" }}
        >
          Deel {current} van {total}
        </span>
        <span
          style={{ color: "#4e4a48", fontSize: "0.875rem" }}
        >
          {percent}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: "#cbb8b2",
          borderRadius: "4px",
          overflow: "hidden",
        }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Deel ${current} van ${total}`}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor: "#44242b",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}
