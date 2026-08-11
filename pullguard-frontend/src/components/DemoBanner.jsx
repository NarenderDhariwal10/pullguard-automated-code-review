export default function DemoBanner() {
  return (
    <div className="alert alert-warning d-flex align-items-start mb-0">
      <div>
        <strong>Demo Mode</strong> — sample data only. Live reviews require
        a deployed API,{' '}
        <code className="small bg-light px-1 rounded">
          GITHUB_TOKEN
        </code>{' '}
        and a repository webhook configured by your team.
      </div>
    </div>
  );
}