export default function StatCard({
  icon: Icon,
  label,
  value,
  color = 'brand',
}) {
  const iconStyle =
    color === 'brand'
      ? 'bg-primary-subtle text-primary'
      : 'bg-info-subtle text-info';

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3">

          {/* Icon */}
          <div
            className={`rounded-3 d-flex align-items-center justify-content-center ${iconStyle}`}
            style={{
              width: '44px',
              height: '44px',
            }}
          >
            <Icon size={20} />
          </div>

          {/* Stats */}
          <div>
            <p className="small text-secondary mb-1">
              {label}
            </p>

            <p className="h4 fw-bold text-dark mb-0">
              {value}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}