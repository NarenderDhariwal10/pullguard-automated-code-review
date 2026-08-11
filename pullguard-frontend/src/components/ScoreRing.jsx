export default function ScoreRing({ score, size = 48 }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  const offset =
    circumference -
    (safeScore / 100) * circumference;

  const color =
    safeScore >= 80
      ? '#22c55e'
      : safeScore >= 70
        ? '#eab308'
        : '#f97316';

  return (
    <div
      className="d-inline-flex align-items-center justify-content-center position-relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: 'rotate(-90deg)',
        }}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />

        {/* Score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Score */}
      <span
        className="position-absolute fw-bold text-dark"
        style={{
          fontSize: `${Math.max(10, size * 0.25)}px`,
        }}
      >
        {Math.round(safeScore)}
      </span>
    </div>
  );
}